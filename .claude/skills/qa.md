# QA Skill — Test ve Release Kontrolü

## Her değişiklikten sonra
- `npm run lint`
- `npm run build`
- Geliştirme sunucusunda Home, Psychologists, Favorites ve bilinmeyen route'u aç.
- Browser console'da error/warning, network panelinde failed request ve duplicate Firebase isteği kontrol et.
- 320px, 375px, 768px ve desktop viewport'larında yatay taşma ve modal kullanılabilirliğini kontrol et.

## Fonksiyon senaryoları
- Register/login/logout ve refresh sonrası session.
- Auth olmayan kalp/appointment tıklaması.
- Auth olan favorite ekleme, kaldırma ve refresh.
- Sort seçenekleri, ilk 3 kart ve Load more query'si.
- Read more/reviews ve appointment modal validation/submit/cancel.
- Modal X, backdrop, Escape, keyboard focus ve `aria` ilişkileri.

## Release koşulları
- Firebase rules ve environment değerleri gerçek projede doğrulanır.
- Appointment persistence kararı belgelenir.
- SEO/pre-launch check scripti temizlenir veya kullanıcıya kalan maddeler listelenir.
- README yalnızca doğrulanmış deployment URL'sini içerir.
