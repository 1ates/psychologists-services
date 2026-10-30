# Data Skill — Firebase Veri Akışı

## Mevcut durum
- Kod şu anda Firebase Firestore kullanıyor (`src/firebase.js`, `scripts/seed.js`, sayfa sorguları).
- Seed kaynağı `scripts/psychologists.json` dosyasıdır.
- Kullanıcı favorites verisi `users/{uid}.favorites` altında tutulur.

## Zorunlu karar
Teknik şartname Realtime Database istediği için Firestore'un kabul edilip edilmediği açıkça kararlaştırılmadan veri aşaması tamamlanmaz. Migrasyon seçilirse tüm read/write sorguları, seed scripti, rules ve README aynı aşamada güncellenir.

## Kurallar
- Psikolog alanları: `name`, `avatar_url`, `experience`, `reviews`, `price_per_hour`, `rating`, `license`, `specialization`, `initial_consultation`, `about`.
- İlk ekranda 3 kart göster; `Load more` yeni bir Firebase isteğiyle sonraki 3 kaydı getirir. Tüm koleksiyonu tek seferde alıp local slice yapmak kabul edilmez.
- Sıralama server-side mümkün değilse açık ve tutarlı bir pagination stratejisi belirle; cursor/last item state'ini koru.
- Favorites ekleme/çıkarma idempotent olmalı, başarısız yazmada UI tutarlı kalmalı ve refresh sonrası doğru okunmalı.
- Boş, loading, network error ve görsel yüklenememe durumlarını göster.
- Appointment kaydı isteniyorsa path/collection, required fields, rules, duplicate submit ve retention policy belirlenmeden implement etme.

## Kabul kriterleri
- Gerçek Firebase query'leri network panelinde görülebilir.
- Load more tıklaması yeni query üretir ve duplicate kayıt göstermez.
- Favorites yalnızca aktif kullanıcıya ait görünür.
