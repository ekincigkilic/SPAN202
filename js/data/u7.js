// Unidad 7 — ¡A comer! Tüm içerik "üretildi" etiketlidir.
const T = rows => `<table>${rows.map((r, i) => `<tr>${r.map(c => i ? `<td>${c}</td>` : `<th>${c}</th>`).join('')}</tr>`).join('')}</table>`;

export const U7 = {
  u: 7,
  title: '¡A comer!',
  verbs: [
    { inf: 'poner', tr: 'koymak; (barda) vermek', grp: 'yo -go', topic: 'g7-poner', forms: ['pongo', 'pones', 'pone', 'ponemos', 'ponéis', 'ponen'] },
    { inf: 'traer', tr: 'getirmek', grp: 'yo -go', topic: 'g7-poner', forms: ['traigo', 'traes', 'trae', 'traemos', 'traéis', 'traen'] },
  ],
  grammar: [
    {
      id: 'g7-se', title: 'La forma impersonal con se',
      html: `<p>Kimin yaptığı önemli olmadığında ya da "genel olarak insanlar" kastedildiğinde <b>se + fiilin 3. kişisi</b> kullanılır. Türkçedeki edilgen/genel anlatıma karşılık gelir: <i>yenir, içilir, denir</i>.</p>
${T([['', 'yapı', 'örnek'],
        ['tekil isim', 'se + 3. tekil', 'En España <b>se come</b> mucho pescado.'],
        ['çoğul isim', 'se + 3. çoğul', 'En España <b>se comen</b> muchas verduras.'],
        ['isim yok / zarf', 'se + 3. tekil', 'Aquí <b>se cena</b> muy tarde.']])}
<ul><li>Fiil, hakkında konuşulan isimle uyum yapar. İsim fiilden önce de gelebilir: <i>Las patatas se cocinan con aceite.</i></li>
<li>Sık kalıplar: <i>¿Cómo se dice…?</i> (… nasıl denir?), <i>¿Cómo se escribe?</i> (nasıl yazılır?).</li></ul>`,
      examples: [['En España se cena muy tarde.', 'İspanya\'da akşam yemeği çok geç yenir.'], ['En mi país se bebe mucho té.', 'Benim ülkemde çok çay içilir.'], ['En México se comen muchos tacos.', 'Meksika\'da çok taco yenir.'], ['¿Cómo se dice «afiyet olsun» en español?', '"Afiyet olsun" İspanyolcada nasıl denir?']],
      fill: [
        'En España ___ muy tarde. (cenar)|se cena',
        'En Turquía ___ mucho té. (beber)|se bebe',
        'En Argentina ___ mucha carne. (comer)|se come',
        'En España ___ muchas verduras. (comer)|se comen',
        'El gazpacho ___ frío. (tomar)|se toma',
        'Las patatas ___ con sal. (cocinar)|se cocinan',
        'En mi país ___ mucho pescado. (comer)|se come',
        'En los bares españoles ___ muchas tapas. (comer)|se comen',
        'La paella ___ con arroz. (hacer)|se hace',
        'Los tacos ___ con las manos. (comer)|se comen',
      ],
      mc: [
        '«En España se cena tarde» ne demek?|İspanya\'da akşam yemeği geç yenir (genel olarak)|İspanya akşam yemeğini geç yer|O, İspanya\'da geç yemek yer|İspanya\'da geç yemek yedim',
        'Hangisi doğru?|En México se comen muchos tacos.|En México se come muchos tacos.|En México se comen mucho taco.|En México comen se muchos tacos.',
        'se impersonal\'de fiil neye göre tekil ya da çoğul olur?|Hakkında konuşulan isme göre|Her zaman tekildir|Her zaman çoğuldur|Konuşan kişiye göre',
        '¿Cómo ___ «teşekkürler» en español?|se dice|se dicen|dice se|se decir',
        'En este restaurante ___ muy bien.|se come|se comen|come se|se comer',
        '¿Cómo ___ «paella»? — P-A-E-L-L-A.|se escribe|se escriben|escribe se|se escribir',
      ],
      tr: [
        'İspanya\'da akşam yemeği çok geç yenir.|En España se cena muy tarde.|Se cena muy tarde en España.',
        'Türkiye\'de çok çay içilir.|En Turquía se bebe mucho té.|En Turquía se toma mucho té.|Se bebe mucho té en Turquía.',
      ],
      order: ['En España se come mucho pescado|Se come mucho pescado en España', 'En mi país se bebe mucho té|Se bebe mucho té en mi país'],
    },
    {
      id: 'g7-poner', title: 'Los verbos poner y traer',
      html: `<p>İkisinin de yalnızca <b>yo</b> biçimi düzensizdir (-go).</p>
${T([['', 'poner', 'traer'], ['yo', '<b>pongo</b>', '<b>traigo</b>'], ['tú', 'pones', 'traes'], ['él / ella / usted', 'pone', 'trae'], ['nosotros/as', 'ponemos', 'traemos'], ['vosotros/as', 'ponéis', 'traéis'], ['ellos / ellas / ustedes', 'ponen', 'traen']])}
<p>Bar ve restoranda:</p>
<ul><li><b>poner</b> = (barda) vermek, servis etmek: <i>¿Me pone un café, por favor?</i> (usted) · <i>¿Me pones una caña?</i> (tú) · <i>¿Qué les pongo?</i> (Size ne vereyim?)</li>
<li><b>traer</b> = getirmek: <i>¿Me trae la cuenta, por favor?</i> · <i>¿Nos trae un poco más de pan?</i></li>
<li>İstenen kişi <b>me / nos</b> ile gösterilir ve fiilden önce gelir.</li></ul>`,
      examples: [['¿Me pone un café con leche, por favor?', 'Bana bir sütlü kahve verir misiniz lütfen?'], ['¿Nos trae la cuenta, por favor?', 'Hesabı getirir misiniz lütfen?'], ['Yo traigo el postre.', 'Tatlıyı ben getiriyorum.']],
      fill: [
        'Yo ___ la mesa todos los días. (poner)|pongo',
        '¿Me ___ un café con leche, por favor? (poner, usted)|pone',
        '¿Me ___ la cuenta, por favor? (traer, usted)|trae',
        'Yo ___ el postre. (traer)|traigo',
        '¿Nos ___ un poco más de pan? (traer, tú)|traes',
        'Los camareros ___ las bebidas. (traer)|traen',
        '— ¿Qué te ___ ? — Un agua con gas. (poner, yo)|pongo',
        '¿Vosotros ___ la mesa? (poner)|ponéis',
      ],
      mc: [
        'Barda kahve istemek için (usted):|¿Me pone un café, por favor?|¿Me pongo un café, por favor?|¿Yo pone un café, por favor?|¿Me poner un café, por favor?',
        '«traer» fiilinin yo çekimi?|traigo|trao|traio|trayo',
        '«poner» fiilinin yo çekimi?|pongo|pono|puengo|poño',
        'Hesabı istemek için:|La cuenta, por favor.|El menú, por favor.|La mesa, por favor.|La carta está bien.',
        '«¿Qué les pongo?» cümlesini kim söyler?|Garson, müşterilere|Müşteri, garsona|Aşçı, garsona|Müşteri, başka bir müşteriye',
      ],
      tr: [
        'Hesabı getirir misiniz lütfen? (usted)|¿Me trae la cuenta, por favor?|¿Nos trae la cuenta, por favor?',
        'Bana bir kahve verir misin? (tú, barda)|¿Me pones un café?|¿Me pones un café, por favor?',
      ],
    },
    {
      id: 'g7-od', title: 'Los pronombres de OD: lo, la, los, las',
      html: `<p>Daha önce söylenmiş bir ismi tekrar etmemek için kullanılır; ismin <b>cinsiyetine ve sayısına</b> uyar.</p>
${T([['', 'eril', 'dişil'], ['tekil', '<b>lo</b> (el café → lo)', '<b>la</b> (la carne → la)'], ['çoğul', '<b>los</b> (los huevos → los)', '<b>las</b> (las verduras → las)']])}
<ul><li>Zamir <b>çekimli fiilden hemen önce</b> gelir: <i>— ¿Tomas café? — Sí, <b>lo</b> tomo con leche.</i></li>
<li>Olumsuzda sıra: <b>no + zamir + fiil</b>: <i>No <b>la</b> como.</i></li>
<li>İsim cümlenin başına alınırsa zamir yine kullanılır: <i>Las verduras <b>las</b> compro en el mercado.</i></li>
<li><i>el agua</i> dişildir (el yalnızca telaffuz içindir): <i>El agua <b>la</b> tomo fría.</i></li></ul>`,
      examples: [['— ¿Cómo tomas el café? — Lo tomo sin azúcar.', '— Kahveyi nasıl içersin? — Şekersiz içerim.'], ['— ¿Comes carne? — No, no la como.', '— Et yer misin? — Hayır, yemem.'], ['Los huevos los quiero fritos.', 'Yumurtaları kızarmış istiyorum.']],
      fill: [
        '— ¿Tomas café? — Sí, ___ tomo con leche.|lo',
        '— ¿Comes carne? — No, no ___ como.|la',
        '— ¿Dónde compras las verduras? — ___ compro en el mercado.|Las',
        '— ¿Cómo quieres los huevos? — ___ quiero fritos.|Los',
        'La tortilla, ¿ ___ quieres con cebolla o sin cebolla?|la',
        'El pescado ___ preparo al horno.|lo',
      ],
      mc: [
        'OD zamiri çekimli fiile göre nerede durur?|Fiilden hemen önce: lo compro|Fiilden sonra ayrı: compro lo|Cümlenin sonunda|Öznenin önünde',
        '— ¿Quién trae las bebidas? — ___|Las traigo yo.|Los traigo yo.|La traigo yo.|Traigo las yo.',
        '«No la como» cümlesinde «la» hangisinin yerine geçebilir?|la carne|el pescado|los huevos|las patatas',
        'Olumsuz cümlede doğru sıra:|No lo tomo.|Lo no tomo.|No tomo lo.|Tomo no lo.',
        '— ¿Cómo tomas el té? — ___ tomo sin azúcar.|Lo|La|Los|Le',
      ],
      order: ['Las verduras las compro en el mercado', 'El café lo tomo sin azúcar'],
      tr: [
        'Onu şekersiz içerim. (kahveyi)|Lo tomo sin azúcar.',
        'Onları pazardan alırım. (sebzeleri)|Las compro en el mercado.',
      ],
    },
    {
      id: 'g7-rest', title: 'En el bar y en el restaurante',
      html: `<p>Sipariş verirken kullanılan kalıplar:</p>
${T([['kim', 'İspanyolca', 'Türkçe'],
        ['garson', '¿Qué desean? / ¿Qué van a tomar?', 'Ne arzu edersiniz?'],
        ['müşteri', '<b>De primero</b>, sopa.', 'İlk yemek olarak çorba.'],
        ['müşteri', '<b>De segundo</b>, pollo asado.', 'Ana yemek olarak fırında tavuk.'],
        ['garson', '¿Y <b>para beber</b>?', 'İçecek olarak?'],
        ['müşteri', 'Agua sin gas, por favor.', 'Gazsız su lütfen.'],
        ['müşteri', '<b>De postre</b>, flan.', 'Tatlı olarak flan.'],
        ['müşteri', '<b>La cuenta</b>, por favor.', 'Hesap lütfen.']])}
<ul><li>Yemek hakkında soru: <i>¿Qué lleva la ensalada?</i> (içinde ne var?) · <i>¿Lleva carne?</i> (et var mı?)</li>
<li><b>el menú del día</b>: sabit fiyatlı günün menüsü (primero + segundo + postre). Yemek listesinin kendisi <b>la carta</b>'dır.</li>
<li>Garsona genellikle <b>usted</b> ile hitap edilir: <i>¿Me trae…?, ¿Me pone…?</i></li></ul>`,
      examples: [['De primero, una ensalada mixta, y de segundo, pescado a la plancha.', 'İlk yemek olarak karışık salata, ana yemek olarak ızgara balık.'], ['— ¿Qué lleva el gazpacho? — Tomate, pimiento, ajo y aceite.', '— Gazpacho\'nun içinde ne var? — Domates, biber, sarımsak ve yağ.']],
      mc: [
        '«İlk yemek olarak»|de primero|de postre|para beber|de segundo',
        '— ¿Y para beber? — ___|Agua sin gas, por favor.|De postre, flan.|La cuenta, por favor.|De segundo, pollo.',
        '«¿Qué lleva la ensalada?» neyi soruyor?|Salatanın içinde ne olduğunu|Salatanın fiyatını|Salatanın ne zaman geleceğini|Salatayı kimin getireceğini',
        'Tatlı sipariş ederken:|De postre, fruta.|De primero, la cuenta.|Para beber, flan.|De segundo, agua.',
        '«menú del día» nedir?|Sabit fiyatlı günün menüsü (primero, segundo, postre)|Restoranın tüm yemek listesi|Sadece tatlı listesi|Çocuk menüsü',
        '— ¿Qué desea de segundo? — ___|Pollo asado con patatas.|Un café solo.|Agua con gas.|La cuenta.',
        'Garsona usted ile hitap:|¿Me trae un poco más de pan, por favor?|¿Me traes un poco más de pan?|Trae pan.|¿Traigo más pan?',
      ],
      fill: [
        'De ___ , una ensalada. (ilk yemek)|primero',
        'De ___ , pescado a la plancha. (ana yemek)|segundo',
        'De ___ , flan. (tatlı)|postre',
        'Para ___ , agua, por favor. (içmek)|beber',
        'La ___ , por favor. (hesap)|cuenta',
        '— ¿Qué ___ la paella? — Arroz, pollo y verduras. (içinde ne var)|lleva',
      ],
      order: ['De primero quiero una ensalada mixta|Quiero una ensalada mixta de primero', 'De postre quiero un flan|Quiero un flan de postre'],
    },
  ],
  vocab: [
    {
      id: 'v7-comidas', title: 'Las comidas del día y el restaurante',
      note: '<p>İspanya\'da <b>la comida</b> öğle yemeğidir (genellikle 14:00–15:00) ve günün ana öğünüdür; <b>la cena</b> geç yenir (21:00–22:00).</p>',
      n: [
        'el desayuno; desayunos; kahvaltı', 'la comida; comidas; öğle yemeği / yemek', 'la merienda; meriendas; ikindi atıştırması', 'la cena; cenas; akşam yemeği',
        'la cuenta; cuentas; hesap', 'la carta; cartas; menü (yemek listesi)', 'el camarero; camareros; garson (erkek)', 'la camarera; camareras; garson (kadın)',
        'el plato; platos; tabak / yemek çeşidi', 'el postre; postres; tatlı (öğün sonu)', 'la bebida; bebidas; içecek', 'la propina; propinas; bahşiş', 'la mesa; mesas; masa',
      ],
      phr: [
        'merendar; ikindi atıştırması yapmak', 'tomar algo; bir şeyler içmek ya da yemek', 'el menú del día; günün menüsü',
        'de primero; ilk yemek olarak', 'de segundo; ana yemek olarak', 'de postre; tatlı olarak', 'para beber; içecek olarak',
        '¿Qué lleva?; İçinde ne var?', '¡Que aproveche!; Afiyet olsun!', 'pedir; sipariş vermek',
      ],
    },
    {
      id: 'v7-alimentos', title: 'Alimentos y bebidas',
      note: '<p>Çoğulu "-" olan isimler genellikle sayılmaz (ekmek, süt, et…) ve çoğul alıştırmasına girmez. <b>el agua</b> dişildir: <i>el agua fría, las aguas</i>.</p>',
      n: [
        'el pan; -; ekmek', 'el arroz; -; pirinç, pilav', 'la pasta; -; makarna', 'la carne; -; et', 'el pollo; -; tavuk', 'el pescado; -; balık (yemek olarak)',
        'el jamón; -; jambon', 'el queso; -; peynir', 'el huevo; huevos; yumurta', 'la leche; -; süt', 'el yogur; yogures; yoğurt', 'la mantequilla; -; tereyağı',
        'el aceite; -; sıvı yağ', 'la sal; -; tuz', 'el azúcar; -; şeker', 'la verdura; verduras; sebze', 'la fruta; frutas; meyve', 'la legumbre; legumbres; baklagil',
        'la patata; patatas; patates', 'el tomate; tomates; domates', 'la cebolla; cebollas; soğan', 'el ajo; ajos; sarımsak', 'la lechuga; lechugas; marul',
        'la zanahoria; zanahorias; havuç', 'el pimiento; pimientos; biber', 'la manzana; manzanas; elma', 'la naranja; naranjas; portakal', 'el plátano; plátanos; muz',
        'el limón; limones; limon', 'la fresa; fresas; çilek', 'la sopa; sopas; çorba', 'la ensalada; ensaladas; salata', 'el bocadillo; bocadillos; sandviç',
        'el marisco; -; deniz ürünü', 'el chocolate; -; çikolata', 'la galleta; galletas; bisküvi', 'el helado; helados; dondurma', 'la tarta; tartas; pasta, turta',
        'el agua (f); -; su', 'el zumo; zumos; meyve suyu', 'el café; cafés; kahve', 'el té; -; çay', 'el vino; -; şarap', 'la cerveza; cervezas; bira', 'el refresco; refrescos; gazlı içecek',
      ],
      phr: [
        'el agua con gas; maden suyu', 'el agua sin gas; gazsız su', 'el café con leche; sütlü kahve', 'el café solo; sade kahve', 'el zumo de naranja; portakal suyu',
        'el vino tinto; kırmızı şarap', 'el vino blanco; beyaz şarap',
      ],
    },
    {
      id: 'v7-cocinar', title: 'Maneras de cocinar y sabores',
      adj: [
        'frito; frita; kızartılmış (yağda)', 'asado; asada; fırında kızartılmış', 'cocido; cocida; suda pişirilmiş', 'hervido; hervida; haşlanmış', 'crudo; cruda; çiğ',
        'guisado; guisada; tencerede pişmiş, yahni', 'salado; salada; tuzlu', 'dulce; dulce; tatlı (tat)', 'picante; picante; acı, baharatlı', 'caliente; caliente; sıcak',
        'frío; fría; soğuk', 'rico; rica; lezzetli',
      ],
      phr: ['a la plancha; ızgarada (sacda)', 'al horno; fırında', 'al vapor; buharda', 'con cebolla; soğanlı', 'sin azúcar; şekersiz'],
    },
    {
      id: 'v7-platos', title: 'Platos de España y del mundo hispano',
      unsure: 'Kitabın hangi yemekleri saydığı bilinmiyor; bunlar yaygın bilinen örnekler. Özellikle Latin Amerika yemekleri kitapta farklı olabilir.',
      phr: [
        'la tortilla de patatas; patatesli İspanyol omleti', 'la paella; paella (deniz ürünlü ya da etli pilav)', 'el gazpacho; soğuk domates çorbası', 'la ensalada mixta; karışık salata',
        'el pollo asado; fırında tavuk', 'las lentejas; mercimek yemeği', 'el flan; krem karamel', 'las tapas; tapas (küçük porsiyonlar)', 'los churros; churros (kızarmış hamur)',
        'el pescado a la plancha; ızgara balık', 'la sopa del día; günün çorbası',
        'los tacos; taco (Meksika)', 'el guacamole; avokado ezmesi (Meksika)', 'el ceviche; limonla marine edilmiş çiğ balık (Peru)',
        'las arepas; mısır unundan ekmek (Venezuela, Kolombiya)', 'las empanadas; içi dolgulu hamur işi (Arjantin)', 'el asado; mangalda et (Arjantin)',
      ],
    },
  ],
  writing: [
    {
      title: 'Yeme alışkanlıkları',
      prompt: 'Kendi yeme alışkanlıklarını ve ülkendeki alışkanlıkları anlat: öğünlerde ne yersin, ne zaman? Ülkende genel olarak ne yenir, ne içilir?',
      min: 50, max: 90,
      checks: [
        { label: 'se impersonal (se come, se bebe, se cena…)', re: '\\bse (come|comen|bebe|beben|cena|desayuna|toma|toman|cocina|cocinan|hace|hacen)\\b' },
        { label: 'öğün fiili ya da ismi (desayuno, como, ceno, la cena…)', re: '\\b(desayuno|como|ceno|meriendo|comida|cena)\\b' },
        { label: 'OD zamiri + fiil (lo tomo, la como, los compro…)', re: '\\b(lo|la|los|las) (tomo|como|preparo|compro|quiero|bebo|hago|cocino|pido)\\b' },
        { label: 'pişirme biçimi (frito, asado, a la plancha, al horno…)', re: '\\b(frit[oa]s?|asad[oa]s?|a la plancha|al horno|cocid[oa]s?|al vapor)\\b' },
        { label: 'sıklık ya da saat ifadesi', re: '\\b(siempre|normalmente|a veces|nunca|todos los dias|a las|a la una)\\b' },
        { label: 'en az 5 yiyecek / içecek kelimesi', vocab: 'v7-alimentos', n: 5 },
      ],
      model: 'Normalmente desayuno a las ocho: tomo té, pan con queso y tomate. El café lo tomo sin azúcar. Como a la una en la universidad, casi siempre pollo con arroz o pasta. Por la noche ceno en casa: sopa, ensalada y pescado al horno. En Turquía se bebe mucho té y se comen muchas verduras. También se come mucho pan. La carne la como dos veces a la semana.',
    },
    {
      title: 'Restoranda',
      prompt: 'Bir restoranda garsonla müşteri arasında kısa bir diyalog yaz: ilk yemek, ana yemek, içecek, tatlı ve hesap. Bir yemeğin içinde ne olduğunu da sor.',
      min: 45, max: 90,
      checks: [
        { label: 'de primero', re: '\\bde primero\\b' },
        { label: 'de segundo', re: '\\bde segundo\\b' },
        { label: 'para beber ya da de postre', re: '\\b(para beber|de postre)\\b' },
        { label: 'içindekini sorma (¿Qué lleva…? / ¿Lleva…?)', re: '\\blleva\\b' },
        { label: 'hesabı isteme (la cuenta)', re: '\\bcuenta\\b' },
        { label: 'por favor', re: '\\bpor favor\\b' },
        { label: 'poner ya da traer ile rica (me pone / me trae / nos trae)', re: '\\b(me|nos) (pone|trae|pones|traes)\\b' },
      ],
      model: '— Buenas tardes. ¿Qué desea? — De primero, una ensalada mixta. ¿Qué lleva? — Lechuga, tomate, cebolla y huevo. — Muy bien. Y de segundo, pollo asado con patatas. — ¿Y para beber? — Agua sin gas, por favor. — ¿Quiere algo de postre? — Sí, de postre, un flan. ¿Me trae también un poco más de pan? — Claro. — ¿Me trae la cuenta, por favor? — Ahora mismo.',
    },
  ],
  speaking: [
    { q: '¿Qué desayunas normalmente?', tr: 'Genellikle kahvaltıda ne yersin?', kw: ['desayuno|tomo|como', 'café|té|pan|queso|huevos|leche|fruta|zumo'], list: ['En az 3 yiyecek / içecek saydım', 'Bir sıklık ifadesi kullandım', 'Bir OD zamiri kullandım (lo tomo con…)'], model: 'Normalmente desayuno té y pan con queso. A veces como huevos. El té lo tomo sin azúcar.' },
    { q: '¿Cuál es tu plato favorito? ¿Qué lleva?', tr: 'En sevdiğin yemek ne? İçinde ne var?', kw: ['mi plato favorito|me gusta|me encanta', 'lleva'], list: ['Mi plato favorito es… dedim', 'lleva ile en az 3 malzeme saydım', 'Nasıl piştiğini söyledim (al horno, frito…)'], model: 'Mi plato favorito es el pollo asado con patatas. Lleva pollo, patatas, cebolla y aceite. Se hace al horno.' },
    { q: 'Estás en un restaurante. Pide un primero, un segundo y una bebida.', tr: 'Restorandasın. Bir ilk yemek, bir ana yemek ve bir içecek sipariş et.', kw: ['de primero', 'de segundo', 'para beber|agua|zumo|refresco', 'por favor'], list: ['de primero / de segundo kullandım', 'İçecek istedim', 'por favor dedim', 'Hesabı istedim (la cuenta, por favor)'], model: 'De primero, sopa del día, y de segundo, pescado a la plancha. Para beber, agua con gas, por favor.' },
    { q: '¿Qué se come en tu país?', tr: 'Ülkende ne yenir?', kw: ['se come|se comen|se bebe|se toma'], list: ['se come / se comen uyumunu doğru kurdum', 'En az 3 yiyecek saydım', 'Bir öğün saatinden bahsettim (se cena a las…)'], model: 'En Turquía se come mucho pan y se comen muchas verduras. Se bebe mucho té. Normalmente se cena a las siete.' },
  ],
};
