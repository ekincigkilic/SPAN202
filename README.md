# Aula 1 Çalışma (PWA)

Aula 1 ders kitabının 5–9. üniteleri için çevrimdışı çalışan İspanyolca çalışma uygulaması. Arayüz Türkçe, içerik İspanyolca. Hesap ve sunucu yok; tüm veriler cihazda (localStorage) kalır.

**Sürüm 2.0.0:** Ünite 5–9'un tamamı, Genel çalışma, Midterm modu (Ü5–6) ve Final modu (Ü5–9, 7-8-9 ağırlıklı) hazırdır.

İçerik: 445 kelime/kalıp, 39 fiil tablosu, 24 fiilin pretérito perfecto çekimi, 40 konu, 2736 soru, 10 yazma görevi, 22 konuşma sorusu.

## GitHub Pages ile kurulum

1. github.com'da yeni bir **public** depo aç (ör. `aula1`).
2. Bu klasörün **içindeki** her şeyi (index.html en üstte olacak şekilde) depoya yükle: *Add file › Upload files* ile sürükleyip bırakabilirsin.
3. Depoda *Settings › Pages › Build and deployment*: Source = **Deploy from a branch**, Branch = **main**, klasör = **/ (root)**, Save.
4. Bir iki dakika sonra adres hazır olur: `https://KULLANICI-ADIN.github.io/aula1/`

## iPhone / iPad'e ekleme

1. Adresi **Safari** ile aç (ana ekrana ekleme iOS'ta Safari üzerinden yapılır).
2. Paylaş düğmesi › **Ana Ekrana Ekle** › Ekle.
3. Uygulamayı ana ekrandan bir kez **internet varken** aç ve birkaç saniye bekle; dosyalar önbelleğe alınır. Sonra çevrimdışı çalışır.

Notlar:

- iPhone ve iPad'in verileri ayrıdır, otomatik eşitleme yoktur. Taşımak için *Ayarlar › Yedek al* ile dosyayı indir, diğer cihazda *Yedekten yükle*.
- Safari'deki sayfa ile ana ekrana eklenen uygulamanın verileri de birbirinden ayrıdır. Baştan beri ana ekrandaki uygulamayı kullan.
- iOS, uzun süre hiç açılmayan web uygulamalarının verisini silebilir. Sınav dönemi boyunca ara sıra yedek almak iyi olur.

## Güncelleme

Sürüm 1'i (yalnızca Ü5–6) daha önce yüklediysen: depodaki dosyaların hepsini bu klasördekilerle değiştir. `sw.js` içindeki önbellek adı zaten `aula1-v2.0.0` olarak güncellendi; ilerlemen silinmez. Genel çalışma ve Kartlar ekranında Ü7, Ü8, Ü9 düğmelerine bir kez dokunarak seçmen gerekebilir.

Bundan sonra dosyaları değiştirdiğinde `sw.js` içindeki `CACHE` adını da değiştir (ör. `aula1-v1.0.1`). Aksi halde cihazlar eski önbelleği kullanmaya devam eder. Yeni sürüm, uygulama kapatılıp açıldığında etkin olur.

## İçerik ve kaynak etiketleri

- Tüm hazır içerik **üretildi** etiketlidir: kitaptan kopyalanmamış, ünite özetindeki başlıklara göre standart A1 İspanyolcasından yazılmıştır.
- **emin değilim** etiketi, İspanyolcanın doğruluğuyla değil, o kısmın kitapta bu haliyle yer alıp almadığıyla ilgilidir (Ü5 görünüş kelimeleri, Ü5 müzik türleri, Ü6 düzensiz fiil listesi, Ü7 yemek adları, Ü8 yol tarifinde tú biçimleri).
- **kitaptan**: bir kelimenin etiketine dokunarak ya da *Kitaptan kelime ekle* ile kendi kelimelerini ekleyerek verilir. Kitaptan olanlar yeni kartlarda öne alınır, quiz ve deneme seçiminde 3 kat ağırlık alır. *Ayarlar › İçerik kaynağı* ile filtrelenir.

## Testler

```
node tests/run.mjs
```

Node 18+ yeterlidir, kurulum gerekmez. Son çalıştırma: **17861 kontrol geçti, 0 kaldı.**

| Grup | Ne doğrulanıyor | Sonuç |
|---|---|---|
| Düzenli presente üreticisi | hablar, comer, vivir, levantarse, leer elle yazılmış tablolarla | 5 / 5 |
| Düzensiz fiiller | 27 düzensiz tablonun her biri bağımsız kural üreticisiyle (kök değişimi + düzensiz yo) ya da çift girişle (ir, ser, estar, ver, saber); nosotros/vosotros kökü, vosotros aksanı, reflexive zamirler | 295 / 295 |
| Pretérito perfecto | haber çekimi; 24 fiilin participio'su üretici + ikinci bağımsız girişle; düzensizler (hecho, visto, escrito, dicho, puesto, vuelto, abierto, roto); leído aksanı; reflexive zamir yeri | 85 / 85 |
| gustar üreticisi | 6 kişi × tekil/çoğul; nesnelerin tekil/çoğul işareti | 13 / 13 |
| Saat üreticisi | 22 elle yazılmış beklenen değer + 288 saatin tamamında biçim kuralı | 600 / 600 |
| İsimler | 162 ismin çoğulu kural üreticisiyle (öbek çoğulları açık girişle); cinsiyet -o/-a kuralıyla, kural dışı olanlar çift girişle; el agua (dişil); kelimelerden üretilen lo/la/los/las, algún/ningún/muchos ve al/del sorularında 21 elle yazılmış beklenen değer | 488 / 488 |
| Sıfatlar | 93 sıfatın dişil biçimi kural üreticisiyle (istisnalar açıkça listeli) | 94 / 94 |
| Cevap kontrolü | strict / lenient aksan davranışı, ñ, noktalama, büyük harf | 10 / 10 |
| İçerik bütünlüğü | 2736 sorunun her biri: tekil kimlik, geçerli konu, 4 farklı seçenek, doğru cevap seçeneklerde, tek boşluk, "(fiil)" ipuçlu cevap çekim ya da perfecto tablosunda, gusta/gustan ve se come/se comen isimle uyumlu, sıralama alternatifleri aynı kelimelerden, çeldiriciler eş anlamlı değil, kendi cevabı strict modda kabul ediliyor; yazma örnek metinleri kendi ölçütlerini karşılıyor | 16121 / 16121 |
| Soru seçimi ve SM-2 | midterm 15/15 ve yalnızca Ü5–6; final 40 soruda 7/7/9/9/8 (Ü7–9 = %65); konu çeşitliliği; "kitaptan" önceliği; SM-2 aralıkları | 150 / 150 |

Ayrıca Chrome'da iPhone 13 ekran boyutuyla otomatik bir tarayıcı testi çalıştırıldı (68 kontrol, hepsi geçti): 40 konunun her birinde quiz, 4 Midterm ve 3 Final denemesi (tüm cevaplar doğru verildiğinde strict modda 30/30; final dağılımı 5/5/7/7/6), hata defteri ve "sadece yanlışlarım", lenient aksan uyarısı, kart oturumu ve SRS kaydı, yazma kontrolü (Ü7–9 örnek metinleri tüm ölçütleri karşılıyor), kitaptan kelime ekleme, çevrimdışı yeniden yükleme, iPad genişliğinde taşma kontrolü.

**Bu testlerin sınırı:** testler yazım hatalarını ve iç tutarsızlıkları yakalar (yanlış çekim, yanlış artikel, eksik aksan, bozuk soru). Bir kuralı baştan yanlış biliyor olsaydım iki kaynak da aynı hatayı taşırdı; bunu test yakalayamaz. Türkçe çevirilerin ve elle yazılmış çoktan seçmeli soruların "doğru şık gerçekten doğru mu" kontrolü otomatik değildir.

## Bilinen eksikler ve sınırlar

1. **İçeriğin tamamı "üretildi".** Kitabın kendi kelime listeleri ve örnekleri uygulamada yok. Sınavda kitaba özgü bir kelime çıkarsa uygulamada olmayabilir; kitap sayfası ya da ders notu geldikçe eklenmeli.
2. **Gerçek iPhone/iPad'de denenmedi.** Testler masaüstü Chrome'da telefon boyutunda yapıldı. Safari'ye özgü davranışlar (ana ekrana ekleme, ses, mikrofon) cihazda doğrulanmalı.
3. **Konuşma tanıma iOS'ta güvenilir değil.** Safari'de çalışabilir; ana ekrana eklenen uygulamada çoğu zaman çalışmaz. Çalışmazsa uygulama hata mesajı verir ve kayıt + öz değerlendirme modu kullanılır. Tanıma internet gerektirebilir. Telaffuz otomatik değerlendirilmez.
4. **Sesli okuma cihazdaki İspanyolca sese bağlı.** Ses yoksa uygulama uyarır (iOS: Ayarlar › Erişilebilirlik › Seslendirilen İçerik › Sesler).
5. **Yazma kontrolü yüzeyseldir.** Kural tabanlı kontrol yalnızca beklenen yapıların ve kelimelerin metinde geçip geçmediğine bakar; dilbilgisi hatasını bulmaz. Bunun için isteğe bağlı Claude düzeltmesi var.
6. **Claude düzeltmesi gerçek bir anahtarla denenmedi.** İstek biçimi Anthropic Messages API'sine göre yazıldı ama test ortamında anahtar ve internet yoktu. Varsayılan model adı `claude-sonnet-5-5`; hata alırsan Ayarlar'dan değiştir. Bu özellik internet ister ve API kullanımı ücretlidir.
7. **Çeviri ve cümle sıralama sorularında** yalnızca listelenen cevaplar kabul edilir. Doğru ama listede olmayan bir cümle yanlış sayılabilir; geri bildirimde kabul edilen alternatifler gösterilir.
8. **"kitaptan" etiketi şimdilik yalnızca kelimelerde.** Dilbilgisi açıklamaları ve elle yazılmış sorular hep "üretildi". Kitap sayfası ya da ders notu geldiğinde bunlar içerik dosyalarında (`js/data/u5.js` … `u9.js`) güncellenir.
9. **Veriler IndexedDB yerine localStorage'da.** Veri küçük olduğu için yeterli; ses kayıtları saklanmaz.
10. **Deneme sınavında** geri dönüp cevap değiştirme yok; soru boş bırakılabilir.
11. Kısa bir sınav tarihi girildiğinde günlük yeni kelime hedefi 40'ta sınırlanır; kalan gün azsa tüm kelimeler yetişmeyebilir.
12. Ünite 9'da *ya / todavía no* ve *hoy / esta semana* yok (onayladığın kapsam). Derste işlenirse eklenmeli.
13. Aynı kelime iki ünitede geçebiliyor (ör. *nunca*, *poner*); kartlarda iki ayrı kart olarak görünür.

## Dosyalar

```
index.html, manifest.webmanifest, sw.js, css/app.css, icons/
js/spanish.js     çekim, participio, saat, gustar, çoğul/dişil üreticileri, cevap kontrolü, SM-2
js/data/u5.js … u9.js   ünite içerikleri
js/content.js     içerik deposu
js/quiz.js        soru üretimi, seçim, değerlendirme
js/store.js       cihazdaki kayıt
js/app.js         arayüz
tests/run.mjs     mantık testleri
```
