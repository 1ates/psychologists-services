# Pre-launch Skill — Son Kullanıcıya Açmadan Önce

## Kurallar
- Kullanıcıdan doğrulanmamış business name, domain, phone, address, opening hours, reviews, team photos, legal text veya analytics bilgisi uydurma.
- Production sayfalarında placeholder, TODO, Lorem ipsum veya example.com bırakma.
- Home, Psychologists ve Favorites için title/description/OG metadata ortak layout yaklaşımıyla yönetilir.
- Gerçek yorumlar yoksa review rich result markup ekleme.
- Sitemap/robots, 404, privacy ve thank-you sayfalarını hosting davranışıyla birlikte kontrol et.

## Kullanıcıdan alınacak bilgiler
- Production domain ve hosting hedefi.
- Business name, site dili, iletişim bilgileri.
- KVKK/GDPR kapsamı ve analytics/ad araçları.
- Appointment gönderiminin kaydedileceği kanal ve saklama politikası.
- Onaylı review, team photo, social share image ve varsa legal metin.

## Kontrol çıktısı
Her madde `OK`, `partial`, `missing`, `needs content` veya `needs action` olarak raporlanır. Kullanıcıya ait adımlar (domain/DNS, Search Console, legal review, Firebase rules/hosting secrets) kod tamamlanmış gibi gösterilmez.
