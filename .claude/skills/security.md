# Security Skill — Firebase ve Uygulama Güvenliği

## Kurallar
- Firebase client config sadece `VITE_*` ortam değişkenlerinden okunur; admin SDK anahtarı frontend'e girmez.
- Firebase Auth, Firestore/Realtime Database kuralları ve kullanıcı sahipliği birlikte doğrulanır; UI'daki gizleme yetkilendirme değildir.
- `users/{uid}` yalnızca ilgili kullanıcının okuyup yazabileceği şekilde kısıtlanır.
- Psikolog verisi ve appointment yazma/okuma erişimleri açık kurallarla değil, minimum yetkiyle tanımlanır.
- Kullanıcıya raw Firebase exception mesajı gösterilmez; güvenli ve anlaşılır mesaj eşlemesi yapılır.
- Formlar React Hook Form + Yup ile zorunlu alan ve format doğrulaması kullanır; server-side rules/validation ayrıca varsayılır.
- Modal kapanışı X, backdrop ve Escape ile çalışır; `role="dialog"`, `aria-modal`, focus yönetimi ve scroll lock uygulanır.
- Favorites ve appointment işlemlerinde yarış durumları, tekrar tıklama ve başarısız istek rollback'i ele alınır.
- Kişisel veriler, appointment saklama süresi, gizlilik metni ve KVKK/GDPR gereklilikleri kullanıcı onayı olmadan varsayılmaz.

## Kontrol listesi
- [ ] `.env` ve Firebase admin secrets git'te yok.
- [ ] Auth provider ayarları ve Firebase rules gerçek projede doğrulandı.
- [ ] Yetkisiz Favorites/appointment erişimleri test edildi.
- [ ] Hata mesajları sanitize edildi.
- [ ] Dependency audit ve browser console kontrolü tamamlandı.
