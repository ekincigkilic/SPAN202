// Unidad 9 — ¿Sabes conducir? Tüm içerik "üretildi" etiketlidir.
const T = rows => `<table>${rows.map((r, i) => `<tr>${r.map(c => i ? `<td>${c}</td>` : `<th>${c}</th>`).join('')}</tr>`).join('')}</table>`;

export const U9 = {
  u: 9,
  title: '¿Sabes conducir?',
  verbs: [
    { inf: 'saber', tr: 'bilmek', grp: 'yo düzensiz', topic: 'g9-saber', forms: ['sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben'] },
    { inf: 'poder', tr: '-ebilmek', grp: 'o→ue', topic: 'g9-poder', forms: ['puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden'] },
  ],
  // [infinitivo, Türkçe, düzensiz participio]. Üçüncü alan boşsa participio üreticiyle kurulur.
  perfectVerbs: [
    ['hablar', 'konuşmak'], ['estar', 'bulunmak'], ['viajar', 'seyahat etmek'], ['trabajar', 'çalışmak'], ['estudiar', 'okumak, çalışmak'], ['probar', 'tatmak, denemek'],
    ['visitar', 'ziyaret etmek'], ['comer', 'yemek'], ['vivir', 'yaşamak'], ['ir', 'gitmek'], ['ser', 'olmak'], ['tener', 'sahip olmak'], ['conocer', 'tanımak'],
    ['leer', 'okumak'], ['levantarse', 'kalkmak'], ['perderse', 'kaybolmak'],
    ['hacer', 'yapmak', 'hecho'], ['ver', 'görmek', 'visto'], ['escribir', 'yazmak', 'escrito'], ['decir', 'söylemek', 'dicho'], ['poner', 'koymak', 'puesto'],
    ['volver', 'dönmek', 'vuelto'], ['abrir', 'açmak', 'abierto'], ['romper', 'kırmak', 'roto'],
  ],
  grammar: [
    {
      id: 'g9-perfecto', title: 'El pretérito perfecto',
      html: `<p>Hayat boyu yaşanmış deneyimlerden söz ederken kullanılır ("hiç … yaptın mı?", "iki kez … yaptım"). Yapısı: <b>haber (presente) + participio</b>.</p>
${T([['', 'haber', 'participio'], ['yo', '<b>he</b>', 'habl<b>ado</b> (-ar)'], ['tú', '<b>has</b>', 'com<b>ido</b> (-er)'], ['él / ella / usted', '<b>ha</b>', 'viv<b>ido</b> (-ir)'], ['nosotros/as', '<b>hemos</b>', ''], ['vosotros/as', '<b>habéis</b>', ''], ['ellos / ellas / ustedes', '<b>han</b>', '']])}
<p><b>Düzensiz participio'lar:</b></p>
${T([['hacer', 'ver', 'escribir', 'decir'], ['<b>hecho</b>', '<b>visto</b>', '<b>escrito</b>', '<b>dicho</b>'], ['<b>poner</b>', '<b>volver</b>', '<b>abrir</b>', '<b>romper</b>'], ['<b>puesto</b>', '<b>vuelto</b>', '<b>abierto</b>', '<b>roto</b>']])}
<ul><li>Participio bu zamanda <b>değişmez</b> (cinsiyet/sayı almaz): <i>María ha viajad<b>o</b> mucho.</i></li>
<li><i>haber</i> ile participio arasına hiçbir şey girmez: <i><b>No</b> he estado <b>nunca</b> en Perú.</i></li>
<li>Zamirler <i>haber</i>'den önce gelir: <i><b>Me</b> he levantado tarde.</i> · <i><b>Lo</b> he probado.</i></li>
<li>Kökü ünlüyle biten -er/-ir fiillerinde aksan: <i>leer → le<b>í</b>do</i>.</li>
<li><i>ir → ido, ser → sido</i> düzenlidir.</li></ul>`,
      examples: [['¿Has estado alguna vez en España?', 'Hiç İspanya\'da bulundun mu?'], ['He trabajado en un restaurante dos veces.', 'İki kez bir restoranda çalıştım.'], ['Nunca hemos visto esa película.', 'O filmi hiç izlemedik.'], ['Mi hermana ha vivido en Alemania.', 'Kız kardeşim Almanya\'da yaşadı.']],
      fill: [
        'Yo nunca ___ en México. (estar)|he estado',
        '¿ ___ alguna vez paella? (comer, tú)|Has comido',
        'Mi hermana ___ en Alemania. (vivir)|ha vivido',
        'Nosotros ___ muchas películas españolas. (ver)|hemos visto',
        '¿Vosotros ___ en un restaurante? (trabajar)|habéis trabajado',
        'Mis padres ___ a Italia dos veces. (ir)|han ido',
        'Yo ___ un curso de español. (hacer)|he hecho',
        '¿Alguna vez ___ un poema? (escribir, tú)|has escrito',
        'Ana nunca ___ ceviche. (probar)|ha probado',
        'Yo ___ muy tarde muchas veces. (levantarse)|me he levantado',
        'Nosotros ___ a casa muy tarde. (volver)|hemos vuelto',
        '¿Quién ___ la ventana? (abrir)|ha abierto',
      ],
      mc: [
        'Pretérito perfecto nasıl kurulur?|haber (presente) + participio|ser + participio|estar + gerundio|tener + infinitivo',
        '«escribir» fiilinin participio\'su?|escrito|escribido|escribado|escrido',
        '«hacer» fiilinin participio\'su?|hecho|hacido|hacho|hecido',
        '«ver» fiilinin participio\'su?|visto|vido|veído|vesto',
        'Hangisi doğru?|No he estado nunca en Perú.|He no estado nunca en Perú.|No estado he nunca en Perú.|No he nunca estado en Perú.',
        'Hangisi doğru?|María ha viajado mucho.|María ha viajada mucho.|María he viajado mucho.|María has viajado mucho.',
        'Hangisi doğru?|Me he levantado tarde.|He me levantado tarde.|He levantado me tarde.|Me levantado he tarde.',
        '«¿Has estado alguna vez en España?» ne demek?|Hiç İspanya\'da bulundun mu?|Şu an İspanya\'da mısın?|İspanya\'ya ne zaman gideceksin?|İspanya\'da kaç yıl yaşadın?',
        '«decir» fiilinin participio\'su?|dicho|decido|dicido|dijo',
        '«volver» fiilinin participio\'su?|vuelto|volvido|vuelvido|volto',
      ],
      tr: [
        'Hiç İspanya\'da bulunmadım.|Nunca he estado en España.|No he estado nunca en España.',
        'Çok film izledim.|He visto muchas películas.',
        'Hiç paella yedin mi?|¿Has comido paella alguna vez?|¿Has comido alguna vez paella?|¿Alguna vez has comido paella?',
      ],
      order: ['He estado dos veces en Madrid|He estado en Madrid dos veces', 'Nunca he trabajado en un restaurante'],
    },
    {
      id: 'g9-saber', title: 'Saber + infinitivo',
      html: `<p><b>saber + infinitivo</b> öğrenilmiş bir beceriyi anlatır: "-meyi bilmek".</p>
${T([['yo', 'tú', 'él / ella / usted', 'nosotros/as', 'vosotros/as', 'ellos / ellas / ustedes'], ['<b>sé</b>', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben']])}
<ul><li>Yalnızca <b>yo</b> düzensizdir: <b>sé</b> (aksanlı; aksansız <i>se</i> zamirdir).</li>
<li><i>Sé conducir.</i> (Araba sürmeyi biliyorum.) · <i>No sé nadar.</i> · <i>¿Sabes tocar la guitarra?</i></li>
<li>Derece: <i>Sé cocinar <b>muy bien / bastante bien / un poco</b>.</i></li></ul>`,
      examples: [['¿Sabes conducir?', 'Araba sürmeyi biliyor musun?'], ['Sé hablar inglés y un poco de español.', 'İngilizce ve biraz İspanyolca konuşmayı biliyorum.'], ['Mi hermano no sabe cocinar.', 'Erkek kardeşim yemek yapmayı bilmez.']],
      fill: [
        'Yo ___ tocar la guitarra. (saber)|sé',
        '¿ ___ conducir? (saber, tú)|Sabes',
        'Mi abuela ___ cocinar muy bien. (saber)|sabe',
        'Nosotros no ___ esquiar. (saber)|sabemos',
        '¿Vosotros ___ hablar inglés? (saber)|sabéis',
        'Mis amigos ___ bailar salsa. (saber)|saben',
      ],
      mc: [
        '«saber» fiilinin yo çekimi?|sé|sabo|se|sepo',
        '«Sé nadar» ne demek?|Yüzmeyi biliyorum|Yüzmeme izin var|Yüzmek istiyorum|Yüzdüm',
        'saber\'den sonra fiil hangi biçimde gelir?|infinitivo|presente|participio|gerundio',
        '«sé» ile «se» farkı?|sé = biliyorum, se = zamir|Fark yok|sé = zamir, se = biliyorum|sé çoğuldur',
        'Hangisi doğru?|No sé cocinar.|No sé cocino.|No sabo cocinar.|Sé no cocinar.',
      ],
      tr: ['Araba sürmeyi biliyor musun?|¿Sabes conducir?', 'Yemek yapmayı bilmiyorum.|No sé cocinar.'],
    },
    {
      id: 'g9-poder', title: 'Poder + infinitivo',
      html: `<p><b>poder + infinitivo</b> imkânı ya da izni anlatır: "-ebilmek". Kök değişir (o→ue): <b>puedo, puedes, puede</b>, podemos, podéis, <b>pueden</b>.</p>
${T([['', 'saber + infinitivo', 'poder + infinitivo'],
        ['anlam', 'öğrenilmiş beceri', 'koşullar, imkân, izin'],
        ['örnek', '<i>No sé nadar.</i> (Hiç öğrenmedim.)', '<i>Hoy no puedo nadar.</i> (Havuz kapalı.)'],
        ['örnek', '<i>Sé hablar inglés.</i>', '<i>¿Puedes venir mañana?</i>']])}
<ul><li>Rica: <i>¿Puedes abrir la ventana, por favor?</i></li><li>Genel izin: <i>Aquí no se puede fumar.</i></li>
<li>Türkçede ikisi de "-ebilmek" ile çevrilebildiği için karışır: beceri ise <b>saber</b>, durum ise <b>poder</b>.</li></ul>`,
      examples: [['¿Puedes trabajar los fines de semana?', 'Hafta sonları çalışabilir misin?'], ['Sé conducir, pero hoy no puedo: no tengo coche.', 'Araba sürmeyi biliyorum ama bugün süremem: arabam yok.']],
      fill: [
        'Hoy no ___ ir a clase. (poder, yo)|puedo',
        '¿ ___ venir mañana? (poder, tú)|Puedes',
        'Aquí no se ___ fumar. (poder)|puede',
        'Nosotros ___ trabajar los fines de semana. (poder)|podemos',
        '¿ ___ empezar el lunes? (poder, vosotros)|Podéis',
        'Los candidatos ___ enviar el currículum por correo. (poder)|pueden',
      ],
      mc: [
        'No ___ nadar: no he aprendido nunca.|sé|puedo|sabo|he',
        'Hoy no ___ nadar: la piscina está cerrada.|puedo|sé|sabo|soy',
        '¿ ___ abrir la ventana, por favor?|Puedes|Sabes|Conoces|Eres',
        '«saber» ile «poder» farkı?|saber = öğrenilmiş beceri, poder = imkân / izin|saber = izin, poder = beceri|Fark yok|poder sadece geçmişte kullanılır',
        '___ hablar tres idiomas: turco, inglés y un poco de español.|Sé|Soy|He|Estoy',
        '— ¿Vienes al cine? — No ___ , tengo que estudiar.|puedo|sé|sabo|soy',
        '«poder» fiilinin nosotros çekimi?|podemos|puedemos|puedimos|podimos',
      ],
      tr: [
        'Bugün gelemiyorum.|Hoy no puedo venir.|No puedo venir hoy.',
        'Hafta sonları çalışabilirim.|Puedo trabajar los fines de semana.|Los fines de semana puedo trabajar.',
      ],
    },
    {
      id: 'g9-frec', title: 'Expresiones de frecuencia (experiencias)',
      html: `<p>Pretérito perfecto ile bir şeyi kaç kez yaptığını söylemek için:</p>
<p><b>muchas veces</b> › <b>varias veces</b> › <b>dos / tres veces</b> › <b>una vez</b> › <b>nunca</b></p>
<ul><li><b>alguna vez</b> soruda "hiç" demektir: <i>¿Has estado alguna vez en Latinoamérica?</i></li>
<li>Cevaplar: <i>Sí, una vez. / Sí, muchas veces. / No, nunca.</i></li>
<li><b>nunca</b> fiilden önceyse "no" gerekmez: <i>Nunca he esquiado.</i> = <i>No he esquiado nunca.</i></li>
<li><i>vez</i> → çoğulu <b>veces</b> (z → c).</li></ul>`,
      examples: [['He estado en Barcelona varias veces.', 'Birkaç kez Barselona\'da bulundum.'], ['— ¿Has probado el gazpacho? — No, nunca.', '— Gazpacho\'yu tattın mı? — Hayır, hiç.']],
      mc: [
        'Soruda «hiç» anlamı veren hangisi?|alguna vez|nunca vez|una vez|ninguna',
        '«birkaç kez»|varias veces|muchas vez|alguna vez|una vez',
        '«dos veces» ne demek?|iki kez|ikinci|iki saat|iki kişi',
        'Hangisi doğru?|He estado una vez en París.|He estado una veces en París.|He estado uno vez en París.|He una vez estado en París.',
        '— ¿Has probado el ceviche? — No, ___ .|nunca|alguna vez|muchas veces|una vez',
        '«vez» kelimesinin çoğulu?|veces|vezes|vezs|vez',
        'Çoktan aza doğru sıra hangisi?|muchas veces > varias veces > una vez > nunca|una vez > muchas veces > nunca > varias veces|nunca > una vez > varias veces > muchas veces|varias veces > muchas veces > una vez > nunca',
      ],
      fill: [
        '¿Has estado ___ vez en Latinoamérica? (hiç)|alguna',
        'He visto esa película tres ___ . (kez)|veces',
        'No he esquiado ___ . (asla)|nunca',
        'He comido paella muchas ___ . (kez)|veces',
        'Solo he ido una ___ a Barcelona. (kez)|vez',
        'He estado ___ veces en Estambul. (birkaç)|varias',
      ],
      tr: ['Bir kez Madrid\'e gittim.|He ido una vez a Madrid.|He ido a Madrid una vez.|He estado una vez en Madrid.|He estado en Madrid una vez.'],
    },
  ],
  vocab: [
    {
      id: 'v9-cualidades', title: 'Cualidades y defectos (adjetivos de carácter)',
      note: '<p><b>-ista</b> ve <b>-e</b> ile biten sıfatlar eril ve dişilde aynıdır: <i>optimista, egoísta, paciente, responsable</i>. Olumsuz ön ekler: <b>im-</b> (impaciente, impuntual), <b>ir-</b> (irresponsable), <b>des-</b> (desordenado, desorganizado).</p>',
      adj: [
        'paciente; paciente; sabırlı', 'impaciente; impaciente; sabırsız', 'organizado; organizada; planlı, düzenli çalışan', 'desorganizado; desorganizada; plansız',
        'responsable; responsable; sorumluluk sahibi', 'irresponsable; irresponsable; sorumsuz', 'puntual; puntual; dakik', 'impuntual; impuntual; dakik olmayan',
        'creativo; creativa; yaratıcı', 'despistado; despistada; dalgın, unutkan', 'sincero; sincera; samimi, dürüst', 'egoísta; egoísta; bencil',
        'optimista; optimista; iyimser', 'pesimista; pesimista; kötümser', 'ordenado; ordenada; tertipli', 'desordenado; desordenada; dağınık',
        'perezoso; perezosa; üşengeç', 'independiente; independiente; bağımsız', 'comunicativo; comunicativa; iletişimi güçlü', 'dinámico; dinámica; enerjik, dinamik',
        'flexible; flexible; esnek', 'educado; educada; kibar, terbiyeli', 'maleducado; maleducada; kaba, terbiyesiz', 'ambicioso; ambiciosa; hırslı',
        'tolerante; tolerante; hoşgörülü', 'exigente; exigente; titiz, talepkâr',
      ],
    },
    {
      id: 'v9-habilidades', title: 'Habilidades y trabajo',
      n: [
        'el trabajo; trabajos; iş', 'el candidato; candidatos; aday (erkek)', 'la candidata; candidatas; aday (kadın)', 'la experiencia; experiencias; deneyim',
        'la entrevista; entrevistas; mülakat', 'el idioma; idiomas; dil (yabancı dil)', 'la cualidad; cualidades; olumlu özellik', 'el defecto; defectos; kusur',
        'la habilidad; habilidades; beceri', 'el currículum; -; özgeçmiş',
      ],
      phr: [
        'conducir; araba sürmek', 'nadar; yüzmek', 'dibujar; resim çizmek', 'esquiar; kayak yapmak', 'programar; program yazmak', 'coser; dikiş dikmek',
        'tocar un instrumento; enstrüman çalmak', 'hablar idiomas; yabancı dil konuşmak', 'hablar en público; topluluk önünde konuşmak', 'trabajar en equipo; ekip hâlinde çalışmak',
        'usar el ordenador; bilgisayar kullanmak', 'montar en bicicleta; bisiklete binmek', 'montar a caballo; ata binmek', 'jugar al ajedrez; satranç oynamak',
        'hacer fotos; fotoğraf çekmek', 'escuchar a los demás; başkalarını dinlemek', 'tomar decisiones; karar almak', 'organizar eventos; etkinlik düzenlemek',
      ],
    },
    {
      id: 'v9-frecuencia', title: 'Expresiones de frecuencia',
      phr: [
        'alguna vez; herhangi bir zaman (soruda: hiç)', 'una vez; bir kez', 'dos veces; iki kez', 'tres veces; üç kez', 'varias veces; birkaç kez', 'muchas veces; birçok kez',
        'pocas veces; nadiren', 'nunca; hiçbir zaman',
      ],
    },
  ],
  writing: [
    {
      title: 'İş başvurusu',
      prompt: 'Bir yaz işine başvuruyorsun (ör. otel resepsiyonu ya da yaz kampı görevlisi). Kendini tanıt: deneyimlerin, neleri yapmayı bildiğin, neleri yapabileceğin, güçlü ve zayıf yönlerin.',
      min: 50, max: 90,
      checks: [
        { label: 'en az 2 pretérito perfecto (he trabajado, he estudiado…)', count: '\\bhe [a-zñ]+(ado|ido|to|cho)\\b', n: 2 },
        { label: 'sé + infinitivo', re: '\\bse [a-zñ]+(ar|er|ir)\\b' },
        { label: 'puedo + infinitivo', re: '\\bpuedo [a-zñ]+(ar|er|ir)\\b' },
        { label: 'sıklık ifadesi (una vez, dos veces, muchas veces, nunca…)', re: '\\b(vez|veces|nunca)\\b' },
        { label: 'soy + özellik', re: '\\bsoy\\b' },
        { label: 'en az 3 karakter sıfatı', vocab: 'v9-cualidades', n: 3 },
      ],
      model: 'Me llamo Deniz y estudio en la universidad. He trabajado dos veces en verano y he estudiado inglés muchos años. Sé hablar inglés muy bien y un poco de español. También sé usar el ordenador y sé conducir. Puedo trabajar los fines de semana y puedo empezar en junio. Soy responsable, puntual y bastante organizado, pero a veces soy un poco impaciente. Nunca he trabajado en un hotel, pero aprendo rápido.',
    },
    {
      title: 'Deneyimlerim',
      prompt: 'Hayatında yaptığın ve hiç yapmadığın şeyleri anlat: seyahat, yemek, spor, iş… Kaç kez yaptığını da söyle.',
      min: 45, max: 85,
      checks: [
        { label: 'en az 3 pretérito perfecto', count: '\\b(he|hemos) [a-zñ]+(ado|ido|to|cho)\\b', n: 3 },
        { label: 'düzensiz participio (hecho, visto, escrito, vuelto…)', re: '\\b(hecho|visto|escrito|vuelto|dicho|puesto|abierto|roto)\\b' },
        { label: 'nunca', re: '\\bnunca\\b' },
        { label: 'kaç kez (una vez, dos veces, muchas veces…)', re: '\\b(una vez|veces)\\b' },
        { label: 'karşılaştırma için pero', re: '\\bpero\\b' },
      ],
      model: 'He viajado bastante: he estado dos veces en Italia y una vez en Londres. Nunca he estado en España, pero he estudiado español este año. He probado la paella una vez y he comido tacos muchas veces. He hecho mucho deporte: he jugado al fútbol y he nadado en el mar, pero nunca he esquiado. También he visto varias películas españolas.',
    },
  ],
  speaking: [
    { q: '¿Has estado alguna vez en otro país?', tr: 'Hiç başka bir ülkede bulundun mu?', kw: ['he estado|he ido|he viajado|nunca', 'vez|veces|nunca'], list: ['he + participio kurdum', 'Kaç kez olduğunu söyledim (una vez, dos veces…)', 'Hiç gitmediğim bir yeri de söyledim (nunca he estado en…)'], model: 'Sí, he estado dos veces en Italia y una vez en Grecia. Nunca he estado en España.' },
    { q: '¿Qué sabes hacer muy bien?', tr: 'Neyi çok iyi yapmayı bilirsin?', kw: ['sé'], list: ['sé + infinitivo kullandım', 'En az 2 beceri saydım', 'Bilmediğim bir şeyi de söyledim (no sé…)'], model: 'Sé programar y sé hablar inglés muy bien. También sé nadar, pero no sé esquiar.' },
    { q: '¿Cuáles son tus cualidades y tus defectos?', tr: 'Güçlü ve zayıf yönlerin neler?', kw: ['soy', 'pero|también|y'], list: ['En az 2 olumlu özellik söyledim', 'En az 1 kusur söyledim', 'Sıfatları kendi cinsiyetime uydurdum'], model: 'Soy responsable y bastante organizado. También soy puntual. Pero soy un poco impaciente y a veces despistado.' },
    { q: '¿Qué no has hecho nunca?', tr: 'Hiç yapmadığın şey ne?', kw: ['nunca', 'he'], list: ['nunca + he + participio kurdum', 'En az 2 örnek verdim', 'Düzensiz bir participio kullandım (hecho, visto, escrito…)'], model: 'Nunca he esquiado y nunca he montado a caballo. Tampoco he visto el mar Caribe.' },
    { q: '¿Puedes trabajar los fines de semana?', tr: 'Hafta sonları çalışabilir misin?', kw: ['puedo', 'pero|porque|los sábados|los domingos'], list: ['puedo + infinitivo kullandım', 'Bir koşul ya da neden ekledim (pero…, porque…)'], model: 'Sí, puedo trabajar los sábados, pero los domingos no puedo porque estudio.' },
  ],
};
