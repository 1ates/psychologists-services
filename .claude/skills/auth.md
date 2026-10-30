# Auth Skill — Kimlik Doğrulama ve Yetkilendirme

## Kurallar
- Firebase Authentication email/password akışını `src/components/AuthModal/AuthModal.jsx` üzerinden kullan.
- Kayıt, giriş, mevcut kullanıcı oturumu, logout ve loading durumlarını `AuthContext` üzerinden yönet.
- Register ve login formları React Hook Form + Yup ile tüm zorunlu alanları doğrular.
- Favorites ve appointment gibi korumalı işlemler UI'da değil, işlemden hemen önce `user` kontrolüyle korunur.
- Favorites sayfası doğrudan URL ile açıldığında yetkisiz kullanıcı için güvenli yönlendirme veya login akışı göster.
- Kullanıcı profili ve favorites verisi `users/{uid}` sahipliğiyle eşleştirilir.
- Auth modal X, backdrop ve Escape ile kapanır; açıldığında fokus, `aria-labelledby` ve scroll lock doğrulanır.
- Auth başarısızlığında kullanıcıya güvenli mesaj göster; Firebase'in ham hata metnini doğrudan render etme.

## Kabul kriterleri
- Oturum yenilemede AuthContext loading bitene kadar korumalı ekran yanlış içerik göstermiyor.
- Login/register sonrası header ve Favorites bağlantısı anında güncelleniyor.
- Logout sonrası korumalı veriler ekrandan temizleniyor.
