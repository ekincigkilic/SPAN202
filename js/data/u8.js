// Unidad 8 — El barrio ideal. Tüm içerik "üretildi" etiketlidir.
const T = rows => `<table>${rows.map((r, i) => `<tr>${r.map(c => i ? `<td>${c}</td>` : `<th>${c}</th>`).join('')}</tr>`).join('')}</table>`;

export const U8 = {
  u: 8,
  title: 'El barrio ideal',
  grammar: [
    {
      id: 'g8-cuant', title: 'Cuantificadores: algún, ningún, muchos…',
      html: `<p>Miktar bildirirler ve isimle <b>cinsiyet ve sayı</b> bakımından uyum yaparlar.</p>
${T([['', 'eril tekil', 'dişil tekil', 'eril çoğul', 'dişil çoğul'],
        ['herhangi bir / bazı', '<b>algún</b> bar', '<b>alguna</b> tienda', '<b>algunos</b> bares', '<b>algunas</b> tiendas'],
        ['hiç', '<b>ningún</b> bar', '<b>ninguna</b> tienda', '—', '—'],
        ['çok', 'mucho ruido', 'mucha gente', '<b>muchos</b> bares', '<b>muchas</b> tiendas'],
        ['az', 'poco ruido', 'poca gente', '<b>pocos</b> bares', '<b>pocas</b> tiendas'],
        ['yeterince / epey', 'bastante ruido', 'bastante gente', '<b>bastantes</b> bares', '<b>bastantes</b> tiendas'],
        ['birkaç', '—', '—', '<b>varios</b> bares', '<b>varias</b> tiendas']])}
<ul><li><b>algún / ningún</b> yalnızca eril tekil isimden önce kullanılır. İsim söylenmezse <b>alguno / ninguno</b> olur: <i>— ¿Hay algún banco? — No, no hay ninguno.</i></li>
<li><b>ningún / ninguna</b> ile cümlede <b>no</b> da bulunur: <i>No hay ningún cine.</i></li>
<li>Sıfatla <b>muy</b>, isimle <b>mucho/a/os/as</b>: <i>muy tranquilo</i> ama <i>mucho ruido</i>.</li></ul>`,
      examples: [['En mi barrio hay muchas tiendas, pero no hay ningún cine.', 'Mahallemde çok dükkân var ama hiç sinema yok.'], ['¿Hay alguna farmacia por aquí?', 'Buralarda bir eczane var mı?'], ['Hay bastantes bares y varios restaurantes.', 'Epey bar ve birkaç restoran var.']],
      mc: [
        'En mi barrio no hay ___ cine.|ningún|ninguno|ninguna|algún',
        '¿Hay ___ farmacia cerca?|alguna|algún|algunos|ninguno',
        '— ¿Hay algún banco por aquí? — No, no hay ___ .|ninguno|ningún|ninguna|algunos',
        'En el centro hay ___ tiendas.|muchas|muchos|mucha|mucho',
        '«algún» ne zaman «alguno» olur?|İsim söylenmeden tek başına kullanıldığında|Dişil isimden önce|Çoğul isimden önce|Hiçbir zaman',
        'Hay ___ ruido en esta calle.|mucho|muchos|muy|muchas',
        'En mi pueblo hay ___ bares, solo dos.|pocos|pocas|poco|un poco',
        '— ¿Hay bares en tu barrio? — Sí, hay ___ . (birkaç tane)|algunos|algún|alguno|ningunos',
      ],
      fill: [
        'En mi barrio hay ___ parques. (çok)|muchos',
        'No hay ___ biblioteca en mi pueblo. (hiç)|ninguna',
        '¿Hay ___ supermercado por aquí? (herhangi bir)|algún',
        'En esta calle hay ___ tiendas. (az)|pocas',
        'Hay ___ gente en la plaza. (çok)|mucha',
        'En mi ciudad no hay ___ aeropuerto. (hiç)|ningún',
      ],
      tr: [
        'Mahallemde hiç sinema yok.|En mi barrio no hay ningún cine.|No hay ningún cine en mi barrio.',
        'Buralarda bir eczane var mı?|¿Hay alguna farmacia por aquí?|¿Hay una farmacia por aquí?',
        'Merkezde çok bar var.|En el centro hay muchos bares.|Hay muchos bares en el centro.',
      ],
    },
    {
      id: 'g8-hay', title: 'Hay / está / están',
      html: `<p>İkisi de Türkçeye "var / -da" diye çevrilebilir ama işlevleri farklıdır.</p>
${T([['', 'ne zaman', 'örnek'],
        ['<b>hay</b>', 'Bir şeyin <b>var olduğunu</b> söylerken. Ardından un/una, sayı, mucho, algún, ningún ya da artikelsiz çoğul gelir.', 'Hay <b>un</b> parque. · Hay <b>dos</b> bares. · No hay <b>ningún</b> cine.'],
        ['<b>está / están</b>', 'Bilinen bir şeyin <b>nerede olduğunu</b> söylerken. Özne el/la/los/las, mi/tu… ya da özel isimdir.', '<b>El</b> parque está cerca. · <b>Los</b> bares están en la plaza.']])}
<ul><li><b>hay</b> tekil ve çoğul için aynıdır.</li><li><i>Hay el parque</i> denmez; <i>Está un parque</i> de denmez.</li>
<li>Soru: <i>¿Hay un banco por aquí?</i> (var mı?) · <i>¿Dónde está el banco?</i> (nerede?)</li></ul>`,
      examples: [['En mi calle hay una farmacia. La farmacia está al lado del banco.', 'Sokağımda bir eczane var. Eczane bankanın yanında.'], ['¿Dónde están los servicios?', 'Tuvaletler nerede?']],
      mc: [
        '___ un parque cerca de mi casa.|Hay|Está|Es|Están',
        'El hospital ___ lejos del centro.|está|hay|es|están',
        '¿Dónde ___ la estación de metro?|está|hay|es|son',
        'En mi barrio ___ dos supermercados.|hay|están|son|está',
        'Los bares ___ en la plaza Mayor.|están|hay|son|está',
        '«hay» hangi tür kelimelerle kullanılır?|un/una, sayılar, mucho, algún… (belirsiz)|el/la/los/las (belirli)|Sadece çoğul isimlerle|Sadece özel isimlerle',
        '¿ ___ una farmacia por aquí?|Hay|Está|Es|Están',
        'Mi casa ___ al lado del mercado.|está|hay|es|son',
      ],
      fill: [
        'En mi calle ___ una farmacia y dos bares.|hay',
        'La biblioteca ___ enfrente del parque.|está',
        'Las tiendas ___ en el centro.|están',
        '¿Dónde ___ los servicios?|están',
        'No ___ ningún cine en mi pueblo.|hay',
        '¿Dónde ___ el ayuntamiento?|está',
      ],
      tr: [
        'Hastane nerede?|¿Dónde está el hospital?',
        'Evimin yakınında bir park var.|Hay un parque cerca de mi casa.|Cerca de mi casa hay un parque.',
      ],
    },
    {
      id: 'g8-prep', title: 'Preposiciones y adverbios de lugar',
      html: `${T([['İspanyolca', 'Türkçe', 'örnek'],
        ['<b>en</b>', '-de / -da', 'Vivo en Ankara. Está en la plaza.'],
        ['<b>a</b>', '-e / -a (yön); uzaklık', 'Voy al parque. Está a cinco minutos.'],
        ['<b>al lado de</b>', 'yanında', 'al lado del banco'],
        ['<b>cerca de</b> / <b>lejos de</b>', 'yakınında / uzağında', 'cerca de la universidad'],
        ['<b>enfrente de</b>', 'karşısında', 'enfrente del museo'],
        ['<b>delante de</b> / <b>detrás de</b>', 'önünde / arkasında', 'detrás de la iglesia'],
        ['<b>entre</b> … <b>y</b> …', 'arasında', 'entre el bar y la farmacia'],
        ['<b>a la derecha</b> / <b>a la izquierda (de)</b>', 'sağında / solunda', 'a la derecha del cine'],
        ['<b>al final de</b>', 'sonunda', 'al final de la calle'],
        ['<b>en la esquina</b>', 'köşede', '']])}
<ul><li>Zorunlu birleşmeler: <b>a + el = al</b>, <b>de + el = del</b>. Diğerleri birleşmez: <i>de la, de los, de las, a la</i>.</li>
<li><i>cerca</i> ve <i>lejos</i> tek başına da kullanılır: <i>Está muy cerca.</i></li>
<li>Uzaklık: <i>Está a diez minutos a pie / en metro.</i></li></ul>`,
      examples: [['La farmacia está al lado del supermercado.', 'Eczane süpermarketin yanında.'], ['Mi casa está lejos del centro, pero cerca de la universidad.', 'Evim merkezden uzak ama üniversiteye yakın.'], ['El bar está entre el banco y la biblioteca.', 'Bar, banka ile kütüphanenin arasında.']],
      mc: [
        '«yanında»|al lado de|lejos de|enfrente de|detrás de',
        '«karşısında»|enfrente de|delante de|al lado de|entre',
        'de + el =|del|de el|al|dél',
        'a + el =|al|a el|del|ale',
        'El banco está ___ la farmacia y el bar. (arasında)|entre|en|cerca|lejos',
        '«cerca» ile «lejos» ilişkisi?|Zıt anlamlı: yakın / uzak|Eş anlamlı|İkisi de «karşısında» demek|cerca = sol, lejos = sağ',
        'Vivo ___ Ankara.|en|a|de la|al',
        'El cine está ___ la derecha.|a|en|de|por la',
        '«delante de» ile «enfrente de» farkı?|delante de = önünde, enfrente de = karşısında|İkisi de «arkasında» demek|Fark yok|delante de = uzağında',
      ],
      fill: [
        'El parque está lejos ___ centro.|del',
        'La parada está al lado ___ farmacia.|de la',
        'El bar está ___ la esquina. (köşede)|en',
        'La biblioteca está a cinco minutos ___ pie.|a',
        'Mi casa está cerca ___ universidad.|de la',
        'El mercado está al final ___ calle.|de la',
        'El museo está detrás ___ ayuntamiento.|del',
      ],
      tr: [
        'Eczane bankanın yanında.|La farmacia está al lado del banco.',
        'Evim merkezden uzak.|Mi casa está lejos del centro.',
      ],
      order: ['La farmacia está al lado del supermercado', 'El metro está a cinco minutos a pie'],
    },
    {
      id: 'g8-llegar', title: 'Pedir y dar información para llegar a un sitio',
      unsure: 'Kitabın yol tarifinde tú mu usted mi kullandığı bilinmiyor. Onayladığın gibi tú biçimleri esas alındı; usted biçimleri ek bilgi olarak verildi.',
      html: `<p><b>Yol sorma:</b></p>
<ul><li><i>Perdona, ¿hay una farmacia por aquí?</i> (Affedersin, buralarda eczane var mı?)</li>
<li><i>Perdona, ¿dónde está la estación de metro?</i></li><li><i>¿Está muy lejos?</i> (Çok uzak mı?)</li></ul>
<p><b>Yol tarif etme (tú):</b></p>
${T([['İspanyolca', 'Türkçe'],
        ['<b>Sigue</b> todo recto.', 'Dümdüz devam et.'],
        ['<b>Gira</b> a la derecha / a la izquierda.', 'Sağa / sola dön.'],
        ['<b>Coge</b> (ya da <b>toma</b>) la primera / segunda calle a la derecha.', 'Sağdan birinci / ikinci sokağa gir.'],
        ['<b>Cruza</b> la plaza / la calle.', 'Meydanı / sokağı geç.'],
        ['Sigue <b>hasta el final de</b> la calle.', 'Sokağın sonuna kadar devam et.'],
        ['Está <b>a (unos) cinco minutos a pie</b>.', 'Yürüyerek (yaklaşık) beş dakika uzaklıkta.']])}
<p class="note">Ek (usted): Perdone… · Siga todo recto. · Gire a la derecha. · Coja / Tome la primera calle. · Cruce la plaza.</p>`,
      examples: [['Sigue todo recto y gira a la izquierda.', 'Dümdüz devam et ve sola dön.'], ['Coge la segunda calle a la derecha; la farmacia está al lado del banco.', 'Sağdan ikinci sokağa gir; eczane bankanın yanında.'], ['— ¿Está lejos? — No, está a cinco minutos a pie.', '— Uzak mı? — Hayır, yürüyerek beş dakika.']],
      mc: [
        '«Dümdüz devam et.»|Sigue todo recto.|Gira todo recto.|Cruza a la derecha.|Coge todo recto.',
        '«Sağa dön.»|Gira a la derecha.|Gira a la izquierda.|Sigue todo recto.|Cruza la calle.',
        '«Soldan ikinci sokağa gir.»|Coge la segunda calle a la izquierda.|Coge la primera calle a la izquierda.|Coge la segunda calle a la derecha.|Cruza la segunda plaza.',
        'Yol sorarken (tú):|Perdona, ¿hay una farmacia por aquí?|Hola, quiero una farmacia.|¿Qué farmacia es?|Farmacia, por favor, gracias.',
        '«Está a cinco minutos a pie» ne demek?|Yürüyerek beş dakika uzaklıkta|Beş dakika sonra kapanıyor|Beş dakikadır yürüyorum|Yürüyerek beş kilometre',
        '«a pie» ne demek?|yürüyerek|ayakta|arabayla|ayağın altında',
        '«Cruza la plaza» ne demek?|Meydanı geç|Meydana dön|Meydanda dur|Meydanı bul',
        'Hangisi usted biçimidir? (ek bilgi)|Siga todo recto.|Sigue todo recto.|Sigues todo recto.|Seguir todo recto.',
      ],
      fill: [
        'Sigue todo ___ . (düz)|recto',
        'Gira a la ___ . (sol)|izquierda',
        'Coge la primera calle a la ___ . (sağ)|derecha',
        'Perdona, ¿ ___ está la estación de metro?|dónde',
        '— ¿Está muy ___ ? — No, está a dos minutos. (uzak)|lejos',
        'El museo está a diez minutos ___ pie.|a',
        '___ la plaza y gira a la izquierda. (karşıya geç; tú)|Cruza',
      ],
      order: ['Sigue todo recto y gira a la derecha', 'Coge la segunda calle a la izquierda'],
      tr: [
        'Dümdüz devam et ve sola dön.|Sigue todo recto y gira a la izquierda.',
        'Buralarda bir süpermarket var mı?|¿Hay un supermercado por aquí?|¿Hay algún supermercado por aquí?',
      ],
    },
    {
      id: 'g8-loque', title: 'Lo que más / menos me gusta',
      html: `<p>Bir yerin en çok ya da en az sevilen yönünü vurgulamak için:</p>
<p><b>Lo que más me gusta de</b> mi barrio <b>es</b> + tekil isim / infinitivo<br><b>Lo que más me gusta de</b> mi barrio <b>son</b> + çoğul isim</p>
<ul><li><i>Lo que más me gusta de mi barrio es la gente.</i></li><li><i>Lo que más me gusta son los parques.</i></li>
<li><i>Lo que menos me gusta es el ruido.</i> (en az sevdiğim şey)</li><li><i>Lo que más me gusta es pasear por el centro.</i></li></ul>
<p>Kişi değişirse zamir değişir: <i>Lo que más <b>le</b> gusta…, Lo que más <b>nos</b> gusta…</i></p>`,
      examples: [['Lo que más me gusta de mi barrio es el parque.', 'Mahallemde en çok sevdiğim şey park.'], ['Lo que menos me gusta de mi ciudad son los coches.', 'Şehrimde en az sevdiğim şey arabalar.']],
      fill: [
        'Lo que más me gusta de mi barrio ___ el parque.|es',
        'Lo que más me gusta de mi ciudad ___ los bares.|son',
        'Lo que ___ me gusta es el ruido. (en az)|menos',
        'Lo ___ más me gusta de Ankara es la gente.|que',
        'Lo que más me gusta ___ pasear por el centro.|es',
        'Lo que menos me gusta ___ mi barrio es el tráfico.|de',
      ],
      mc: [
        'Lo que más me gusta de mi barrio ___ las tiendas.|son|es|está|hay',
        '«Lo que menos me gusta» ne demek?|En az sevdiğim şey|En çok sevdiğim şey|Hiç sevmediğim kişi|Daha az severim',
        'Hangisi doğru?|Lo que más me gusta es la plaza.|Lo que más me gusta son la plaza.|Que lo más me gusta es la plaza.|Lo más que me gusta es la plaza.',
        'Lo que más me gusta de mi ciudad es ___ .|la gente|las plazas|los parques|los bares y las tiendas',
      ],
      tr: ['Mahallemde en çok sevdiğim şey park.|Lo que más me gusta de mi barrio es el parque.'],
      order: ['Lo que más me gusta de mi barrio es la gente'],
    },
  ],
  vocab: [
    {
      id: 'v8-lugares', title: 'Servicios y lugares de la ciudad',
      n: [
        'el supermercado; supermercados; süpermarket', 'la farmacia; farmacias; eczane', 'el hospital; hospitales; hastane', 'la estación de metro; estaciones de metro; metro istasyonu',
        'la parada de autobús; paradas de autobús; otobüs durağı', 'el banco; bancos; banka', 'el cajero; cajeros; bankamatik', 'la biblioteca; bibliotecas; kütüphane',
        'el colegio; colegios; okul', 'la universidad; universidades; üniversite', 'el parque; parques; park', 'la plaza; plazas; meydan', 'el mercado; mercados; pazar, hal',
        'el gimnasio; gimnasios; spor salonu', 'el polideportivo; polideportivos; spor kompleksi', 'el cine; cines; sinema', 'el teatro; teatros; tiyatro', 'el museo; museos; müze',
        'la iglesia; iglesias; kilise', 'la mezquita; mezquitas; cami', 'el ayuntamiento; ayuntamientos; belediye binası', 'la oficina de correos; oficinas de correos; postane',
        'la comisaría; comisarías; karakol', 'el centro comercial; centros comerciales; alışveriş merkezi', 'la tienda; tiendas; dükkân, mağaza', 'el bar; bares; bar, kafe',
        'el restaurante; restaurantes; restoran', 'la zona peatonal; zonas peatonales; yayalara ayrılmış bölge', 'el aparcamiento; aparcamientos; otopark', 'el carril bici; carriles bici; bisiklet yolu',
        'el aeropuerto; aeropuertos; havalimanı',
      ],
    },
    {
      id: 'v8-ciudad', title: 'La ciudad y las indicaciones',
      n: [
        'el barrio; barrios; mahalle, semt', 'la ciudad; ciudades; şehir', 'el pueblo; pueblos; kasaba, köy', 'el centro; centros; merkez', 'la calle; calles; sokak, cadde',
        'la avenida; avenidas; bulvar', 'la esquina; esquinas; köşe', 'el semáforo; semáforos; trafik ışığı', 'el edificio; edificios; bina', 'el puente; puentes; köprü',
        'el río; ríos; nehir', 'la playa; playas; plaj',
      ],
      phr: [
        'a la derecha; sağda, sağa', 'a la izquierda; solda, sola', 'todo recto; dümdüz', 'al lado de; yanında', 'cerca de; yakınında', 'lejos de; uzağında', 'enfrente de; karşısında',
        'delante de; önünde', 'detrás de; arkasında', 'entre; arasında', 'al final de la calle; sokağın sonunda', 'en la esquina; köşede',
        'a pie; yürüyerek', 'en metro; metroyla', 'en autobús; otobüsle', 'por aquí; buralarda',
        'seguir todo recto; dümdüz devam etmek', 'girar; dönmek', 'cruzar; karşıya geçmek', 'coger la primera calle; ilk sokağa girmek',
      ],
    },
    {
      id: 'v8-adjetivos', title: 'Adjetivos para describir un barrio',
      adj: [
        'ruidoso; ruidosa; gürültülü', 'bonito; bonita; güzel', 'antiguo; antigua; eski', 'moderno; moderna; modern', 'céntrico; céntrica; merkezî',
        'bien comunicado; bien comunicada; ulaşımı iyi', 'mal comunicado; mal comunicada; ulaşımı kötü', 'limpio; limpia; temiz', 'sucio; sucia; kirli',
        'seguro; segura; güvenli', 'peligroso; peligrosa; tehlikeli', 'caro; cara; pahalı', 'barato; barata; ucuz', 'animado; animada; hareketli, canlı',
        'grande; grande; büyük', 'pequeño; pequeña; küçük', 'histórico; histórica; tarihî', 'turístico; turística; turistik', 'residencial; residencial; konut ağırlıklı',
        'nuevo; nueva; yeni', 'famoso; famosa; ünlü',
      ],
      phr: ['hay mucho ruido; çok gürültü var', 'hay mucho tráfico; trafik yoğun', 'hay muchas zonas verdes; çok yeşil alan var', 'hay mucha vida; çok canlı, hayat dolu'],
    },
  ],
  writing: [
    {
      title: 'Mahallem',
      prompt: 'Mahalleni (ya da ideal mahalleni) anlat: neler var, neler yok, nerede; nasıl bir yer; en çok ve en az neyi seviyorsun?',
      min: 50, max: 90,
      checks: [
        { label: 'hay ile var olanı söyleme', re: '\\bhay\\b' },
        { label: 'está / están ile yer bildirme', re: '\\b(esta|estan)\\b' },
        { label: 'ningún / ninguna ya da algún / alguna', re: '\\b(ningun|ninguna|algun|alguna|algunos|algunas)\\b' },
        { label: 'muchos / muchas / pocos / bastantes / varios', re: '\\b(muchos|muchas|pocos|pocas|bastantes|varios|varias)\\b' },
        { label: 'yer edatı (al lado de, cerca de, lejos de, enfrente de…)', re: '\\b(al lado de|cerca de|lejos de|enfrente de|delante de|detras de|entre)\\b' },
        { label: 'Lo que más / menos me gusta', re: '\\blo que (mas|menos) me gusta\\b' },
        { label: 'en az 3 yer kelimesi', vocab: 'v8-lugares', n: 3 },
        { label: 'en az 2 mahalle sıfatı', vocab: 'v8-adjetivos', n: 2 },
      ],
      model: 'Vivo en un barrio pequeño y bastante tranquilo. Está lejos del centro, pero está bien comunicado: hay una estación de metro y varias paradas de autobús. En mi calle hay muchas tiendas, un supermercado y dos bares. La farmacia está al lado del banco. No hay ningún cine, pero hay un parque muy bonito cerca de mi casa. Lo que más me gusta de mi barrio es la gente. Lo que menos me gusta es el tráfico.',
    },
    {
      title: 'Yol tarifi',
      prompt: 'Bir arkadaşın evine (ya da kampüsüne) geliyor. Metro istasyonundan ya da duraktan oraya nasıl gideceğini tarif et.',
      min: 35, max: 75,
      checks: [
        { label: 'sigue (todo recto)', re: '\\bsigue\\b' },
        { label: 'gira', re: '\\bgira\\b' },
        { label: 'coge / toma / cruza', re: '\\b(coge|toma|cruza)\\b' },
        { label: 'a la derecha / a la izquierda', re: '\\ba la (derecha|izquierda)\\b' },
        { label: 'uzaklık (a … minutos / a pie)', re: '\\b(minutos|a pie)\\b' },
        { label: 'yer edatı (al lado de, enfrente de, cerca de…)', re: '\\b(al lado de|cerca de|enfrente de|delante de|detras de|entre|al final de)\\b' },
        { label: 'en az 2 yer kelimesi', vocab: 'v8-lugares', n: 2 },
      ],
      model: 'Mi casa está a diez minutos a pie de la estación de metro. Primero sigue todo recto hasta la plaza. Después cruza la plaza y gira a la izquierda. Coge la segunda calle a la derecha. Mi casa está al final de la calle, enfrente de la farmacia y al lado de un supermercado. No está lejos.',
    },
  ],
  speaking: [
    { q: '¿Cómo es tu barrio?', tr: 'Mahallen nasıl?', kw: ['es|está', 'hay', 'muy|bastante|un poco'], list: ['En az 2 sıfat kullandım', 'hay ile en az 3 yer saydım', 'Sıfatları barrio ile uyumlu (eril) kullandım'], model: 'Mi barrio es tranquilo y bastante bonito. Hay muchas tiendas, dos parques y una estación de metro.' },
    { q: '¿Qué es lo que más te gusta de tu ciudad?', tr: 'Şehrinde en çok neyi seviyorsun?', kw: ['lo que más me gusta', 'es|son'], list: ['Lo que más me gusta… es / son kalıbını kurdum', 'es / son uyumu doğruydu', 'En az sevdiğim bir şeyi de söyledim'], model: 'Lo que más me gusta de mi ciudad son los parques. Lo que menos me gusta es el tráfico.' },
    { q: 'Perdona, ¿hay una farmacia por aquí?', tr: 'Affedersin, buralarda bir eczane var mı? (yol tarif et)', kw: ['sigue|gira|coge|toma|cruza', 'derecha|izquierda|recto', 'está'], list: ['En az 2 yön fiili kullandım (sigue, gira, coge, cruza)', 'derecha / izquierda dedim', 'Uzaklığı söyledim (a … minutos)'], model: 'Sí, hay una muy cerca. Sigue todo recto y gira a la derecha. La farmacia está al lado del banco, a dos minutos a pie.' },
    { q: '¿Qué hay cerca de tu casa?', tr: 'Evinin yakınında neler var?', kw: ['hay', 'cerca|al lado|enfrente'], list: ['hay + un / una / sayı kullandım', 'En az bir yer edatı kullandım', 'Olmayan bir şeyi de söyledim (no hay ningún…)'], model: 'Cerca de mi casa hay un supermercado y una parada de autobús. Enfrente hay un parque. No hay ninguna biblioteca.' },
  ],
};
