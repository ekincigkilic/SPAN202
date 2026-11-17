// Dil motoru: çekim üreticileri, saat, gustar, çoğul/dişil kuralları, cevap kontrolü.
// Tarayıcıda ve Node testlerinde aynı dosya kullanılır.

export const PERSONS = ['yo', 'tú', 'él / ella / usted', 'nosotros/as', 'vosotros/as', 'ellos / ellas / ustedes'];
export const REFL = ['me', 'te', 'se', 'nos', 'os', 'se'];
export const IO = ['me', 'te', 'le', 'nos', 'os', 'les'];
export const A_PREP = ['a mí', 'a ti', 'a él / ella / usted', 'a nosotros/as', 'a vosotros/as', 'a ellos / ellas / ustedes'];

const END = {
  ar: ['o', 'as', 'a', 'amos', 'áis', 'an'],
  er: ['o', 'es', 'e', 'emos', 'éis', 'en'],
  ir: ['o', 'es', 'e', 'imos', 'ís', 'en'],
};

export function splitVerb(inf) {
  const refl = inf.endsWith('se');
  const base = refl ? inf.slice(0, -2) : inf;
  return { refl, base, stem: base.slice(0, -2), cls: base.slice(-2) };
}

/** Düzenli presente de indicativo. Dönüşlü fiillerde zamir eklenir. */
export function regularPresent(inf) {
  const { refl, stem, cls } = splitVerb(inf);
  return END[cls].map((e, i) => (refl ? REFL[i] + ' ' : '') + stem + e);
}

/**
 * Kural tabanlı düzensiz presente: kök değişimi (yo, tú, él, ellos) + düzensiz "yo".
 * spec: { sc: ['e','ie'] | ['o','ue'] | ['e','i'] | ['u','ue'], yo: 'tengo' }
 */
export function rulePresent(inf, spec = {}) {
  const { refl, stem, cls } = splitVerb(inf);
  let changed = stem;
  if (spec.sc) {
    const i = stem.lastIndexOf(spec.sc[0]);
    if (i < 0) throw new Error('kök değişimi uygulanamadı: ' + inf);
    changed = stem.slice(0, i) + spec.sc[1] + stem.slice(i + spec.sc[0].length);
  }
  return END[cls].map((e, i) => {
    let form = ([0, 1, 2, 5].includes(i) ? changed : stem) + e;
    if (i === 0 && spec.yo) form = spec.yo;
    return (refl ? REFL[i] + ' ' : '') + form;
  });
}

/** gustar tipi fiiller: kişi (0-5) + şeyin tekil/çoğul olması -> "me gusta" / "nos gustan" */
export function gustarForm(person, plural, verb = 'gustar') {
  const stem = verb.slice(0, -2);
  return IO[person] + ' ' + stem + (plural ? 'an' : 'a');
}

const NUM = ['', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce'];
const MIN = { 5: 'cinco', 10: 'diez', 15: 'cuarto', 20: 'veinte', 25: 'veinticinco', 30: 'media' };

/** 24 saatlik saat -> "Son las dos y cuarto". Dakika 5'in katı olmalı. */
export function timeEs(h, m) {
  if (m % 5 !== 0) throw new Error('dakika 5\'in katı olmalı');
  let hh = h % 12 || 12;
  let tail = '';
  if (m > 30) { hh = (hh % 12) + 1; tail = ' menos ' + MIN[60 - m]; }
  else if (m > 0) tail = ' y ' + MIN[m];
  return (hh === 1 ? 'Es la una' : 'Son las ' + NUM[hh]) + tail;
}

/** Günün bölümü ekleri (kabul edilen isteğe bağlı ekler). */
export function dayPartEs(h) {
  if (h === 0) return ['de la noche'];
  if (h <= 5) return ['de la madrugada', 'de la mañana'];
  if (h <= 11) return ['de la mañana'];
  if (h === 12) return ['del mediodía', 'de la mañana', 'de la tarde'];
  if (h <= 19) return ['de la tarde'];
  if (h === 20) return ['de la tarde', 'de la noche'];
  return ['de la noche'];
}

/** Bir saat için kabul edilen tüm cevaplar. */
export function timeAnswers(h, m) {
  const base = timeEs(h, m);
  const out = [base];
  if (m === 0) out.push(base + ' en punto');
  const parts = new Set([...dayPartEs(h), ...(m > 30 ? dayPartEs((h + 1) % 24) : [])]);
  for (const p of parts) out.push(base + ' ' + p);
  return out;
}

const VOWELS = 'aeiouáéíóú';
const UNACCENT = { á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u' };

/** Kural tabanlı çoğul (tek kelime ya da "kelime de ..." öbeği; ilk kelime çoğullanır). */
export function pluralEs(noun) {
  const sp = noun.indexOf(' ');
  if (sp > 0) return pluralEs(noun.slice(0, sp)) + noun.slice(sp);
  const last = noun.slice(-1);
  if ('aeioué'.includes(last)) return noun + 's';
  if (last === 'z') return noun.slice(0, -1) + 'ces';
  const prev = noun.slice(-2, -1);
  if (last === 's' && !UNACCENT[prev] && countVowelGroups(noun) > 1) return noun; // el lunes -> los lunes
  if ((last === 'n' || last === 's') && UNACCENT[prev]) return noun.slice(0, -2) + UNACCENT[prev] + last + 'es'; // canción -> canciones
  return noun + 'es';
}
function countVowelGroups(w) {
  let n = 0, inV = false;
  for (const ch of w) { const v = VOWELS.includes(ch); if (v && !inV) n++; inV = v; }
  return n;
}

/** Kural tabanlı dişil sıfat. */
export function feminineEs(adj) {
  if (adj.endsWith('o')) return adj.slice(0, -1) + 'a';
  if (adj.endsWith('or')) return adj + 'a';
  const m = adj.match(/([áéíó])n$/);
  if (m) return adj.slice(0, -2) + UNACCENT[m[1]] + 'na';
  return adj;
}

// ---------- Cevap kontrolü ----------

/** Aksanları kaldırır; ñ ayrı bir harf olduğu için korunur. */
export function stripAccents(s) {
  return s.replace(/ñ/g, '\u0001').replace(/Ñ/g, '\u0002')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\u0001/g, 'ñ').replace(/\u0002/g, 'Ñ').normalize('NFC');
}

/** Büyük/küçük harf, noktalama ve fazla boşluk farklarını yok sayar. */
export function norm(s) {
  return String(s).normalize('NFC').toLowerCase()
    .replace(/[¿?¡!.,;:"“”«»()—–-]/g, ' ')
    .replace(/[’']/g, '')
    .replace(/\s+/g, ' ').trim();
}

/**
 * @returns {{ok:boolean, accentOnly:boolean, expected:string}}
 * strict: aksan hatası yanlış. lenient: doğru sayılır, accentOnly=true ile uyarı verilir.
 */
export function checkAnswer(user, answers, strict, opts = {}) {
  let u = norm(user);
  const cands = [u];
  if (opts.dropYo) cands.push(u.replace(/^(yo|nosotros|nosotras) /, ''));
  const list = answers.map(norm);
  const expected = answers[0];
  if (cands.some(c => list.includes(c))) return { ok: true, accentOnly: false, expected };
  const flat = list.map(stripAccents);
  if (u && cands.some(c => flat.includes(stripAccents(c)))) return { ok: !strict, accentOnly: true, expected };
  return { ok: false, accentOnly: false, expected };
}

// ---------- SM-2 ----------

export function dayNum(d = new Date()) {
  return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000);
}

/** q: 1 (tekrar), 3 (zor), 4 (iyi), 5 (kolay) */
export function sm2(card, q, today = dayNum()) {
  const c = { ef: 2.5, int: 0, reps: 0, ...card };
  if (q < 3) { c.reps = 0; c.int = 1; }
  else {
    c.reps += 1;
    c.int = c.reps === 1 ? 1 : c.reps === 2 ? 6 : Math.round(c.int * c.ef);
    if (q === 3 && c.reps > 2) c.int = Math.max(1, Math.round(c.int * 0.6));
  }
  c.ef = Math.max(1.3, c.ef + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  c.due = today + c.int;
  return c;
}

// ---------- Pretérito perfecto ----------

export const HABER = ['he', 'has', 'ha', 'hemos', 'habéis', 'han'];

/** Düzenli participio: -ar -> -ado, -er/-ir -> -ido (kök ünlüyle bitiyorsa -ído: leído, traído). */
export function participleRegular(inf) {
  const { stem, cls } = splitVerb(inf);
  if (cls === 'ar') return stem + 'ado';
  return stem + (/[aeo]$/.test(stem) ? 'ído' : 'ido');
}

/** Pretérito perfecto: haber + participio; dönüşlü zamir haber'den önce gelir. */
export function perfecto(inf, part = participleRegular(inf)) {
  const { refl } = splitVerb(inf);
  return HABER.map((h, i) => (refl ? REFL[i] + ' ' : '') + h + ' ' + part);
}

/** se impersonal: se + 3. tekil / 3. çoğul. forms: fiilin presente tablosu. */
export function seImpersonal(forms, plural) { return 'se ' + forms[plural ? 5 : 2]; }
