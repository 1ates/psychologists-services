# Styles Skill — Tokenlar ve Responsive CSS

## Kurallar
- Global renk, yüzey, metin, border ve shadow token'ları `src/index.css` içinde tutulur.
- Bileşen stilleri ilgili component/page CSS Module dosyasında tutulur; global selector ekleme.
- Mobil-first davranışta 320px, 375px, 768px ve 1440px genişliklerini kontrol et.
- Hover'a bağlı tek erişim yolu oluşturma; touch ve keyboard kullanıcılarını da destekle.
- `:focus-visible` durumları tüm link, button ve form alanlarında görünür olmalı.
- Modal açıldığında arka plan kaydırması, viewport yüksekliği ve küçük ekran içeriği test edilmeli.
- Renk kontrastını ve tema değişimlerini kontrol et; inline renk yalnızca renk örneği gibi veri sunumunda kullanılabilir.

## Kontrol listesi
- [ ] Header ve hero ortak boşluk/token kullanıyor.
- [ ] Kartlarda uzun isim, lisans ve açıklama taşmıyor.
- [ ] Select, button ve modal 320px ekranı aşmıyor.
- [ ] Empty, loading, error ve success durumları stillendirildi.
- [ ] Reduced-motion tercihi dikkate alındı.
