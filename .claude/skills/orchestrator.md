# Orchestrator — Proje Yönetim Merkezi

Bu dosya proje aşamalarını ve kontrol noktalarını yönetir. Her uygulama değişikliğinden önce ilgili skill okunur; tamamlanan aşama bu dosyada ve `docs/progress.md` içinde güncellenir.

## Aktif aşamalar
- [x] P0: Proje keşfi ve bağlam dokümantasyonu (`CLAUDE.md`, `docs/`)
- [x] P1: Mevcut uygulama ve Figma ön denetimi
- [ ] P2: Tasarım sistemi ve responsive UI düzeltmeleri (`design.md`, `styles.md`)
- [ ] P3: Kimlik doğrulama ve yetkilendirme (`auth.md`, `security.md`, `routing.md`)
- [ ] P4: Firebase veri modeli ve etkileşimler (`data.md`)
- [ ] P5: Formlar, erişilebilirlik ve kalite doğrulaması (`qa.md`)
- [ ] P6: Pre-launch SEO, içerik, hosting ve deploy (`deployment.md`)

## Her aşama için zorunlu akış
1. İlgili skill dosyasını ve `docs/progress.md` dosyasını oku.
2. Mevcut kod ve gerçek Firebase/hosting yapılandırmasını doğrula; varsayım yapma.
3. Değişiklikten önce kabul kriterlerini ve test senaryolarını belirle.
4. Değişiklikleri küçük ve geri alınabilir tut; sırları veya `.env` dosyasını commit etme.
5. `npm run lint`, `npm run build` ve ilgili tarayıcı kontrollerini çalıştır.
6. Sonuçları `docs/progress.md` ve gerekiyorsa ilgili karar dokümanına yaz.

## Gating kararları
- Firebase Firestore ile teknik şartnamedeki Realtime Database farkı çözülmeden P4 tamamlanmış sayılmaz.
- Gerçek hosting URL'si ve Firebase rules doğrulanmadan P6 tamamlanmış sayılmaz.
- Kullanıcı içeriği, KVKK/GDPR ve appointment saklama politikası doğrulanmadan üretim formu tamamlanmış sayılmaz.

## Hata yönetimi
- Hata veya regresyon görüldüğünde önce nedeni ve etkilenen skill'i kaydet.
- Kod incelemesi için `/code-review` kullanılabilir; raporlanan bulgular doğrulanmadan kapatılmaz.
