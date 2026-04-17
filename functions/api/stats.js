export async function onRequestGet({ env }) {
  if (!env.DB) {
    return Response.json({ error: 'D1 binding missing' }, { status: 500 });
  }
  try {
    const [videos, news, sources, last] = await Promise.all([
      env.DB.prepare('SELECT COUNT(*) c FROM videos').first(),
      env.DB.prepare('SELECT COUNT(*) c FROM news').first(),
      env.DB.prepare('SELECT COUNT(*) c FROM sources WHERE enabled=1').first(),
      env.DB.prepare('SELECT MAX(ts) t FROM fetch_log WHERE ok=1').first().catch(() => ({ t: null })),
    ]);
    return Response.json({
      videos: videos?.c ?? 0,
      news: news?.c ?? 0,
      sources: sources?.c ?? 0,
      last_fetch_at: last?.t ?? null,
      industry: {
        annual_output: '508.9',
        annual_output_unit: '亿元',
        above_scale_companies: 431,
        patents: 3721,
        export_countries: '100+',
      },
    }, {
      headers: { 'cache-control': 'public, max-age=600, s-maxage=1200' },
    });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
