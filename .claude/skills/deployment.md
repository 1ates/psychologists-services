# Deployment Skill — Build, SEO ve Hosting

## Kurallar
- `npm run build` çıktısı hosting'in publish directory'siyle eşleşir (`dist`).
- Vercel, Netlify veya GitHub Pages seçimi kullanıcı tarafından doğrulanır; deployment URL'si test edilmeden README'ye yazılmaz.
- BrowserRouter için hosting rewrite/fallback ayarı yapılır; nested route refresh'i test edilir.
- Production env değişkenleri hosting secret/environment settings üzerinden tanımlanır; `.env` commit edilmez.
- `robots.txt`, `sitemap.xml`, canonical, meta description, Open Graph/Twitter metadata ve favicon gerçek domain ile güncellenir.
- 404 ve thank-you davranışları gerçek hosting üzerinde doğrulanır.
- Privacy/KVKK/GDPR metni, form linkleri ve gerekiyorsa cookie bildirimi yayın öncesi gözden geçirilir.

## Kabul kriterleri
- Build ve lint temizdir.
- Gerçek URL tüm ana sayfalara ulaşır ve doğrudan nested route açılır.
- Deployment durumu, URL ve eksik kullanıcı aksiyonları `docs/progress.md` içinde kaydedilmiştir.
