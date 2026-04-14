/**
 * Cloudflare Worker - RSS 转 JSON 代理
 *
 * 功能：将 RSS/Atom Feed 解析为 JSON 格式
 * 端点：/api.json?rss_url=<RSS地址>
 */

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)

  // 处理 CORS 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400'
      }
    })
  }

  // 只处理 /api.json 路径
  if (url.pathname !== '/api.json') {
    return json({ error: 'Not Found' }, 404)
  }

  const rssUrl = url.searchParams.get('rss_url')
  if (!rssUrl) {
    return json({ error: 'Missing rss_url parameter' }, 400)
  }

  // 验证 URL 格式
  try {
    new URL(rssUrl)
  } catch {
    return json({ error: 'Invalid rss_url format' }, 400)
  }

  try {
    // 获取 RSS Feed
    const res = await fetch(rssUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSS-Proxy/1.0)',
        'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*'
      },
      cf: {
        cacheTtl: 300,
        cacheEverything: true
      }
    })

    if (!res.ok) {
      return json({
        error: 'Failed to fetch RSS',
        status: res.status,
        statusText: res.statusText
      }, 502)
    }

    const xml = await res.text()
    const items = parseRSS(xml)

    return json({
      code: 0,
      data: {
        list: items.slice(0, 10),
        total: items.length
      }
    })

  } catch (err) {
    return json({ error: 'Internal error', message: err.message }, 500)
  }
}

/**
 * 返回 JSON 响应
 */
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=300'
    }
  })
}

/**
 * 解析 RSS XML（支持 RSS 2.0 和 Atom）
 */
function parseRSS(xml) {
  const items = []

  // 提取所有 <item> (RSS 2.0) 或 <entry> (Atom)
  const itemRegex = /<item[\s\S]*?<\/item>|<entry[\s\S]*?<\/entry>/gi
  const matches = xml.match(itemRegex) || []

  for (let i = 0; i < matches.length; i++) {
    const block = matches[i]
    const isAtom = block.startsWith('<entry')

    // 提取描述/内容（先尝试 content 字段）
    let description = ''
    if (isAtom) {
      description = extractTag(block, 'content') || extractTag(block, 'summary') || ''
    } else {
      description = extractTag(block, 'description') || extractTag(block, 'content:encoded') || ''
    }

    // 清理 HTML 标签并生成摘要
    const cleanDescription = stripHtml(description)
    const summary = cleanDescription.slice(0, 100) + (cleanDescription.length > 100 ? '...' : '')

    // 提取封面
    let cover = ''
    // RSS enclosure
    const enclosureMatch = block.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*>/i)
    if (enclosureMatch) {
      cover = enclosureMatch[1]
    }
    // media:thumbnail
    if (!cover) {
      const mediaMatch = block.match(/<media:thumbnail[^>]+url=["']([^"']+)["'][^>]*\/?>/i)
      if (mediaMatch) {
        cover = mediaMatch[1]
      }
    }
    // media:content
    if (!cover) {
      const mediaContentMatch = block.match(/<media:content[^>]+url=["']([^"']+)["'][^>]*>/i)
      if (mediaContentMatch) {
        cover = mediaContentMatch[1]
      }
    }
    // 从描述中提取第一张图
    if (!cover) {
      cover = extractFirstImage(description)
    }

    // 提取链接 - 修复：支持多种格式
    let link = ''
    if (isAtom) {
      // Atom 格式：尝试多种 link 格式
      // 格式1: <link href="xxx" rel="alternate"/>
      // 格式2: <link rel="alternate" href="xxx"/>
      // 格式3: <id>xxx</id>
      const linkMatch = block.match(/<link[^>]*href=["']([^"']+)["'][^>]*\/?>/i)
      link = linkMatch ? linkMatch[1] : ''
      if (!link) {
        link = extractTag(block, 'id')
      }
    } else {
      // RSS 2.0 格式：直接 <link>xxx</link>
      link = extractTag(block, 'link')
    }
    if (!link) {
      link = '#'
    }

    // 提取标题
    let title = ''
    if (isAtom) {
      title = extractTag(block, 'title') || extractTag(block, 'subtitle') || '无标题'
    } else {
      title = extractTag(block, 'title') || '无标题'
    }

    // 提取日期
    const dateStr = isAtom
      ? extractTag(block, 'published') || extractTag(block, 'updated') || extractTag(block, 'issued')
      : extractTag(block, 'pubDate') || block.match(/<dc:date>([^<]*)<\/dc:date>/i)?.[1] || ''

    let publishTime = ''
    if (dateStr) {
      try {
        const d = new Date(dateStr)
        publishTime = isNaN(d.getTime()) ? String(dateStr) : d.toISOString()
      } catch {
        publishTime = String(dateStr)
      }
    }

    // 提取分类
    let category = extractTag(block, 'category') || extractTag(block, 'dc:subject') || 'RSS'
    // 处理分类是对象的情况（如 <category domain="xxx">name</category>）
    if (typeof category === 'object' && category !== null) {
      category = category['#text'] || 'RSS'
    }

    items.push({
      id: i + 1,
      title: title,
      summary: summary,
      cover: cover,
      url: link,
      publish_time: publishTime,
      category: {
        id: 1,
        name: String(category) || 'RSS',
        url: '#'
      }
    })
  }

  return items
}

/**
 * 从 XML 块中提取标签内容
 */
function extractTag(xml, tag) {
  // 处理自闭合标签和普通标签
  // 匹配 <tag>content</tag> 或 <tag attr="xxx">content</tag> 或 <tag attr="xxx"/>
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
  const match = xml.match(regex)
  if (!match) return ''

  // 递归处理 CDATA
  let content = match[1].trim()
  if (content.startsWith('<![CDATA[') && content.endsWith(']]>')) {
    content = content.slice(9, -3)
  }

  return content
}

/**
 * 从 HTML 中提取第一张图片
 */
function extractFirstImage(html) {
  if (!html) return ''
  const match = html.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)
  return match ? match[1] : ''
}

/**
 * 去除 HTML 标签并解码 HTML 实体
 */
function stripHtml(html) {
  if (!html) return ''

  // 第一步：去除标签 + 解码命名实体
  let text = html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&hellip;/g, '...')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')

  // 第二步：解码数字实体 &#34; → "  &#38; → &
  text = text.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))

  // 第三步：解码十六进制实体 &#x27; → '  &#x22; → "
  text = text.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))

  return text
    .replace(/\s+/g, ' ')
    .trim()
}
