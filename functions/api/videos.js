export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '30', 10), 100);
  const tag = url.searchParams.get('tag') || '';
  const source = url.searchParams.get('source') || '';

  if (!env.DB) {
    return Response.json({ error: 'D1 binding missing' }, { status: 500 });
  }

  let sql = `SELECT id, source, channel_name, title, description, url, published_at, tags, featured
             FROM videos WHERE 1=1`;
  const params = [];
  if (source) { sql += ' AND source=?'; params.push(source); }
  if (tag) { sql += " AND tags LIKE ?"; params.push(`%"${tag}"%`); }
  sql += ' ORDER BY featured DESC, published_at DESC LIMIT ?';
  params.push(limit);

  try {
    const { results } = await env.DB.prepare(sql).bind(...params).all();
    const items = results.map((r) => ({
      ...r,
      tags: r.tags ? JSON.parse(r.tags) : [],
    }));
    return Response.json({ items }, {
      headers: { 'cache-control': 'public, max-age=300, s-maxage=600' },
    });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
