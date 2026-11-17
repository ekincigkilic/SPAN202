// Mantık testleri: node tests/run.mjs
import { regularPresent, rulePresent, gustarForm, timeEs, timeAnswers, pluralEs, feminineEs, checkAnswer, stripAccents, norm, sm2, splitVerb, participleRegular, perfecto, seImpersonal, HABER } from '../js/spanish.js';
import { CONTENT, showEs } from '../js/content.js';
import { verbPart, sharesMeaning, buildPool, conjugate, pickExam, allocate, filterPool, grade, pickFromTopic } from '../js/quiz.js';

let pass = 0, fail = 0; const groups = [];
let cur;
const group = name => { cur = { name, pass: 0, fail: 0 }; groups.push(cur); };
const ok = (cond, msg) => { if (cond) { pass++; cur.pass++; } else { fail++; cur.fail++; console.log('  ✗ ' + msg); } };
const eq = (a, b, msg) => ok(JSON.stringify(a) === JSON.stringify(b), `${msg}\n      beklenen: ${JSON.stringify(b)}\n      bulunan:  ${JSON.stringify(a)}`);

// ---------- 1. Düzenli çekim üreticisi (elle yazılmış tablolarla) ----------
group('Düzenli presente üreticisi');
eq(regularPresent('hablar'), ['hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan'], 'hablar');
eq(regularPresent('comer'), ['como', 'comes', 'come', 'comemos', 'coméis', 'comen'], 'comer');
eq(regularPresent('vivir'), ['vivo', 'vives', 'vive', 'vivimos', 'vivís', 'viven'], 'vivir');
eq(regularPresent('levantarse'), ['me levanto', 'te levantas', 'se levanta', 'nos levantamos', 'os levantáis', 'se levantan'], 'levantarse');
eq(regularPresent('leer'), ['leo', 'lees', 'lee', 'leemos', 'leéis', 'leen'], 'leer');

// ---------- 2. Düzensiz fiiller: elle girilmiş tablo <-> kural üreticisi ----------
group('Düzensiz fiiller: tablo ↔ kural');
const RULES = { // tablolardan bağımsız, ikinci kaynak
  empezar: { sc: ['e', 'ie'] }, querer: { sc: ['e', 'ie'] }, preferir: { sc: ['e', 'ie'] }, cerrar: { sc: ['e', 'ie'] }, despertarse: { sc: ['e', 'ie'] },
  dormir: { sc: ['o', 'ue'] }, volver: { sc: ['o', 'ue'] }, poder: { sc: ['o', 'ue'] }, almorzar: { sc: ['o', 'ue'] }, acostarse: { sc: ['o', 'ue'] },
  pedir: { sc: ['e', 'i'] }, repetir: { sc: ['e', 'i'] }, vestirse: { sc: ['e', 'i'] }, jugar: { sc: ['u', 'ue'] },
  hacer: { yo: 'hago' }, salir: { yo: 'salgo' }, poner: { yo: 'pongo' }, tener: { sc: ['e', 'ie'], yo: 'tengo' }, venir: { sc: ['e', 'ie'], yo: 'vengo' }, traer: { yo: 'traigo' },
};
const DOUBLE = { // tam düzensizler: çift giriş
  ir: ['voy', 'vas', 'va', 'vamos', 'vais', 'van'], ser: ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
  estar: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'], ver: ['veo', 'ves', 've', 'vemos', 'veis', 'ven'],
  saber: ['sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben'],
};
for (const v of CONTENT.verbs) {
  const forms = conjugate(v);
  ok(forms.length === 6 && forms.every(f => f && f === f.trim()), `${v.inf}: 6 biçim`);
  if (v.forms) {
    if (RULES[v.inf]) eq(v.forms, rulePresent(v.inf, RULES[v.inf]), `${v.inf}: tablo kuralla uyuşmuyor`);
    else if (DOUBLE[v.inf]) eq(v.forms, DOUBLE[v.inf], `${v.inf}: çift giriş uyuşmuyor`);
    else ok(false, `${v.inf}: düzensiz ama doğrulama kaynağı yok`);
    ok(JSON.stringify(v.forms) !== JSON.stringify(regularPresent(v.inf)), `${v.inf}: düzensiz diye işaretli ama düzenli`);
  } else ok(!RULES[v.inf] && !DOUBLE[v.inf], `${v.inf}: düzenli diye işaretli ama düzensiz listesinde`);
  // yapısal kurallar
  const { refl, stem, cls } = splitVerb(v.inf);
  const bare = forms.map(f => refl ? f.split(' ')[1] : f);
  if (refl) eq(forms.map(f => f.split(' ')[0]), ['me', 'te', 'se', 'nos', 'os', 'se'], `${v.inf}: reflexive zamirler`);
  if (!DOUBLE[v.inf]) {
    ok(bare[3] === stem + { ar: 'amos', er: 'emos', ir: 'imos' }[cls], `${v.inf}: nosotros kökü değişmemeli (${bare[3]})`);
    ok(bare[4] === stem + { ar: 'áis', er: 'éis', ir: 'ís' }[cls], `${v.inf}: vosotros aksanı/kökü (${bare[4]})`);
    ok(bare[0].endsWith('o'), `${v.inf}: yo -o ile biter`);
  }
  ok(bare[5].endsWith('n') && bare[1].endsWith('s'), `${v.inf}: tú -s, ellos -n`);
}
ok(new Set(CONTENT.verbs.map(v => v.u + v.inf)).size === CONTENT.verbs.length, 'fiil listesi ünite içinde tekrarsız');
for (const v of CONTENT.verbs) ok(CONTENT.topics[v.topic || (v.inf.endsWith('se') ? `g${v.u}-refl` : `g${v.u}-irreg`)], `fiilin konusu var: ${v.inf}`);

// ---------- 2b. Pretérito perfecto ----------
group('Pretérito perfecto: participio ve haber');
const PARTS = { // tüm participio'lar için bağımsız ikinci giriş
  hablar: 'hablado', estar: 'estado', viajar: 'viajado', trabajar: 'trabajado', estudiar: 'estudiado', probar: 'probado', visitar: 'visitado', comer: 'comido',
  vivir: 'vivido', ir: 'ido', ser: 'sido', tener: 'tenido', conocer: 'conocido', leer: 'leído', levantarse: 'levantado', perderse: 'perdido',
  hacer: 'hecho', ver: 'visto', escribir: 'escrito', decir: 'dicho', poner: 'puesto', volver: 'vuelto', abrir: 'abierto', romper: 'roto',
};
eq(HABER, ['he', 'has', 'ha', 'hemos', 'habéis', 'han'], 'haber presente');
eq(['hablar', 'comer', 'vivir', 'leer', 'traer', 'ir', 'ser'].map(participleRegular), ['hablado', 'comido', 'vivido', 'leído', 'traído', 'ido', 'sido'], 'düzenli participio üreticisi');
for (const v of CONTENT.perfectVerbs) {
  ok(PARTS[v.inf], `participio için ikinci giriş yok: ${v.inf}`);
  eq(verbPart(v), PARTS[v.inf], `participio: ${v.inf}`);
  if (v.part) ok(v.part !== participleRegular(v.inf), `düzensiz diye işaretli ama düzenli: ${v.inf}`);
  const f = perfecto(v.inf, verbPart(v));
  ok(f.length === 6 && f.every((x, i) => x === (v.inf.endsWith('se') ? ['me', 'te', 'se', 'nos', 'os', 'se'][i] + ' ' : '') + HABER[i] + ' ' + PARTS[v.inf]), `pretérito perfecto: ${v.inf}`);
}
eq(perfecto('levantarse'), ['me he levantado', 'te has levantado', 'se ha levantado', 'nos hemos levantado', 'os habéis levantado', 'se han levantado'], 'reflexive + perfecto');
eq(perfecto('hacer', 'hecho')[3], 'hemos hecho', 'hacer nosotros');
ok(new Set(CONTENT.perfectVerbs.map(v => v.inf)).size === CONTENT.perfectVerbs.length, 'perfecto fiil listesi tekrarsız');

// ---------- 3. gustar ----------
group('gustar üreticisi');
eq([0, 1, 2, 3, 4, 5].map(p => gustarForm(p, false)), ['me gusta', 'te gusta', 'le gusta', 'nos gusta', 'os gusta', 'les gusta'], 'tekil');
eq([0, 1, 2, 3, 4, 5].map(p => gustarForm(p, true)), ['me gustan', 'te gustan', 'le gustan', 'nos gustan', 'os gustan', 'les gustan'], 'çoğul');
eq(gustarForm(2, true, 'encantar'), 'le encantan', 'encantar');
for (const [thing, pl] of CONTENT.gustarThings) {
  const first = thing.split(' ')[0];
  const looksPlural = first === 'los' || first === 'las';
  ok(!!pl === looksPlural, `gustar nesnesi tekil/çoğul işareti: ${thing}`);
}

// ---------- 4. Saat ----------
group('Saat üreticisi');
const TIMES = { // elle yazılmış beklenen değerler
  '1:00': 'Es la una', '13:00': 'Es la una', '2:00': 'Son las dos', '14:15': 'Son las dos y cuarto', '6:30': 'Son las seis y media',
  '7:45': 'Son las ocho menos cuarto', '12:45': 'Es la una menos cuarto', '0:45': 'Es la una menos cuarto', '12:00': 'Son las doce', '0:00': 'Son las doce',
  '9:05': 'Son las nueve y cinco', '9:10': 'Son las nueve y diez', '9:20': 'Son las nueve y veinte', '9:25': 'Son las nueve y veinticinco',
  '9:35': 'Son las diez menos veinticinco', '9:40': 'Son las diez menos veinte', '9:50': 'Son las diez menos diez', '9:55': 'Son las diez menos cinco',
  '23:30': 'Son las once y media', '11:45': 'Son las doce menos cuarto', '1:30': 'Es la una y media', '22:00': 'Son las diez',
};
for (const [t, exp] of Object.entries(TIMES)) { const [h, m] = t.split(':').map(Number); eq(timeEs(h, m), exp, t); }
for (let h = 0; h < 24; h++) for (let m = 0; m < 60; m += 5) {
  const s = timeEs(h, m);
  ok(/^(Es la una|Son las (dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce))( (y|menos) (cinco|diez|cuarto|veinte|veinticinco|media))?$/.test(s) && !/menos media/.test(s), `biçim ${h}:${m} → ${s}`);
  ok(timeAnswers(h, m)[0] === s && new Set(timeAnswers(h, m)).size === timeAnswers(h, m).length, `cevap listesi ${h}:${m}`);
}
ok(timeAnswers(15, 0).includes('Son las tres de la tarde') && timeAnswers(15, 0).includes('Son las tres en punto'), '15:00 ekleri');
ok(timeAnswers(8, 15).includes('Son las ocho y cuarto de la mañana') && !timeAnswers(8, 15).includes('Son las ocho y cuarto de la tarde'), '8:15 ekleri');

// ---------- 5. İsimler: artikel, cinsiyet, çoğul ----------
group('İsimler: artikel / cinsiyet / çoğul');
const PL_EXC = { 'centro comercial': 'centros comerciales', 'zona peatonal': 'zonas peatonales' }; // sıfatı da çoğullanan öbekler: açık giriş
const EL_FEM = ['agua']; // vurgulu a- ile başlayan dişil isimler: el + dişil
const GENDER = { // -o / -a kuralına uymayan ya da kuralın karar veremediği isimler: bağımsız ikinci giriş
  padre: 'el', madre: 'la', mujer: 'la', jefe: 'el', 'compañero de piso': 'el', 'compañera de trabajo': 'la', 'canción': 'la', lunes: 'el', martes: 'el', 'miércoles': 'el',
  jueves: 'el', viernes: 'el', 'fin de semana': 'el', 'día': 'el', tarde: 'la', noche: 'la', 'mediodía': 'el',
  postre: 'el', pan: 'el', arroz: 'el', carne: 'la', 'jamón': 'el', leche: 'la', yogur: 'el', aceite: 'el', sal: 'la', 'azúcar': 'el', legumbre: 'la', tomate: 'el',
  'limón': 'el', chocolate: 'el', 'café': 'el', 'té': 'el', hospital: 'el', 'estación de metro': 'la', universidad: 'la', parque: 'el', cine: 'el', bar: 'el',
  restaurante: 'el', 'carril bici': 'el', ciudad: 'la', calle: 'la', puente: 'el', idioma: 'el', cualidad: 'la', habilidad: 'la', 'currículum': 'el',
};
const nouns = CONTENT.vocab.filter(v => v.type === 'n');
for (const v of nouns) {
  if (v.pl !== '-') eq(v.pl, PL_EXC[v.es] || pluralEs(v.es), `çoğul: ${v.art} ${v.es}`);
  const first = v.es.split(' ')[0];
  if (EL_FEM.includes(v.es)) ok(v.art === 'el' && v.gen === 'f', `el + dişil: ${v.es}`);
  else {
    ok(v.gen === (v.art === 'la' ? 'f' : 'm'), `gen alanı artikelle tutarlı: ${v.es}`);
    if (GENDER[v.es]) ok(GENDER[v.es] === v.art, `cinsiyet (çift giriş): ${v.es}`);
    else if (/o$/.test(first)) ok(v.art === 'el', `-o ile biten eril olmalı: ${v.es}`);
    else if (/a$/.test(first)) ok(v.art === 'la', `-a ile biten dişil olmalı: ${v.es}`);
    else ok(false, `cinsiyet doğrulaması yok: ${v.es}`);
  }
}
// kelimelerden üretilen uyum soruları: elle yazılmış beklenen değerler
{
  const P = Object.fromEntries(buildPool().map(q => [q.id, q]));
  const A = (id, exp) => eq(P[id] && P[id].a[0], exp, `üretilen uyum sorusu ${id}`);
  A('od:v7-alimentos:n:el-pan:s', 'lo'); A('od:v7-alimentos:n:la-leche:s', 'la'); A('od:v7-alimentos:n:el-agua:s', 'la');
  A('od:v7-alimentos:n:el-huevo:p', 'los'); A('od:v7-alimentos:n:la-patata:p', 'las'); A('od:v7-alimentos:n:el-limon:p', 'los');
  A('cu:v8-lugares:n:la-farmacia:0', 'alguna'); A('cu:v8-lugares:n:el-banco:0', 'algún'); A('cu:v8-lugares:n:el-cine:1', 'ningún'); A('cu:v8-lugares:n:la-biblioteca:1', 'ninguna');
  A('cu:v8-lugares:n:el-bar:2', 'algunos'); A('cu:v8-lugares:n:la-tienda:3', 'muchas'); A('cu:v8-lugares:n:la-estacion-de-metro:3', 'muchas'); A('cu:v8-lugares:n:el-hospital:3', 'muchos');
  A('pr:v8-lugares:n:el-banco:0', 'del'); A('pr:v8-lugares:n:la-universidad:0', 'de la'); A('pr:v8-lugares:n:el-parque:1', 'al'); A('pr:v8-lugares:n:la-plaza:1', 'a la');
  eq(P['od:v7-alimentos:n:el-agua:s'].q, '— ¿Y el agua? — ___ pido yo.'.replace('pido', P['od:v7-alimentos:n:el-agua:s'].q.split('___ ')[1].split(' ')[0]), 'el agua sorusunda artikel el kalır');
  ok(!P['od:v7-alimentos:n:el-pan:p'] && !P['pl:v7-alimentos:n:el-pan'], 'sayılamayan isimde çoğul sorusu üretilmez');
  eq(P['pl:v8-lugares:n:el-centro-comercial'].a[0], 'los centros comerciales', 'öbek çoğulu');
}
eq(['canción', 'mujer', 'lunes', 'sábado', 'fin de semana', 'vez', 'autobús', 'mes', 'día', 'limón', 'yogur', 'café', 'estación de metro', 'bar'].map(pluralEs), ['canciones', 'mujeres', 'lunes', 'sábados', 'fines de semana', 'veces', 'autobuses', 'meses', 'días', 'limones', 'yogures', 'cafés', 'estaciones de metro', 'bares'], 'çoğul kuralı örnekleri');

// ---------- 6. Sıfatlar ----------
group('Sıfatlar: eril / dişil');
const FEM_EXC = { joven: 'joven', mayor: 'mayor' }; // -or ama değişmez: mayor
const adjs = CONTENT.vocab.filter(v => v.type === 'adj');
for (const v of adjs) eq(v.f, FEM_EXC[v.es] ?? feminineEs(v.es), `dişil: ${v.es}`);
eq(['trabajador', 'simpático', 'alegre', 'hablador'].map(feminineEs), ['trabajadora', 'simpática', 'alegre', 'habladora'], 'dişil kuralı örnekleri');

// ---------- 7. Cevap kontrolü (aksan modu) ----------
group('Cevap kontrolü: strict / lenient');
eq(checkAnswer('estás', ['estás'], true).ok, true, 'tam doğru');
eq(checkAnswer('estas', ['estás'], true), { ok: false, accentOnly: true, expected: 'estás' }, 'strict: aksansız yanlış');
eq(checkAnswer('estas', ['estás'], false), { ok: true, accentOnly: true, expected: 'estás' }, 'lenient: doğru + uyarı');
eq(checkAnswer('manana', ['mañana'], false).ok, false, 'ñ aksan sayılmaz, harf hatasıdır');
eq(checkAnswer('  ¿Te gustan los conciertos?  ', ['Te gustan los conciertos'], true).ok, true, 'noktalama/boşluk yok sayılır');
eq(checkAnswer('me levanto a las siete', ['Me levanto a las siete.'], true).ok, true, 'büyük harf yok sayılır');
eq(checkAnswer('Yo me levanto a las siete', ['Me levanto a las siete.'], true, { dropYo: true }).ok, true, 'çeviride baştaki yo kabul');
eq(checkAnswer('', ['también'], false).ok, false, 'boş cevap');
eq(checkAnswer('tu', ['tú'], true).ok, false, 'tu/tú strict');
eq(stripAccents('Añadís miércoles'), 'Añadis miercoles', 'stripAccents ñ korur');

// ---------- 8. İçerik bütünlüğü ----------
group('İçerik bütünlüğü');
const pool = buildPool();
const ids = new Set();
for (const q of pool) { ok(!ids.has(q.id), `soru kimliği tekrar: ${q.id}`); ids.add(q.id); }
const vids = new Set();
for (const v of CONTENT.vocab) { ok(!vids.has(v.id), `kelime kimliği tekrar: ${v.id}`); vids.add(v.id); ok(v.es && v.tr && v.es === v.es.normalize('NFC'), `kelime alanları: ${v.id}`); }
const verbByInf = Object.fromEntries(CONTENT.verbs.map(v => [v.inf, v]));
for (const q of pool) {
  ok(CONTENT.topics[q.topic], `konu yok: ${q.id} → ${q.topic}`);
  ok(q.a.length && q.a.every(a => a && a === a.trim() && !/\s\s/.test(a) && a === a.normalize('NFC')), `cevap biçimi: ${q.id}`);
  if (q.opts) {
    ok(new Set(q.opts.map(norm)).size === q.opts.length && q.opts.length >= 2, `seçenekler tekrarsız: ${q.id}`);
    ok(q.opts.includes(q.a[0]), `doğru cevap seçeneklerde: ${q.id}`);
    if (q.type === 'mc') ok(q.opts.length === 4, `4 seçenek: ${q.id}`);
  }
  if (q.type === 'fill') {
    ok((q.q.match(/___/g) || []).length === 1, `tek boşluk: ${q.id}`);
    // "(infinitivo)" ipucu varsa cevap o fiilin çekim tablosunda olmalı
    const m = [...q.q.matchAll(/\(([a-záéíñ]+(?:ar|er|ir)(?:se)?)(?:,[^)]*)?\)/g)].pop();
    if (m) {
      const inf = m[1], ans = q.a[0].toLowerCase();
      const pv = CONTENT.perfectVerbs.find(v => v.inf === inf);
      if (['gustar', 'encantar', 'interesar'].includes(inf)) ok(new RegExp(`^(me|te|le|nos|os|les) ${inf.slice(0, -2)}an?$`).test(ans), `gustar tipi cevap: ${q.id}`);
      else if (/\b(he|has|ha|hemos|habéis|han)\b/.test(ans)) ok(pv && perfecto(inf, PARTS[inf]).includes(ans), `cevap pretérito perfecto tablosunda yok: ${q.id} (${ans})`);
      else if (ans.startsWith('se ') && !inf.endsWith('se')) {
        const forms = verbByInf[inf] ? conjugate(verbByInf[inf]) : regularPresent(inf);
        const [before, after] = q.q.split('___').map(x => x.trim());
        const plural = /^(muchos|muchas|los|las)\b/.test(after) || (!/^(mucho|mucha|el|la)\b/.test(after) && /^(Los|Las)\b/.test(before));
        eq(ans, seImpersonal(forms, plural), `se impersonal uyumu: ${q.id}`);
      }
      else if (verbByInf[inf]) ok(conjugate(verbByInf[inf]).includes(ans), `cevap çekim tablosunda yok: ${q.id} (${ans})`);
      else ok(false, `ipucundaki fiil fiil listesinde yok: ${inf} (${q.id})`);
    }
  }
  if (q.type === 'order') {
    const key = s => norm(s).split(' ').sort().join(' ');
    ok(q.a.every(a => key(a) === key(q.a[0])), `sıralama alternatifleri aynı kelimelerden oluşmalı: ${q.id}`);
    ok(q.a[0].split(' ').length >= 4, `sıralama en az 4 kelime: ${q.id}`);
  }
  // her sorunun kendi doğru cevabı strict modda doğru sayılmalı
  ok(q.a.every(a => grade(q, a, true).ok), `kendi cevabı kabul edilmiyor: ${q.id}`);
}
// gustar boşluk doldurma: gusta/gustan uyumu cümledeki nesneyle tutarlı mı?
for (const q of pool.filter(q => q.type === 'fill' && /\((gustar|encantar|interesar)\)/.test(q.q))) {
  const after = q.q.split('___')[1].trim().split(' ')[0];
  const plural = after === 'los' || after === 'las';
  ok(/an$/.test(q.a[0]) === plural, `gusta/gustan uyumu: ${q.id}`);
}
for (const q of pool.filter(q => q.type === 'vocab')) {
  const v = CONTENT.vocab.find(v => v.id === q.vid);
  const others = CONTENT.vocab.filter(o => o.id !== v.id && o.cat === v.cat && (q.id.startsWith('vq:es:') ? q.opts.includes(o.tr) : q.opts.includes(showEs(o))));
  ok(others.every(o => !sharesMeaning(o.tr, v.tr)), `çeldirici doğru cevapla eş anlamlı: ${q.id}`);
}
for (const w of CONTENT.writing) {
  const text = stripAccents(w.model.toLowerCase());
  const words = w.model.trim().split(/\s+/).length;
  ok(words >= w.min && words <= w.max, `örnek metin uzunluğu ${w.id}: ${words}`);
  for (const c of w.checks) {
    let hit;
    if (c.re) hit = new RegExp(c.re).test(text);
    else if (c.count) hit = (text.match(new RegExp(c.count, 'g')) || []).length >= c.n;
    else if (c.reAll) hit = c.reAll.filter(r => new RegExp(r).test(text)).length >= c.n;
    else hit = true; // kelime sayımı uygulama içinde test edilir
    ok(hit, `örnek metin kendi ölçütünü karşılamıyor ${w.id}: ${c.label}`);
  }
}
for (const t of Object.values(CONTENT.topics)) ok(pool.some(q => q.topic === t.id), `konunun sorusu yok: ${t.id}`);

// ---------- 9. Seçim ve SM-2 ----------
group('Soru seçimi ve SM-2');
eq(allocate(30, { 5: 50, 6: 50 }), { 5: 15, 6: 15 }, 'midterm dağılımı');
for (let i = 0; i < 20; i++) {
  const W = { 5: 17.5, 6: 17.5, 7: 22, 8: 22, 9: 21 };
  const ex = pickExam(pool, 40, W);
  const per = u => ex.filter(q => q.u === u).length;
  ok(ex.length === 40 && new Set(ex.map(q => q.id)).size === 40, 'final denemesi: 40 tekrarsız soru');
  eq([5, 6, 7, 8, 9].map(per), [7, 7, 9, 9, 8], 'final denemesi: ünite dağılımı');
  ok((per(7) + per(8) + per(9)) / 40 === 0.65, 'final denemesi: Ü7–9 payı %65');
  ok(new Set(ex.map(q => q.topic)).size >= 20, 'final denemesi: konu çeşitliliği');
}
ok(pickExam(filterPool(pool, { units: [5, 6] }), 30, { 5: 50, 6: 50 }).every(q => q.u <= 6), 'midterm denemesinde yalnızca Ü5–6');
eq(allocate(40, { 5: 17.5, 6: 17.5, 7: 22, 8: 22, 9: 21 }), { 5: 7, 6: 7, 7: 9, 8: 9, 9: 8 }, 'final dağılımı (7-8-9 = %65)');
ok(Object.values(allocate(33, { 5: 1, 6: 1, 7: 1 })).reduce((a, b) => a + b) === 33, 'dağılım toplamı');
for (let i = 0; i < 20; i++) {
  const ex = pickExam(filterPool(pool, { units: [5, 6] }), 30, { 5: 50, 6: 50 });
  ok(ex.length === 30 && new Set(ex.map(q => q.id)).size === 30, 'deneme: 30 tekrarsız soru');
  ok(ex.filter(q => q.u === 5).length === 15, 'deneme: ünite dağılımı 15/15');
  ok(new Set(ex.map(q => q.topic)).size >= 12, 'deneme: konu çeşitliliği');
}
{
  const qs = filterPool(pool, { topics: ['v5-familia'] }).map((q, i) => i % 10 === 0 ? { ...q, src: 'book' } : q);
  let book = 0, tot = 0;
  for (let i = 0; i < 200; i++) for (const q of pickFromTopic(qs, 5)) { tot++; if (q.src === 'book') book++; }
  ok(book / tot > 0.15, `"kitaptan" önceliği: havuzda %10, seçimde %${Math.round(100 * book / tot)}`);
}
let c = sm2({}, 4, 100); eq([c.reps, c.int, c.due], [1, 1, 101], 'SM-2 ilk tekrar');
c = sm2(c, 4, 101); eq([c.reps, c.int], [2, 6], 'SM-2 ikinci tekrar');
c = sm2(c, 5, 107); ok(c.int > 6 && c.ef > 2.5, 'SM-2 aralık büyür');
c = sm2(c, 1, 130); eq([c.reps, c.int], [0, 1], 'SM-2 unutunca sıfırlanır'); ok(c.ef >= 1.3, 'SM-2 EF alt sınırı');

// ---------- Rapor ----------
console.log('\nTEST RAPORU');
for (const g of groups) console.log(`  ${g.fail ? '✗' : '✓'} ${g.name}: ${g.pass} geçti${g.fail ? ', ' + g.fail + ' KALDI' : ''}`);
const types = {}; for (const q of pool) types[q.type] = (types[q.type] || 0) + 1;
console.log(`\nİçerik: ${CONTENT.vocab.length} kelime/kalıp, ${CONTENT.verbs.length} fiil, ${Object.keys(CONTENT.topics).length} konu, ${pool.length} soru`);
console.log('Soru tipleri: ' + Object.entries(types).map(([k, v]) => `${k} ${v}`).join(', '));
for (const u of Object.keys(CONTENT.units)) console.log(`  Ünite ${u}: ${CONTENT.vocab.filter(v => v.u === +u).length} kelime, ${pool.filter(q => q.u === +u).length} soru`);
console.log(`\nTOPLAM: ${pass} geçti, ${fail} kaldı`);
process.exit(fail ? 1 : 0);
