// Unidad 6 — Día a día. Tüm içerik "üretildi" etiketlidir.
const T = rows => `<table>${rows.map((r, i) => `<tr>${r.map(c => i ? `<td>${c}</td>` : `<th>${c}</th>`).join('')}</tr>`).join('')}</table>`;
const V = (inf, tr, grp, forms) => ({ inf, tr, grp, forms: forms ? forms.split(',').map(s => s.trim()) : null });

export const U6 = {
  u: 6,
  title: 'Día a día',
  // forms === null -> düzenli üretici kullanılır. Düzensizler elle girilmiştir; testler kural üreticisiyle karşılaştırır.
  verbs: [
    V('empezar', 'başlamak', 'e→ie', 'empiezo, empiezas, empieza, empezamos, empezáis, empiezan'),
    V('querer', 'istemek', 'e→ie', 'quiero, quieres, quiere, queremos, queréis, quieren'),
    V('preferir', 'tercih etmek', 'e→ie', 'prefiero, prefieres, prefiere, preferimos, preferís, prefieren'),
    V('cerrar', 'kapatmak', 'e→ie', 'cierro, cierras, cierra, cerramos, cerráis, cierran'),
    V('despertarse', 'uyanmak', 'e→ie', 'me despierto, te despiertas, se despierta, nos despertamos, os despertáis, se despiertan'),
    V('dormir', 'uyumak', 'o→ue', 'duermo, duermes, duerme, dormimos, dormís, duermen'),
    V('volver', 'dönmek', 'o→ue', 'vuelvo, vuelves, vuelve, volvemos, volvéis, vuelven'),
    V('poder', '-ebilmek', 'o→ue', 'puedo, puedes, puede, podemos, podéis, pueden'),
    V('almorzar', 'öğle yemeği yemek', 'o→ue', 'almuerzo, almuerzas, almuerza, almorzamos, almorzáis, almuerzan'),
    V('acostarse', 'yatmak', 'o→ue', 'me acuesto, te acuestas, se acuesta, nos acostamos, os acostáis, se acuestan'),
    V('pedir', 'istemek, sipariş etmek', 'e→i', 'pido, pides, pide, pedimos, pedís, piden'),
    V('repetir', 'tekrar etmek', 'e→i', 'repito, repites, repite, repetimos, repetís, repiten'),
    V('vestirse', 'giyinmek', 'e→i', 'me visto, te vistes, se viste, nos vestimos, os vestís, se visten'),
    V('jugar', 'oynamak', 'u→ue', 'juego, juegas, juega, jugamos, jugáis, juegan'),
    V('hacer', 'yapmak', 'yo -go', 'hago, haces, hace, hacemos, hacéis, hacen'),
    V('salir', 'çıkmak', 'yo -go', 'salgo, sales, sale, salimos, salís, salen'),
    V('poner', 'koymak', 'yo -go', 'pongo, pones, pone, ponemos, ponéis, ponen'),
    V('tener', 'sahip olmak', 'yo -go + e→ie', 'tengo, tienes, tiene, tenemos, tenéis, tienen'),
    V('venir', 'gelmek', 'yo -go + e→ie', 'vengo, vienes, viene, venimos, venís, vienen'),
    V('ir', 'gitmek', 'tam düzensiz', 'voy, vas, va, vamos, vais, van'),
    V('ser', 'olmak', 'tam düzensiz', 'soy, eres, es, somos, sois, son'),
    V('estar', 'olmak, bulunmak', 'tam düzensiz', 'estoy, estás, está, estamos, estáis, están'),
    V('ver', 'görmek, izlemek', 'yo düzensiz', 'veo, ves, ve, vemos, veis, ven'),
    V('levantarse', 'kalkmak', 'düzenli (reflexivo)'),
    V('ducharse', 'duş almak', 'düzenli (reflexivo)'),
    V('lavarse', 'yıkanmak', 'düzenli (reflexivo)'),
    V('peinarse', 'saçını taramak', 'düzenli (reflexivo)'),
    V('afeitarse', 'tıraş olmak', 'düzenli (reflexivo)'),
    V('maquillarse', 'makyaj yapmak', 'düzenli (reflexivo)'),
    V('desayunar', 'kahvaltı etmek', 'düzenli'),
    V('cenar', 'akşam yemeği yemek', 'düzenli'),
    V('trabajar', 'çalışmak', 'düzenli'),
    V('comer', 'yemek', 'düzenli'),
    V('leer', 'okumak', 'düzenli'),
    V('vivir', 'yaşamak', 'düzenli'),
  ],
  grammar: [
    {
      id: 'g6-irreg', title: 'Presente: verbos irregulares',
      unsure: 'Kitabın bu ünitede tam olarak hangi fiilleri verdiği bilinmiyor; buradaki liste A1 için standart settir.',
      html: `<p>Düzenli ekler aynı kalır; değişen şey fiilin <b>kökü</b> ya da yalnızca <b>yo</b> biçimidir.</p>
<p><b>1) Kök ünlüsü değişenler.</b> Değişim <i>yo, tú, él, ellos</i> kişilerinde olur; <b>nosotros ve vosotros'ta olmaz</b>.</p>
${T([['', 'e→ie<br>empezar', 'o→ue<br>volver', 'e→i<br>pedir', 'u→ue<br>jugar'],
        ['yo', 'emp<b>ie</b>zo', 'v<b>ue</b>lvo', 'p<b>i</b>do', 'j<b>ue</b>go'],
        ['tú', 'emp<b>ie</b>zas', 'v<b>ue</b>lves', 'p<b>i</b>des', 'j<b>ue</b>gas'],
        ['él / ella / usted', 'emp<b>ie</b>za', 'v<b>ue</b>lve', 'p<b>i</b>de', 'j<b>ue</b>ga'],
        ['nosotros/as', 'empezamos', 'volvemos', 'pedimos', 'jugamos'],
        ['vosotros/as', 'empezáis', 'volvéis', 'pedís', 'jugáis'],
        ['ellos / ellas / ustedes', 'emp<b>ie</b>zan', 'v<b>ue</b>lven', 'p<b>i</b>den', 'j<b>ue</b>gan']])}
<ul><li>e→ie: empezar, querer, preferir, cerrar, despertarse</li><li>o→ue: dormir, volver, poder, almorzar, acostarse</li><li>e→i: pedir, repetir, vestirse</li></ul>
<p><b>2) Yalnızca "yo" düzensiz (-go):</b> hacer → <b>hago</b>, salir → <b>salgo</b>, poner → <b>pongo</b>. Ayrıca ver → <b>veo</b>.</p>
<p><b>3) -go + kök değişimi:</b> tener → <b>tengo</b>, tienes, tiene, tenemos, tenéis, tienen · venir → <b>vengo</b>, vienes, viene, venimos, venís, vienen.</p>
<p><b>4) Tam düzensizler:</b></p>
${T([['', 'ir', 'ser', 'estar'], ['yo', 'voy', 'soy', 'estoy'], ['tú', 'vas', 'eres', 'estás'], ['él / ella / usted', 'va', 'es', 'está'], ['nosotros/as', 'vamos', 'somos', 'estamos'], ['vosotros/as', 'vais', 'sois', 'estáis'], ['ellos / ellas / ustedes', 'van', 'son', 'están']])}`,
      examples: [['Empiezo a trabajar a las nueve.', 'Saat dokuzda işe başlarım.'], ['¿A qué hora vuelves a casa?', 'Eve saat kaçta dönersin?'], ['Los sábados salgo con mis amigos.', 'Cumartesileri arkadaşlarımla dışarı çıkarım.'], ['Dormimos ocho horas.', 'Sekiz saat uyuruz.']],
      fill: [
        'Yo ___ de casa a las ocho. (salir)|salgo',
        '¿A qué hora ___ (tú) a trabajar? (empezar)|empiezas',
        'Mi hermana ___ ocho horas. (dormir)|duerme',
        'Nosotros ___ a casa a las seis. (volver)|volvemos',
        'Yo ___ deporte los martes. (hacer)|hago',
        'Los niños ___ al fútbol por la tarde. (jugar)|juegan',
        '¿Vosotros ___ ir al cine? (querer)|queréis',
        'Yo ___ al gimnasio tres veces a la semana. (ir)|voy',
        'Mis padres ___ mucho trabajo. (tener)|tienen',
        'Yo ___ la mesa antes de cenar. (poner)|pongo',
        '¿Tú ___ café o té? (preferir)|prefieres',
        'En el restaurante yo siempre ___ pescado. (pedir)|pido',
        'Nosotros ___ estudiantes. (ser)|somos',
        'Yo ___ la tele por la noche. (ver)|veo',
      ],
      mc: [
        'Kök değişimi hangi kişilerde OLMAZ?|nosotros ve vosotros|yo ve tú|él ve ellos|Hepsinde olur',
        'Hangisi e→i fiilidir?|pedir|querer|volver|empezar',
        '«jugar» fiilinin yo çekimi?|juego|jugo|jago|jueguo',
        'Hangisi doğru?|Nosotros empezamos a las nueve.|Nosotros empiezamos a las nueve.|Nosotros empiezan a las nueve.|Nosotros empezáis a las nueve.',
        '«venir» fiilinin yo çekimi?|vengo|veno|viengo|vieno',
        '«dormir» fiilinin ellos çekimi?|duermen|dormen|duermin|dueren',
      ],
      tr: [
        'Saat dokuzda işe başlarım.|Empiezo a trabajar a las nueve.',
        'Cumartesileri arkadaşlarımla dışarı çıkarım.|Los sábados salgo con mis amigos.|Salgo con mis amigos los sábados.',
        'Eve saat kaçta dönersin?|¿A qué hora vuelves a casa?',
      ],
    },
    {
      id: 'g6-refl', title: 'Los verbos reflexivos',
      html: `<p>Mastarı <b>-se</b> ile biten fiillerde eylem özneye döner (<i>levantarse</i> = kalkmak). Çekimde <b>-se</b> atılır, kişiye uygun zamir <b>çekimli fiilin önüne</b> gelir.</p>
${T([['', 'zamir', 'levantarse', 'acostarse (o→ue)'],
        ['yo', 'me', 'me levanto', 'me acuesto'], ['tú', 'te', 'te levantas', 'te acuestas'], ['él / ella / usted', 'se', 'se levanta', 'se acuesta'],
        ['nosotros/as', 'nos', 'nos levantamos', 'nos acostamos'], ['vosotros/as', 'os', 'os levantáis', 'os acostáis'], ['ellos / ellas / ustedes', 'se', 'se levantan', 'se acuestan']])}
<ul><li>Olumsuz: <i><b>No</b> me levanto temprano.</i></li>
<li>Dönüşlü fiil ayrıca kök değiştirebilir: <i>despertarse (e→ie), acostarse (o→ue), vestirse (e→i)</i>.</li>
<li>Vücut bölümüyle posesivo değil artikel kullanılır: <i>Me lavo <b>los</b> dientes.</i></li></ul>`,
      examples: [['Me levanto a las siete y me ducho.', 'Yedide kalkar ve duş alırım.'], ['¿A qué hora te acuestas?', 'Saat kaçta yatarsın?'], ['Los domingos nos despertamos tarde.', 'Pazarları geç uyanırız.']],
      fill: [
        'Yo ___ a las siete. (levantarse)|me levanto',
        '¿A qué hora ___ (tú)? (acostarse)|te acuestas',
        'Mi padre ___ todos los días. (afeitarse)|se afeita',
        'Nosotros ___ por la noche. (ducharse)|nos duchamos',
        '¿Vosotros ___ temprano? (despertarse)|os despertáis',
        'Mis hermanas ___ antes de salir. (maquillarse)|se maquillan',
        'Ana ___ muy rápido. (vestirse)|se viste',
        'Yo ___ los dientes después de comer. (lavarse)|me lavo',
      ],
      mc: [
        'Çekimli fiilde reflexive zamir nereye gelir?|Fiilden hemen önce: me ducho|Fiilden sonra ayrı: ducho me|Cümlenin sonuna|Öznenin önüne',
        'Hangisi doğru?|Me levanto a las ocho.|Yo levanto me a las ocho.|Me levanta a las ocho.|Se levanto a las ocho.',
        '«nosotros» için reflexive zamir?|nos|nosotros|se|os',
        'Hangisi doğru?|Mi hermano se acuesta tarde.|Mi hermano se acosta tarde.|Mi hermano le acuesta tarde.|Mi hermano acuestase tarde.',
        'Hangisi doğru?|Me lavo los dientes.|Me lavo mis dientes.|Lavo me los dientes.|Se lavo los dientes.',
      ],
      order: [
        'Me levanto a las siete y media',
        'Mi hermana se ducha por la noche|Por la noche mi hermana se ducha|Por la noche se ducha mi hermana',
        'Los domingos nos levantamos tarde|Nos levantamos tarde los domingos',
        'Nunca me acuesto antes de las doce|Antes de las doce nunca me acuesto',
      ],
      tr: [
        'Saat yedide kalkarım.|Me levanto a las siete.',
        'Erkek kardeşim geç yatar.|Mi hermano se acuesta tarde.',
        'Sabahları duş alırız.|Nos duchamos por la mañana.|Por la mañana nos duchamos.',
      ],
    },
    {
      id: 'g6-yotamb', title: 'Yo también / Yo tampoco / Yo sí / Yo no',
      html: `<p>Ünite 5'teki yapının aynısı; fark yalnızca baştaki sözcüktedir. Fiil <b>gustar tipinde değilse</b> cevap <b>Yo…</b> ile kurulur.</p>
${T([['söylenen', 'aynı', 'farklı'],
        ['Me levanto temprano. (+)', '<b>Yo también.</b>', '<b>Yo no.</b>'],
        ['No hago deporte. (−)', '<b>Yo tampoco.</b>', '<b>Yo sí.</b>'],
        ['Me gusta dormir. (+, gustar)', 'A mí también.', 'A mí no.'],
        ['No me gusta madrugar. (−, gustar)', 'A mí tampoco.', 'A mí sí.']])}
<p>Dikkat: <i>Me ducho, me levanto</i> cümlelerindeki <b>me</b> reflexive zamirdir, gustar yapısı değildir. Cevap <b>Yo también</b> olur.</p>`,
      examples: [['— Ceno a las diez. — Yo también.', '— Onda akşam yemeği yerim. — Ben de.'], ['— No veo la tele. — Yo tampoco.', '— Televizyon izlemem. — Ben de izlemem.'], ['— No desayuno nunca. — Pues yo sí.', '— Hiç kahvaltı etmem. — Ben ederim.']],
      mc: [
        '— Me levanto temprano. — (Ben de.)|Yo también.|A mí también.|Yo tampoco.|Yo sí.',
        '— No desayuno nunca. — (Ben de etmem.)|Yo tampoco.|A mí tampoco.|Yo también.|Yo no.',
        '— No hago deporte. — (Ben yaparım.)|Yo sí.|Yo también.|A mí sí.|Yo no.',
        '— Voy al gimnasio todos los días. — (Ben gitmem.)|Yo no.|Yo tampoco.|A mí no.|Yo sí.',
        '— Me gusta dormir la siesta. — (Ben de.)|A mí también.|Yo también.|Yo sí.|A mí tampoco.',
        '— Me ducho por la noche. — (Ben de.)|Yo también.|A mí también.|Yo tampoco.|A mí sí.',
        '«Yo también» ile «A mí también» farkı?|gustar tipi fiillerde «A mí», diğerlerinde «Yo»|Fark yok|«Yo» resmî, «A mí» samimi|«A mí» sadece olumsuzda',
        '— No me gusta madrugar. — (Ben severim.)|A mí sí.|Yo sí.|A mí también.|A mí no.',
      ],
      fill: [
        '— Ceno a las diez. — Yo ___ . (aynı)|también',
        '— No veo la tele. — Yo ___ . (aynı)|tampoco',
        '— No trabajo los sábados. — Pues yo ___ . (farklı)|sí',
        '— Salgo todos los viernes. — Pues yo ___ . (farklı)|no',
        '— Me acuesto muy tarde. — ___ también. (ben de)|Yo',
        '— Me encanta el café. — ___ también. (ben de)|A mí',
      ],
    },
    {
      id: 'g6-conect', title: 'Primero / Después / Luego',
      html: `<p>Eylemleri sıraya koymak için: <b>primero</b> (önce, ilk olarak) → <b>después</b> / <b>luego</b> (sonra). Bu bağlamda <i>después</i> ve <i>luego</i> eş anlamlıdır.</p>
<ul><li><i>Primero me ducho, después desayuno y luego voy a clase.</i></li>
<li><b>antes de</b> + infinitivo: <i>Antes de desayunar, me ducho.</i> (kahvaltı etmeden önce)</li>
<li><b>después de</b> + infinitivo: <i>Después de cenar, veo la tele.</i> (akşam yemeğinden sonra)</li></ul>
<p>"de"den sonra fiil çekilmez, mastar kalır.</p>`,
      examples: [['Primero desayuno y luego me ducho.', 'Önce kahvaltı eder, sonra duş alırım.'], ['Después de comer, duermo la siesta.', 'Öğle yemeğinden sonra şekerleme yaparım.']],
      mc: [
        'Hangisi sıralama sözcüğü DEĞİLDİR?|siempre|después|luego|primero',
        'Después de ___ , me acuesto.|cenar|ceno|cenando|cena',
        '«después» ile «luego» ilişkisi?|Bu bağlamda eş anlamlı: «sonra»|después = önce, luego = sonra|luego = hemen şimdi demek|después sadece saatlerle kullanılır',
        'Antes de ___ , me ducho.|desayunar|desayuno|desayunas|desayunando',
        '«Önce kahvaltı ederim, sonra duş alırım.»|Primero desayuno y después me ducho.|Después desayuno y primero me ducho.|Primero desayunar y después ducharse.|Primero me ducho y después desayuno.',
      ],
      fill: [
        '___ me levanto, después me ducho y luego desayuno. (ilk olarak)|Primero',
        'Primero estudio y ___ veo una serie. (sonra; l ile başlar)|luego',
        'Primero desayuno y ___ voy a clase. (sonra; d ile başlar)|después',
        'Después ___ cenar, leo un poco.|de',
      ],
      order: [
        'Primero me levanto y luego me ducho',
        'Después de cenar veo la tele|Veo la tele después de cenar',
        'Antes de desayunar me ducho|Me ducho antes de desayunar',
      ],
    },
    {
      id: 'g6-hora', title: 'La hora',
      html: `<p><b>¿Qué hora es?</b> (Saat kaç?) → <b>Es la una</b> (yalnızca 1 için tekil) · <b>Son las</b> dos, tres…</p>
${T([['saat', 'İspanyolca'], ['1:00', 'Es la una (en punto).'], ['2:00', 'Son las dos.'], ['2:10', 'Son las dos <b>y</b> diez.'], ['2:15', 'Son las dos <b>y cuarto</b>.'], ['2:30', 'Son las dos <b>y media</b>.'], ['2:40', 'Son las tres <b>menos</b> veinte.'], ['2:45', 'Son las tres <b>menos cuarto</b>.'], ['12:45', 'Es la una menos cuarto.']])}
<ul><li>30'dan sonra bir sonraki saatten geriye sayılır (<b>menos</b>).</li>
<li><b>¿A qué hora…?</b> (Saat kaçta?) → <b>a las</b> ocho / <b>a la</b> una.</li>
<li>Günün bölümü: <i>de la mañana, de la tarde, de la noche</i>. Saat söylenmeden: <i>por la mañana / tarde / noche</i>.</li>
<li>Aralık: <i>de nueve a cinco</i>.</li></ul>
<p class="note">Uygulamadaki saat sorularında günün bölümünü yazmak isteğe bağlıdır.</p>`,
      examples: [['— ¿Qué hora es? — Son las cinco y media.', '— Saat kaç? — Beş buçuk.'], ['— ¿A qué hora te levantas? — A las siete y cuarto.', '— Saat kaçta kalkıyorsun? — Yediyi çeyrek geçe.'], ['La clase empieza a las nueve de la mañana.', 'Ders sabah dokuzda başlar.']],
      mc: [
        '13:00 için hangisi doğru?|Es la una.|Son la una.|Son las una.|Es las una.',
        '«Saat kaçta kalkıyorsun?»|¿A qué hora te levantas?|¿Qué hora te levantas?|¿Qué hora es te levantas?|¿Cuándo hora te levantas?',
        '«Son las ocho menos cuarto» hangi saat?|7:45|8:15|8:45|7:15',
        '«a las diez de la noche» hangi saat?|22:00|10:00|12:00|20:00',
        'Saat sormak için:|¿Qué hora es?|¿Cuánta hora es?|¿Cuál hora es?|¿Qué tiempo es?',
        '«Son las seis y media» hangi saat?|6:30|5:30|6:15|7:30',
      ],
      fill: [
        'La clase empieza ___ nueve. (saat 9\'da)|a las',
        'Como ___ una y media. (saat 1:30\'da)|a la',
        'Son las seis ___ media. (6:30)|y',
        'Son las diez ___ cuarto. (9:45)|menos',
        'Trabajo ___ nueve a cinco. (9\'dan 5\'e)|de',
        '— ¿Qué hora es? — ___ la una y diez.|Es',
      ],
    },
    {
      id: 'g6-frec', title: 'Expresar frecuencia',
      html: `<p>Sıklık sırası (çoktan aza):</p>
<p><b>siempre</b> › <b>casi siempre</b> › <b>normalmente</b> › <b>a menudo</b> › <b>a veces</b> › <b>casi nunca</b> › <b>nunca</b></p>
<ul><li><b>todos los días</b> (her gün), <b>todas las semanas</b> (her hafta)</li>
<li><b>una vez</b> / <b>dos veces a la semana</b>, <b>al mes</b>, <b>al día</b> (haftada / ayda / günde … kez)</li>
<li><b>los lunes</b> = pazartesileri (her pazartesi) · <b>el lunes</b> = (bu) pazartesi</li>
<li><b>nunca</b> fiilden önceyse "no" gerekmez, fiilden sonraysa gerekir: <i>Nunca desayuno.</i> = <i>No desayuno nunca.</i></li></ul>`,
      examples: [['Normalmente me levanto a las siete.', 'Genellikle yedide kalkarım.'], ['Voy al gimnasio dos veces a la semana.', 'Haftada iki kez spor salonuna giderim.'], ['No veo nunca la tele.', 'Hiç televizyon izlemem.']],
      mc: [
        'En sık olan hangisi?|siempre|a menudo|a veces|casi nunca',
        'Hangisi doğru?|No voy nunca al gimnasio.|Voy nunca al gimnasio.|No nunca voy al gimnasio.|Nunca no voy al gimnasio.',
        '«Nunca voy al gimnasio.» cümlesi için hangisi doğru?|Doğru: nunca fiilden önceyse «no» gerekmez|Yanlış: «no» eksik|Yanlış: nunca sona gelmeli|Sadece soru cümlesinde olur',
        '«los lunes» ne demek?|Pazartesileri (her pazartesi)|Bu pazartesi|Geçen pazartesi|Pazartesiye kadar',
        '«Haftada iki kez»|dos veces a la semana|dos vez a la semana|dos veces en semana la|segunda vez por semanas',
        'Sıklık sırası (çoktan aza) hangisi?|siempre > a menudo > a veces > nunca|a veces > siempre > a menudo > nunca|siempre > a veces > a menudo > nunca|a menudo > siempre > nunca > a veces',
      ],
      fill: [
        'Voy al cine una ___ al mes. (kez)|vez',
        'Hago deporte tres ___ a la semana. (kez)|veces',
        '___ los días desayuno café con leche. (her gün)|Todos',
        'No como carne ___ . (asla)|nunca',
        '___ sábados salgo con mis amigos. (cumartesileri)|Los',
        'Voy al gimnasio dos veces ___ la semana.|a',
      ],
      tr: [
        'Her gün spor yaparım.|Hago deporte todos los días.|Todos los días hago deporte.',
        'Bazen arkadaşlarımla dışarı çıkarım.|A veces salgo con mis amigos.|Salgo con mis amigos a veces.|A veces salgo con amigos.|Salgo con amigos a veces.',
        'Asla kahvaltı etmem.|Nunca desayuno.|No desayuno nunca.',
        'Pazartesileri spor salonuna giderim.|Los lunes voy al gimnasio.|Voy al gimnasio los lunes.',
      ],
    },
  ],
  vocab: [
    {
      id: 'v6-dias', title: 'Los días de la semana',
      note: '<p>Günler küçük harfle yazılır ve erildir. <b>-s</b> ile bitenlerin çoğulu aynıdır: <i>el lunes → los lunes</i>. Ama: <i>el sábado → los sábados, el domingo → los domingos</i>.</p>',
      n: [
        'el lunes; lunes; pazartesi', 'el martes; martes; salı', 'el miércoles; miércoles; çarşamba', 'el jueves; jueves; perşembe', 'el viernes; viernes; cuma',
        'el sábado; sábados; cumartesi', 'el domingo; domingos; pazar', 'el fin de semana; fines de semana; hafta sonu', 'el día; días; gün', 'la semana; semanas; hafta',
      ],
      phr: ['hoy; bugün', 'mañana; yarın', 'entre semana; hafta içi'],
    },
    {
      id: 'v6-partes', title: 'Las partes del día y la frecuencia',
      n: ['la mañana; mañanas; sabah', 'la tarde; tardes; öğleden sonra, akşamüstü', 'la noche; noches; akşam, gece', 'el mediodía; mediodías; öğle'],
      phr: [
        'por la mañana; sabahleyin', 'al mediodía; öğlen', 'por la tarde; öğleden sonra', 'por la noche; akşam, geceleyin', 'de madrugada; sabaha karşı',
        'temprano; erken', 'tarde; geç',
        'siempre; her zaman', 'casi siempre; neredeyse her zaman', 'normalmente; genellikle', 'a menudo; sık sık', 'a veces; bazen', 'casi nunca; neredeyse hiç', 'nunca; asla, hiç',
        'todos los días; her gün', 'una vez a la semana; haftada bir kez', 'dos veces al mes; ayda iki kez', 'los fines de semana; hafta sonları',
        '¿Qué hora es?; Saat kaç?', '¿A qué hora…?; Saat kaçta…?', 'y cuarto; çeyrek geçe', 'y media; buçuk', 'menos cuarto; çeyrek var', 'en punto; tam (saat)',
      ],
    },
    {
      id: 'v6-activ', title: 'Actividades diarias',
      phr: [
        'levantarse; kalkmak', 'despertarse; uyanmak', 'ducharse; duş almak', 'lavarse los dientes; dişlerini fırçalamak', 'vestirse; giyinmek', 'peinarse; saçını taramak',
        'afeitarse; tıraş olmak', 'maquillarse; makyaj yapmak', 'acostarse; yatmak', 'dormir; uyumak', 'dormir la siesta; öğle uykusu uyumak',
        'desayunar; kahvaltı etmek', 'comer; öğle yemeği yemek, yemek', 'cenar; akşam yemeği yemek', 'cocinar; yemek pişirmek', 'tomar un café; kahve içmek',
        'ir al trabajo; işe gitmek', 'ir a clase; derse gitmek', 'trabajar; çalışmak', 'estudiar; ders çalışmak', 'hacer los deberes; ödev yapmak',
        'empezar a trabajar; işe başlamak', 'terminar de trabajar; işi bitirmek', 'salir de casa; evden çıkmak', 'volver a casa; eve dönmek', 'llegar a casa; eve varmak',
        'hacer deporte; spor yapmak', 'ir al gimnasio; spor salonuna gitmek', 'jugar al fútbol; futbol oynamak', 'pasear; yürüyüş yapmak, gezmek',
        'hacer la compra; market alışverişi yapmak', 'ir de compras; alışverişe gitmek', 'limpiar la casa; evi temizlemek',
        'ver la tele; televizyon izlemek', 'leer; okumak', 'escuchar la radio; radyo dinlemek', 'navegar por internet; internette gezinmek',
        'salir con amigos; arkadaşlarla dışarı çıkmak', 'quedar con amigos; arkadaşlarla buluşmak', 'ir al cine; sinemaya gitmek',
        'primero; önce, ilk olarak', 'después; sonra', 'luego; sonra, ardından',
      ],
    },
  ],
  writing: [
    {
      title: 'Normal bir günüm',
      prompt: 'Normal bir hafta içi gününü anlat: saatler, sıra (primero, después, luego) ve sıklık ifadeleriyle.',
      min: 50, max: 90,
      checks: [
        { label: 'reflexive fiil, yo (me levanto, me ducho, me acuesto…)', re: '\\bme (levanto|ducho|acuesto|visto|despierto|lavo|peino|afeito|maquillo)\\b' },
        { label: 'saat (a las … / a la una)', re: '\\ba (las|la) (una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce)\\b' },
        { label: 'en az 2 sıralama sözcüğü (primero, después, luego)', reAll: ['\\bprimero\\b', '\\bdespues\\b', '\\bluego\\b'], n: 2 },
        { label: 'sıklık ifadesi (siempre, normalmente, a veces, nunca, todos los días…)', re: '\\b(siempre|normalmente|a menudo|a veces|nunca|todos los dias|veces a la semana|vez a la semana)\\b' },
        { label: 'günün bölümü (por la mañana / tarde / noche)', re: '\\b(por|de) la (manana|tarde|noche)\\b' },
        { label: 'en az 4 farklı yo fiili', reAll: ['\\bdesayuno\\b', '\\bcomo\\b', '\\bceno\\b', '\\bvoy\\b', '\\bsalgo\\b', '\\bvuelvo\\b', '\\bestudio\\b', '\\btrabajo\\b', '\\bhago\\b', '\\bveo\\b', '\\bempiezo\\b', '\\bme levanto\\b', '\\bme ducho\\b', '\\bme acuesto\\b', '\\bleo\\b', '\\bduermo\\b', '\\btengo\\b', '\\bjuego\\b', '\\bme visto\\b', '\\bllego\\b', '\\bcocino\\b', '\\btermino\\b'], n: 4 },
      ],
      model: 'Normalmente me levanto a las siete y media. Primero me ducho y después desayuno café con leche. A las nueve voy a clase. Como a la una en la universidad. Por la tarde estudio y a veces voy al gimnasio. Vuelvo a casa a las siete, ceno a las ocho y luego veo una serie. Casi siempre me acuesto a las doce.',
    },
    {
      title: 'Hafta sonum',
      prompt: 'Hafta sonların hafta içinden nasıl farklı? Cumartesi ve pazar neler yaptığını, ne sıklıkla yaptığını anlat.',
      min: 45, max: 80,
      checks: [
        { label: 'los sábados / los domingos / los fines de semana', re: '\\blos (sabados|domingos|fines de semana)\\b' },
        { label: 'reflexive fiil (me levanto, me acuesto…)', re: '\\bme (levanto|ducho|acuesto|visto|despierto)\\b' },
        { label: 'sıklık ifadesi', re: '\\b(siempre|normalmente|a menudo|a veces|nunca|todos los)\\b' },
        { label: 'saat (a las … / a la una)', re: '\\ba (las|la) (una|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce)\\b' },
        { label: 'karşılaştırma için pero', re: '\\bpero\\b' },
        { label: 'en az 3 farklı yo fiili', reAll: ['\\bdesayuno\\b', '\\bcomo\\b', '\\bceno\\b', '\\bvoy\\b', '\\bsalgo\\b', '\\bvuelvo\\b', '\\bestudio\\b', '\\bhago\\b', '\\bveo\\b', '\\bme levanto\\b', '\\bme acuesto\\b', '\\bleo\\b', '\\bduermo\\b', '\\bjuego\\b', '\\bquedo\\b', '\\bcocino\\b', '\\blimpio\\b', '\\bpaseo\\b'], n: 3 },
      ],
      model: 'Entre semana me levanto temprano, pero los fines de semana me levanto a las diez. Los sábados por la mañana hago la compra y limpio la casa. Por la tarde quedo con mis amigos y a veces vamos al cine. Los domingos casi siempre juego al fútbol y por la noche veo una película. Nunca me acuesto antes de las doce.',
    },
  ],
  speaking: [
    { q: '¿A qué hora te levantas normalmente?', tr: 'Genellikle saat kaçta kalkarsın?', kw: ['me levanto', 'a las|a la'], list: ['me levanto dedim (zamiri unutmadım)', 'Saati a las … / a la una ile söyledim', 'Bir sıklık ifadesi ekledim'], model: 'Normalmente me levanto a las siete y media, pero los domingos me levanto a las diez.' },
    { q: '¿Qué haces por la tarde?', tr: 'Öğleden sonraları ne yaparsın?', kw: ['por la tarde|después|luego', 'estudio|voy|hago|trabajo|salgo|veo|vuelvo'], list: ['En az 3 eylem saydım', 'Fiilleri yo için çektim', 'Sıralama sözcüğü kullandım (primero, después, luego)'], model: 'Por la tarde primero estudio un poco y después voy al gimnasio. Luego vuelvo a casa y ceno.' },
    { q: '¿Qué haces los fines de semana?', tr: 'Hafta sonları ne yaparsın?', kw: ['los sábados|los domingos|los fines de semana', 'salgo|quedo|voy|hago|juego|veo|duermo'], list: ['los sábados / los domingos kullandım', 'En az 3 eylem saydım', 'Bir sıklık ifadesi ekledim'], model: 'Los sábados quedo con mis amigos y a veces vamos al cine. Los domingos me levanto tarde y juego al fútbol.' },
    { q: '¿Con qué frecuencia haces deporte?', tr: 'Ne sıklıkla spor yaparsın?', kw: ['hago deporte|voy al gimnasio|juego', 'veces|vez|todos los días|nunca|a veces|siempre'], list: ['Sıklığı net söyledim (… veces a la semana)', 'Hangi günler olduğunu ekledim (los lunes y los jueves)'], model: 'Hago deporte tres veces a la semana: los lunes y los miércoles voy al gimnasio y los domingos juego al fútbol.' },
    { q: '¿Qué hora es? (şu anki saati söyle)', tr: 'Saat kaç?', kw: ['es la|son las'], list: ['Es la una / Son las … ayrımını doğru yaptım', 'y / menos kullanımı doğruydu'], model: 'Son las cinco y cuarto.' },
  ],
};
