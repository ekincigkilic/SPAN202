// Unidad 5 — Tus amigos son mis amigos. Tüm içerik "üretildi" etiketlidir.
// Soru biçimleri: mc "soru|doğru|yanlış|yanlış|yanlış" · fill "cümle ___ |cevap|alternatif" · tr "Türkçe|İspanyolca|alternatif" · order "cümle|alternatif sıra"
const T = rows => `<table>${rows.map((r, i) => `<tr>${r.map(c => i ? `<td>${c}</td>` : `<th>${c}</th>`).join('')}</tr>`).join('')}</table>`;

export const U5 = {
  u: 5,
  title: 'Tus amigos son mis amigos',
  gustarThings: [
    ['la música clásica', 0], ['el flamenco', 0], ['bailar', 0], ['tocar la guitarra', 0], ['cantar y bailar', 0], ['este grupo', 0],
    ['los conciertos', 1], ['las canciones de este grupo', 1], ['los idiomas', 1], ['las fiestas', 1],
  ],
  grammar: [
    {
      id: 'g5-gustar', title: 'El verbo gustar',
      html: `<p><b>gustar</b> Türkçedeki "sevmek" gibi çalışmaz; "hoşuma gitmek" gibi çalışır. Sevilen şey cümlenin öznesidir, seven kişi ise bir zamirle (me, te, le…) gösterilir. Bu yüzden fiil yalnızca iki biçimde görülür: <b>gusta</b> ve <b>gustan</b>.</p>
${T([['(vurgu için)', 'zamir', 'fiil', 'sevilen şey'],
        ['(A mí)', 'me', 'gusta', 'tekil isim: <i>el jazz</i><br>infinitivo: <i>bailar</i>'],
        ['(A ti)', 'te', '', ''],
        ['(A él / ella / usted)', 'le', '', ''],
        ['(A nosotros/as)', 'nos', 'gustan', 'çoğul isim: <i>los conciertos</i>'],
        ['(A vosotros/as)', 'os', '', ''],
        ['(A ellos / ellas / ustedes)', 'les', '', '']])}
<ul><li>İsimden önce artikel gelir: <i>Me gusta <b>el</b> rock.</i></li>
<li>Birden fazla infinitivo olsa da fiil tekildir: <i>Me gusta cantar y bailar.</i></li>
<li>Olumsuz: <b>no</b> zamirden önce gelir: <i>No me gusta.</i></li>
<li>Derece: <i>me encanta</i> &gt; <i>me gusta mucho</i> &gt; <i>me gusta bastante</i> &gt; <i>no me gusta mucho</i> &gt; <i>no me gusta nada</i>.</li>
<li><b>encantar</b> ve <b>interesar</b> aynı kalıpla çekilir: <i>me encanta, me interesan</i>.</li>
<li>"A + isim" kullanılırsa zamir yine de gerekir: <i>A mi hermana <b>le</b> gusta bailar.</i></li></ul>`,
      examples: [['Me gusta mucho la música clásica.', 'Klasik müziği çok severim.'], ['¿Te gustan los conciertos?', 'Konserleri sever misin?'], ['A mis padres no les gusta nada el reguetón.', 'Annemle babam reggaetonu hiç sevmez.'], ['Nos encanta bailar.', 'Dans etmeye bayılırız.']],
      fill: [
        'A mí ___ la música clásica. (gustar)|me gusta',
        '¿A ti ___ los conciertos? (gustar)|te gustan',
        'A mi hermano ___ bailar. (gustar)|le gusta',
        'A nosotros ___ las canciones de este grupo. (gustar)|nos gustan',
        'A mis padres no ___ el rock. (gustar)|les gusta',
        '¿A vosotros ___ tocar la guitarra? (gustar)|os gusta',
        'A Ana ___ el flamenco. (encantar)|le encanta',
        'A mí ___ los idiomas. (interesar)|me interesan',
        'A Carlos y a Marta ___ cantar y bailar. (gustar)|les gusta',
        'A mi abuela ___ las canciones antiguas. (encantar)|le encantan',
      ],
      mc: [
        'Hangisi doğru?|Me gustan los gatos.|Me gusta los gatos.|Yo gusto los gatos.|Me gustan el gato.',
        '«Me gusta mucho bailar» cümlesinde fiil neden tekil?|Çünkü sevilen şey bir infinitivo (bailar)|Çünkü «me» tekil|Çünkü «mucho» tekil|Çünkü gustar hiç çoğul olmaz',
        'A Pedro ___ gusta nada el fútbol.|no le|no se|le no|no lo',
        'En güçlü beğeniyi hangisi anlatır?|Me encanta.|Me gusta bastante.|Me gusta.|No me gusta mucho.',
        '¿___ gusta el cine, señor García? (usted)|Le|Te|Se|Os',
        'A mis amigos ___ el flamenco.|les encanta|le encanta|les encantan|se encanta',
        'Hangisi doğru?|Me gusta el rock.|Me gusta rock.|Me gusto el rock.|Yo gusta el rock.',
      ],
      tr: [
        'Müziği çok severim.|Me gusta mucho la música.|A mí me gusta mucho la música.',
        'Kız kardeşim dans etmeyi sever.|A mi hermana le gusta bailar.|Le gusta bailar a mi hermana.',
        'Konserleri sever misin?|¿Te gustan los conciertos?|¿A ti te gustan los conciertos?',
        'Futbolu hiç sevmiyoruz.|No nos gusta nada el fútbol.|A nosotros no nos gusta nada el fútbol.',
        'Gitar çalmaya bayılırım.|Me encanta tocar la guitarra.|A mí me encanta tocar la guitarra.',
      ],
      order: [
        'A mi hermana le gusta bailar|Le gusta bailar a mi hermana',
        'No me gustan nada las películas de terror',
        'A mis amigos les encanta el flamenco|El flamenco les encanta a mis amigos',
        'Nos gusta mucho ir a conciertos',
      ],
    },
    {
      id: 'g5-cuant', title: 'Cuantificadores: muy, bastante, un poco',
      html: `<p>Sıfatın derecesini belirtirler ve <b>değişmezler</b> (cinsiyet/sayı almazlar).</p>
${T([['', 'anlam', 'örnek'],
        ['<b>muy</b> + sıfat', 'çok', 'Es muy simpática.'],
        ['<b>bastante</b> + sıfat', 'oldukça', 'Es bastante serio.'],
        ['<b>un poco</b> + sıfat', 'biraz', 'Es un poco tímido.'],
        ['<b>no … nada</b> + sıfat', 'hiç … değil', 'No es nada antipático.']])}
<ul><li><b>un poco</b> genellikle olumsuz anlamlı sıfatlarla kullanılır (<i>un poco vago, un poco aburrido</i>). Olumlu bir sıfatla (<i>un poco simpático</i>) doğal durmaz.</li>
<li>Fiille birlikte <b>muy</b> değil <b>mucho</b> kullanılır: <i>Estudia mucho. Me gusta mucho.</i></li></ul>`,
      examples: [['Mi hermano es muy alto y bastante tímido.', 'Erkek kardeşim çok uzun boylu ve oldukça utangaç.'], ['Mi jefa es un poco seria, pero no es nada antipática.', 'Patronum biraz ciddi ama hiç antipatik değil.']],
      mc: [
        'Mi profesor es ___ simpático. (çok)|muy|mucho|un poco de|nada',
        '«un poco» genellikle hangi tür sıfatlarla kullanılır?|Olumsuz anlamlı (tímido, vago…)|Olumlu anlamlı (simpático, guapo…)|Sadece renklerle|Sadece çoğul sıfatlarla',
        'Hangisi doğal DEĞİL?|Es un poco simpática.|Es un poco tímida.|Es muy trabajadora.|Es bastante seria.',
        'Mi hermano no es ___ tímido. (hiç)|nada|mucho|un poco|también',
        'Me gusta ___ el jazz. (çok)|mucho|muy|mucha|muchos',
        'Derece sırası (azdan çoğa) hangisi?|un poco < bastante < muy|muy < bastante < un poco|bastante < un poco < muy|un poco < muy < bastante',
        'Mis primas son ___ divertidas.|muy|muyes|muchas|muys',
      ],
      fill: [
        'Mi abuela es ___ generosa. (çok)|muy',
        'Mi primo es ___ vago. (biraz)|un poco',
        'Mis vecinos son ___ agradables. (oldukça)|bastante',
        'Mi jefe no es ___ antipático. (hiç)|nada',
        'Mi hermana estudia ___ . (çok)|mucho',
      ],
      tr: [
        'Kuzenim oldukça zeki. (erkek)|Mi primo es bastante inteligente.',
        'Annem çok çalışkan.|Mi madre es muy trabajadora.',
        'Erkek kardeşim biraz utangaç.|Mi hermano es un poco tímido.',
      ],
    },
    {
      id: 'g5-poses', title: 'Los posesivos',
      html: `<p>İyelik sıfatları ismin önüne gelir ve <b>sahip olunan şeyle</b> uyum yapar (sahibin cinsiyetiyle değil).</p>
${T([['sahip', 'tekil', 'çoğul'],
        ['yo', 'mi', 'mis'],
        ['tú', 'tu', 'tus'],
        ['él / ella / usted', 'su', 'sus'],
        ['nosotros/as', 'nuestro / nuestra', 'nuestros / nuestras'],
        ['vosotros/as', 'vuestro / vuestra', 'vuestros / vuestras'],
        ['ellos / ellas / ustedes', 'su', 'sus']])}
<ul><li>Yalnızca <b>nuestro</b> ve <b>vuestro</b> cinsiyete göre değişir.</li>
<li><b>su / sus</b> çok anlamlıdır: onun, onların, sizin (usted / ustedes).</li>
<li><b>tu</b> (senin) aksansız, <b>tú</b> (sen) aksanlıdır. Aynı şekilde <b>mi</b> (benim) / <b>mí</b> (a mí).</li></ul>`,
      examples: [['Mi hermana y sus hijos viven en Sevilla.', 'Kız kardeşim ve çocukları Sevilla\'da yaşıyor.'], ['Nuestra abuela es muy alegre.', 'Büyükannemiz çok neşelidir.'], ['¿Cómo se llaman vuestros padres?', 'Anne babanızın adı ne?']],
      fill: [
        '(yo) ___ hermanos viven en Ankara.|Mis',
        '(tú) ¿Cómo se llama ___ madre?|tu',
        '(nosotros) ___ abuela es muy alegre.|Nuestra',
        '(vosotros) ¿Dónde viven ___ padres?|vuestros',
        '(ella) Ana y ___ marido tienen dos hijos.|su',
        '(ellos) Pedro y Luis visitan a ___ abuelos.|sus',
        '(nosotros) ___ primas son muy divertidas.|Nuestras',
        '(yo) ___ tío toca la guitarra.|Mi',
        '(vosotros) ___ casa es muy bonita.|Vuestra',
        '(usted) ¿Es este ___ hijo, señora López?|su',
        '(tú) ¿Dónde viven ___ abuelos?|tus',
        '(nosotros) ___ vecinos son muy amables.|Nuestros',
      ],
      mc: [
        'Posesivo neye göre cinsiyet/sayı alır?|Sahip olunan şeye göre|Sahibin cinsiyetine göre|Her zaman eril tekil kalır|Fiile göre',
        '«su hermano» kimin kardeşi olabilir?|Onun, onların veya sizin (usted/ustedes)|Sadece onun (erkek)|Sadece onların|Benim',
        'Hangisi doğru?|nuestras amigas|nuestros amigas|nuestra amigas|nuestro amigas',
        '«tu» ile «tú» farkı nedir?|tu = senin, tú = sen|tu = sen, tú = senin|Fark yok|tú çoğuldur',
        'Hangi posesivo cinsiyete göre DEĞİŞMEZ?|mi|nuestro|vuestro|Hepsi değişir',
        'María habla con ___ padres. (kendi anne babası)|sus|su|suyos|sos',
      ],
      tr: [
        'Kız kardeşim çok sempatik.|Mi hermana es muy simpática.',
        'Büyükannemiz Madrid\'de yaşıyor.|Nuestra abuela vive en Madrid.',
        'Kuzenlerin çok eğlenceli. (senin; erkek ya da karışık grup)|Tus primos son muy divertidos.',
      ],
    },
    {
      id: 'g5-tamb', title: 'También / tampoco (gustar ile)',
      html: `<p>Birinin zevkine katılmak ya da katılmamak için kullanılır. Fiil <b>gustar</b> tipinde olduğu için cevap <b>A mí…</b> ile başlar (Ünite 6'da diğer fiillerle <i>Yo…</i> gelecek).</p>
${T([['söylenen', 'aynı fikir', 'farklı fikir'],
        ['Me gusta el jazz. (+)', 'A mí <b>también</b>.', 'A mí <b>no</b>.'],
        ['No me gusta el jazz. (−)', 'A mí <b>tampoco</b>.', 'A mí <b>sí</b>.']])}
<ul><li><b>también</b> olumlu cümleye, <b>tampoco</b> olumsuz cümleye katılır.</li>
<li>Başka kişiler için: <i>A ella también. A nosotros tampoco.</i></li>
<li>Farklı fikir çoğu zaman <b>Pues</b> ile yumuşatılır: <i>Pues a mí no.</i></li></ul>`,
      examples: [['— Me encanta el flamenco. — A mí también.', '— Flamenkoya bayılırım. — Ben de.'], ['— No me gustan los lunes. — A mí tampoco.', '— Pazartesileri sevmem. — Ben de sevmem.'], ['— No me gusta bailar. — Pues a mí sí.', '— Dans etmeyi sevmem. — Ben severim.']],
      mc: [
        '— Me gusta el rock. — (Ben de severim.)|A mí también.|A mí tampoco.|Yo también.|A mí sí.',
        '— No me gusta el reguetón. — (Ben de sevmem.)|A mí tampoco.|A mí también.|Yo tampoco.|A mí no.',
        '— No me gustan los conciertos. — (Ben severim.)|A mí sí.|A mí también.|A mí no.|Yo sí.',
        '— Me encanta bailar. — (Ben sevmem.)|A mí no.|A mí tampoco.|A mí sí.|Yo no.',
        '«tampoco» ne zaman kullanılır?|Olumsuz bir cümleye katılırken|Olumlu bir cümleye katılırken|Olumlu bir cümleye karşı çıkarken|Soru sorarken',
        '— A Luis le gusta el jazz. ¿Y a Marta? — (O da sever.)|A ella también.|Ella también.|A ella tampoco.|A le también.',
      ],
      fill: [
        '— Me gusta mucho la salsa. — A mí ___ . (aynı fikir)|también',
        '— No me gusta nada el pop. — A mí ___ . (aynı fikir)|tampoco',
        '— No me gustan los lunes. — Pues a mí ___ . (farklı fikir)|sí',
        '— Me gusta cantar. — Pues a mí ___ . (farklı fikir)|no',
        'Mi hermano toca la guitarra y yo ___ . (ben de)|también',
        'Ana no baila y Pedro ___ . (o da hayır)|tampoco',
      ],
    },
  ],
  vocab: [
    {
      id: 'v5-familia', title: 'La familia y las relaciones',
      note: '<p>Eril çoğul karışık grubu da kapsar: <i>los padres</i> = anne baba, <i>los hermanos</i> = kardeşler, <i>los hijos</i> = çocuklar, <i>los abuelos</i> = dede ve büyükanne.</p>',
      n: [
        'el padre; padres; baba', 'la madre; madres; anne', 'el hermano; hermanos; erkek kardeş', 'la hermana; hermanas; kız kardeş',
        'el hijo; hijos; oğul', 'la hija; hijas; kız evlat', 'el abuelo; abuelos; dede', 'la abuela; abuelas; büyükanne',
        'el tío; tíos; amca / dayı', 'la tía; tías; hala / teyze', 'el primo; primos; kuzen (erkek)', 'la prima; primas; kuzen (kız)',
        'el sobrino; sobrinos; yeğen (erkek)', 'la sobrina; sobrinas; yeğen (kız)', 'el nieto; nietos; torun (erkek)', 'la nieta; nietas; torun (kız)',
        'el marido; maridos; koca', 'la mujer; mujeres; karı, eş / kadın', 'el novio; novios; erkek arkadaş (sevgili)', 'la novia; novias; kız arkadaş (sevgili)',
        'la pareja; parejas; partner / çift', 'el amigo; amigos; arkadaş (erkek)', 'la amiga; amigas; arkadaş (kız)',
        'el compañero de piso; compañeros de piso; ev arkadaşı (erkek)', 'la compañera de trabajo; compañeras de trabajo; iş arkadaşı (kadın)',
        'el vecino; vecinos; komşu (erkek)', 'la vecina; vecinas; komşu (kadın)', 'el jefe; jefes; patron, şef (erkek)', 'la jefa; jefas; patron, şef (kadın)',
      ],
      phr: [
        'los padres; anne baba', 'estar casado/a; evli olmak', 'estar soltero/a; bekâr olmak', 'tener hijos; çocuğu olmak', 'ser hijo único / hija única; tek çocuk olmak',
      ],
    },
    {
      id: 'v5-aspecto', title: 'El aspecto físico',
      unsure: 'Ünite özetinde kelime başlığı olarak geçmiyor, iletişim hedefinden ("hablar del aspecto") eklendi. Kitaptaki tam liste farklı olabilir.',
      note: `<p>Üç fiil ayrımı: <b>ser</b> + sıfat (<i>es alto</i>), <b>tener</b> + saç/göz (<i>tiene el pelo rizado, tiene los ojos verdes</i>), <b>llevar</b> + gözlük/sakal/bıyık (<i>lleva gafas</i>).</p>`,
      adj: [
        'alto; alta; uzun boylu', 'bajo; baja; kısa boylu', 'delgado; delgada; zayıf', 'gordo; gorda; şişman', 'guapo; guapa; yakışıklı / güzel',
        'feo; fea; çirkin', 'moreno; morena; esmer, koyu saçlı', 'rubio; rubia; sarışın', 'pelirrojo; pelirroja; kızıl saçlı', 'calvo; calva; kel',
        'joven; joven; genç', 'mayor; mayor; yaşlı',
      ],
      phr: [
        'tener el pelo largo; uzun saçlı olmak', 'tener el pelo corto; kısa saçlı olmak', 'tener el pelo liso; düz saçlı olmak', 'tener el pelo rizado; kıvırcık saçlı olmak',
        'tener los ojos azules; mavi gözlü olmak', 'tener los ojos verdes; yeşil gözlü olmak', 'tener los ojos marrones; kahverengi gözlü olmak',
        'llevar gafas; gözlük takmak', 'llevar barba; sakallı olmak', 'llevar bigote; bıyıklı olmak',
      ],
      mc: [
        'Mi padre ___ alto y delgado.|es|tiene|lleva|hay',
        'Mi hermana ___ el pelo largo y rizado.|tiene|es|está|hay',
        'Mi abuelo ___ gafas y barba.|lleva|es|está|hay',
        'Mi madre ___ los ojos verdes.|tiene|es|está|son',
        'Mis primos ___ rubios.|son|tienen|llevan|hay',
      ],
    },
    {
      id: 'v5-caracter', title: 'Adjetivos de carácter',
      note: '<p><b>-o</b> ile bitenler dişilde <b>-a</b> olur. <b>-or</b> ile bitenler <b>-ora</b> olur (<i>trabajador → trabajadora</i>). <b>-e</b> ya da ünsüzle bitenler değişmez (<i>inteligente, amable, sociable</i>).</p>',
      adj: [
        'simpático; simpática; sempatik, cana yakın', 'antipático; antipática; antipatik, soğuk', 'inteligente; inteligente; zeki', 'divertido; divertida; eğlenceli',
        'aburrido; aburrida; sıkıcı', 'tímido; tímida; utangaç', 'sociable; sociable; sosyal, girişken', 'serio; seria; ciddi', 'alegre; alegre; neşeli',
        'trabajador; trabajadora; çalışkan', 'vago; vaga; tembel', 'amable; amable; nazik', 'agradable; agradable; hoş, sevimli', 'generoso; generosa; cömert',
        'tranquilo; tranquila; sakin', 'nervioso; nerviosa; gergin', 'abierto; abierta; dışa dönük, açık', 'cerrado; cerrada; içine kapanık',
        'interesante; interesante; ilginç', 'raro; rara; tuhaf', 'cariñoso; cariñosa; sevecen', 'hablador; habladora; konuşkan',
      ],
    },
    {
      id: 'v5-musica', title: 'La música',
      unsure: 'Kitabın hangi müzik türlerini saydığı bilinmiyor; bunlar A1 için yaygın olanlar.',
      n: [
        'el grupo; grupos; grup', 'la canción; canciones; şarkı', 'el concierto; conciertos; konser', 'el disco; discos; albüm, plak',
        'el instrumento; instrumentos; enstrüman', 'la guitarra; guitarras; gitar', 'el piano; pianos; piyano', 'la batería; baterías; bateri, davul',
      ],
      phr: [
        'el pop; pop müzik', 'el rock; rock müzik', 'el jazz; caz', 'el flamenco; flamenko', 'la salsa; salsa (müzik / dans)', 'el reguetón; reggaeton', 'el rap; rap',
        'la música clásica; klasik müzik', 'la música electrónica; elektronik müzik', 'el / la cantante; şarkıcı',
        'tocar la guitarra; gitar çalmak', 'tocar el piano; piyano çalmak', 'cantar; şarkı söylemek', 'bailar; dans etmek', 'escuchar música; müzik dinlemek', 'ir a conciertos; konsere gitmek',
      ],
    },
  ],
  writing: [
    {
      title: 'Bir yakınını tanıt',
      prompt: 'Bir aile üyeni ya da arkadaşını tanıt: kim olduğu, görünüşü, karakteri ve nelerden hoşlandığı.',
      min: 40, max: 80,
      checks: [
        { label: 'ser ile tanımlama (es / son)', re: '\\b(es|son)\\b' },
        { label: 'tener ya da llevar ile görünüş', re: '\\b(tiene|lleva)\\b' },
        { label: 'gustar yapısı (le gusta / le gustan / le encanta…)', re: '\\b(le|les) (gustan?|encantan?|interesan?)\\b' },
        { label: 'posesivo (mi, su, nuestro…)', re: '\\b(mis?|sus?|nuestr[oa]s?)\\b' },
        { label: 'cuantificador (muy, bastante, un poco)', re: '\\b(muy|bastante|un poco)\\b' },
        { label: 'aile / ilişki kelimesi', vocab: 'v5-familia', n: 1 },
        { label: 'en az 2 karakter sıfatı', vocab: 'v5-caracter', n: 2 },
      ],
      model: 'Mi hermana se llama Elif y tiene veinte años. Es alta y morena, tiene el pelo largo y los ojos marrones. Es muy simpática y bastante trabajadora, pero es un poco tímida. Le gusta mucho la música: toca la guitarra y le encantan los conciertos. No le gusta nada el fútbol. Sus amigos son muy divertidos.',
    },
    {
      title: 'Müzik zevkleri',
      prompt: 'Kendi müzik zevkini bir arkadaşınınkiyle karşılaştır: neleri seviyorsunuz, neleri sevmiyorsunuz? también / tampoco kullan.',
      min: 35, max: 70,
      checks: [
        { label: 'me gusta / me gustan / me encanta', re: '\\bme (gustan?|encantan?|interesan?)\\b' },
        { label: 'başka biri için le gusta / le gustan', re: '\\b(le|les|nos) (gustan?|encantan?|interesan?)\\b' },
        { label: 'olumsuz beğeni (no … gusta)', re: '\\bno (me|le|nos|les) gustan?\\b' },
        { label: 'también', re: '\\btambien\\b' },
        { label: 'tampoco', re: '\\btampoco\\b' },
        { label: 'en az 2 müzik kelimesi', vocab: 'v5-musica', n: 2 },
      ],
      model: 'Me gusta mucho el rap y me encantan los conciertos. A mi amigo Can también le gusta el rap, pero a él le gusta más el rock. No me gusta nada el reguetón y a Can tampoco. A él le encanta tocar la guitarra; a mí también, pero no toco muy bien. Nos gusta ir a conciertos.',
    },
  ],
  speaking: [
    { q: '¿Cómo es tu mejor amigo o amiga?', tr: 'En iyi arkadaşın nasıl biri?', kw: ['es', 'tiene', 'muy|bastante|un poco'], list: ['ser + en az 2 sıfat kullandım', 'tener / llevar ile görünüşten bahsettim', 'Sıfatları kişinin cinsiyetine uydurdum'], model: 'Mi mejor amigo se llama Can. Es alto y moreno, y lleva gafas. Es muy divertido y bastante inteligente.' },
    { q: '¿Qué tipo de música te gusta?', tr: 'Ne tür müzik seversin?', kw: ['me gusta|me gustan|me encanta|me encantan', 'música|rap|rock|pop|jazz'], list: ['me gusta / me gustan uyumunu doğru kurdum', 'Türden önce artikel kullandım (el rap, la música…)', 'Sevmediğim bir şeyi de söyledim (no me gusta…)'], model: 'Me gusta mucho el rap y también me gusta el pop. No me gusta nada la música electrónica.' },
    { q: '¿Cómo es tu familia?', tr: 'Ailen nasıl?', kw: ['mi|mis', 'padre|madre|hermano|hermana|padres', 'es|son|se llama'], list: ['En az 2 aile üyesinden bahsettim', 'Posesivo kullandım (mi, mis)', 'Her biri için en az 1 sıfat söyledim'], model: 'Mi familia es pequeña. Mi madre es muy alegre y mi padre es bastante tranquilo. Tengo una hermana; es muy simpática.' },
    { q: '¿Qué te gusta hacer con tus amigos?', tr: 'Arkadaşlarınla ne yapmayı seversin?', kw: ['me gusta|nos gusta|me encanta|nos encanta'], list: ['gusta + infinitivo kullandım', 'En az 2 etkinlik saydım'], model: 'Con mis amigos me gusta ir a conciertos y escuchar música. También nos gusta jugar al fútbol.' },
  ],
};
