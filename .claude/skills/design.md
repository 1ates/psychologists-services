# Design Skill — Figma ve Görsel Uygulama

## Kaynak
- Ana Figma dosyası: `ljc27Kxth8vDp3ZBvNTONB`.
- UI-KIT, Home, Psychologists, Favorites, card ve modal node'ları kullanıcı şartnamesindeki bağlantılardan doğrula.
- Figma bağlamı kod üretiminden önce alınır; geçici Figma asset URL'leri runtime'da kullanılmaz.

## Kurallar
- Mevcut React/CSS Module mimarisini koru; Tailwind veya yeni bir UI framework ekleme.
- 320px–1440px aralığında mobile, tablet ve desktop görünümünü kontrol et.
- Figma ölçülerini körü körüne absolute positioning ile kopyalama; responsive flex/grid ve mevcut token'ları kullan.
- Semantik HTML, gerçek heading sırası, görünür focus state ve anlamlı alt metin kullan.
- Tüm etkileşimli ikonlara erişilebilir ad ekle.
- Figma'daki yeşil, mavi ve turuncu tema varyasyonlarını `src/index.css` token'ları üzerinden uygula.
- Her UI değişikliğinden sonra screenshot/DOM ve browser console ile doğrula.

## Kabul kriterleri
- Header, Home hero, psychologist card, Favorites ve modal ekranları referans düzeni korur.
- Mobilde yatay taşma yoktur; kart içeriği ve modal ekranı kullanılabilir kalır.
- Placeholder, sahte üretim görseli veya doğrulanmamış içerik eklenmez.
