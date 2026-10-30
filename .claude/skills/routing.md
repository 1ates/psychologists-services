# Routing Skill — Sayfalar ve Korumalı Erişim

## Kurallar
- React Router route tanımları `src/App.jsx` içinde tek yerde tutulur.
- Zorunlu sayfalar: `/`, `/psychologists`, `/favorites`; bağlantılar `Link`/`NavLink` ile verilir.
- Favorites route'u yetkisiz kullanıcı için login akışı veya güvenli bir redirect göstermelidir; yalnızca UI linkini gizlemek yetmez.
- Route değişiminde sayfa state'i, modal kapanışı ve scroll davranışı kontrol edilir.
- Bilinmeyen path için kullanıcı dostu 404 ekranı ve ana sayfaya dönüş bağlantısı eklenir.
- BrowserRouter deploy ortamında fallback/history ayarı doğrulanır; hosting üzerinde doğrudan nested URL açılışı test edilir.

## Kabul kriterleri
- Home CTA `/psychologists` sayfasına gider.
- Psychologists ve Favorites linkleri aktif durumunu erişilebilir şekilde gösterir.
- Refresh sonrası `/psychologists` ve `/favorites` bozulmaz.
