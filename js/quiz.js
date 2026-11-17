// Soru havuzu: elle yazılmış sorular + içerikten üretilen sorular. Seçim ve değerlendirme.
import { CONTENT, showEs } from './content.js';
import { PERSONS, A_PREP, regularPresent, gustarForm, timeEs, timeAnswers, checkAnswer, participleRegular, perfecto } from './spanish.js';

export const TYPE_LABEL = {
  mc: 'Çoktan seçmeli', fill: 'Boşluk doldurma', conj: 'Fiil çekimi', tr: 'Çeviri (TR→ES)', order: 'Cümle sıralama',
  art: 'Artikel', plural: 'Çoğul', fem: 'Dişil biçim', vocab: 'Kelime', hora: 'Saat',
  part: 'Participio', od: 'Pronombre de OD', cuant: 'Cuantificador (uyum)', prep: 'a / de + artikel',
};

export function conjugate(verb) { return verb.forms || regularPresent(verb.inf); }
export const verbTopic = v => v.topic || (v.inf.endsWith('se') ? `g${v.u}-refl` : `g${v.u}-irreg`);
export const verbPart = v => v.part || participleRegular(v.inf);
const isFem = v => (v.gen || (v.art === 'la' ? 'f' : 'm')) === 'f';

const rnd = n => Math.floor(Math.random() * n);
export function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/** Türkçe karşılıkları ortak bir anlam içeren kelimeler birbirine çeldirici olamaz (después / luego gibi). */
export function sharesMeaning(a, b) {
  const parts = x => x.toLowerCase().replace(/\(.*?\)/g, '').split(/[,/]/).map(t => t.trim()).filter(Boolean);
  const pb = parts(b);
  return parts(a).some(t => pb.includes(t));
}

function vocabQuestions(vocab) {
  const out = [];
  const byCat = {};
  for (const v of vocab) (byCat[v.cat] ||= []).push(v);
  for (const v of vocab) {
    const base = { u: v.u, topic: v.cat, src: v.src, unsure: !!v.unsure, vid: v.id };
    const pool = byCat[v.cat].filter(o => o.id !== v.id && o.es !== v.es && !sharesMeaning(o.tr, v.tr));
    const same = pool.filter(o => o.type === v.type);
    const pick = shuffle(same.length >= 3 ? same : pool).slice(0, 3);
    if (pick.length === 3) {
      out.push({ ...base, id: `vq:es:${v.id}`, type: 'vocab', q: `«${showEs(v)}» ne demek?`, opts: [v.tr, ...pick.map(o => o.tr)], a: [v.tr] });
      out.push({ ...base, id: `vq:tr:${v.id}`, type: 'vocab', q: `«${v.tr}» İspanyolcada hangisi?`, opts: [showEs(v), ...pick.map(showEs)], a: [showEs(v)] });
    }
    if (v.type === 'n') {
      out.push({ ...base, id: `art:${v.id}`, type: 'art', q: `___ ${v.es}`, hint: v.tr, opts: ['el', 'la'], a: [v.art], fixed: true });
      if (v.pl !== '-') out.push({ ...base, id: `pl:${v.id}`, type: 'plural', q: `Çoğulunu artikeliyle yaz: ${v.art} ${v.es}`, a: [`${isFem(v) ? 'las' : 'los'} ${v.pl}`] });
    }
    if (v.type === 'adj') out.push({ ...base, id: `fem:${v.id}`, type: 'fem', q: `Dişil biçimini yaz: ${v.es}`, hint: v.tr, a: [v.f] });
  }
  return out;
}

function conjQuestions(verbs) {
  const out = [];
  for (const v of verbs) {
    const forms = conjugate(v);
    const topic = verbTopic(v);
    forms.forEach((f, i) => out.push({
      id: `conj${v.u === 6 ? '' : v.u}:${v.inf}:${i}`, u: v.u, topic, type: 'conj', src: 'gen',
      q: `${v.inf} → ${PERSONS[i]}`, hint: `${v.tr} · ${v.grp}`, a: [f],
    }));
  }
  return out;
}

function perfectoQuestions(list) {
  const out = [];
  for (const v of list) {
    const part = verbPart(v), irregular = !!v.part;
    perfecto(v.inf, part).forEach((f, i) => out.push({
      id: `pp:${v.inf}:${i}`, u: v.u, topic: 'g9-perfecto', type: 'conj', src: 'gen',
      q: `${v.inf} → ${PERSONS[i]} (pretérito perfecto)`, hint: `${v.tr} · participio ${irregular ? 'düzensiz' : 'düzenli'}`, a: [f],
    }));
    if (!v.inf.endsWith('se')) out.push({ id: `part:${v.inf}`, u: v.u, topic: 'g9-perfecto', type: 'part', src: 'gen', q: `Participio: ${v.inf}`, hint: v.tr, a: [part] });
  }
  return out;
}

/** Ünite 7 ve 8'in kelimelerinden üretilen uyum soruları. */
function agreementQuestions(vocab) {
  const out = [];
  const OD_T = [['compro', 'yo'], ['traigo', 'yo'], ['preparo', 'yo'], ['pido', 'yo']];
  vocab.filter(v => v.type === 'n' && v.cat === 'v7-alimentos').forEach((v, k) => {
    const base = { u: 7, topic: 'g7-od', type: 'od', src: v.src, vid: v.id, opts: ['lo', 'la', 'los', 'las'], fixed: true };
    const [verb] = OD_T[k % OD_T.length];
    out.push({ ...base, id: `od:${v.id}:s`, q: `— ¿Y ${v.art} ${v.es}? — ___ ${verb} yo.`, a: [isFem(v) ? 'la' : 'lo'] });
    if (v.pl !== '-') out.push({ ...base, id: `od:${v.id}:p`, q: `— ¿Y ${isFem(v) ? 'las' : 'los'} ${v.pl}? — ___ ${verb} yo.`, a: [isFem(v) ? 'las' : 'los'] });
  });
  vocab.filter(v => v.type === 'n' && v.cat === 'v8-lugares').forEach(v => {
    const f = isFem(v), cu = { u: 8, topic: 'g8-cuant', type: 'cuant', src: v.src, vid: v.id };
    out.push({ ...cu, id: `cu:${v.id}:0`, q: `¿Hay ___ ${v.es} por aquí?`, hint: 'algún / alguna / algunos / algunas', a: [f ? 'alguna' : 'algún'] });
    out.push({ ...cu, id: `cu:${v.id}:1`, q: `En mi barrio no hay ___ ${v.es}.`, hint: 'ningún / ninguna', a: [f ? 'ninguna' : 'ningún'] });
    if (v.pl !== '-') {
      out.push({ ...cu, id: `cu:${v.id}:2`, q: `En el centro hay ___ ${v.pl}.`, hint: 'algunos / algunas', a: [f ? 'algunas' : 'algunos'] });
      out.push({ ...cu, id: `cu:${v.id}:3`, q: `En mi ciudad hay ___ ${v.pl}.`, hint: 'mucho / mucha / muchos / muchas', a: [f ? 'muchas' : 'muchos'] });
    }
    const pr = { u: 8, topic: 'g8-prep', type: 'prep', src: v.src, vid: v.id, fixed: true };
    out.push({ ...pr, id: `pr:${v.id}:0`, q: `Mi casa está cerca ___ ${v.es}.`, opts: ['del', 'de la', 'de los', 'de las'], a: [f ? 'de la' : 'del'] });
    out.push({ ...pr, id: `pr:${v.id}:1`, q: `Ahora voy ___ ${v.es}.`, opts: ['al', 'a la'], a: [f ? 'a la' : 'al'] });
  });
  return out;
}

function gustarQuestions(things) {
  const out = [];
  for (let p = 0; p < 6; p++) things.forEach(([thing, pl], k) => out.push({
    id: `gus:${p}:${k}`, u: 5, topic: 'g5-gustar', type: 'conj', src: 'gen',
    q: `(${A_PREP[p]}) ___ ${thing}`, hint: 'gustar: zamir + gusta / gustan', a: [gustarForm(p, !!pl)],
  }));
  return out;
}

function horaQuestions() {
  const out = [];
  const clock = (h, m) => `${h}:${String(m).padStart(2, '0')}`;
  for (let h = 0; h < 24; h++) for (let m = 0; m < 60; m += 5) {
    out.push({ id: `hora:w:${h}:${m}`, u: 6, topic: 'g6-hora', type: 'hora', src: 'gen', q: `Saat ${clock(h, m)}. ¿Qué hora es?`, hint: 'Günün bölümünü (de la tarde…) yazmak isteğe bağlı.', a: timeAnswers(h, m) });
    if (h >= 1 && h <= 12 && m % 15 === 0) {
      const wrong = shuffle([[h, (m + 15) % 60], [h, (m + 30) % 60], [(h % 12) + 1, m], [h === 1 ? 12 : h - 1, m], [h, (m + 45) % 60]])
        .map(([a, b]) => clock(a, b)).filter((c, i, arr) => c !== clock(h, m) && arr.indexOf(c) === i).slice(0, 3);
      out.push({ id: `hora:r:${h}:${m}`, u: 6, topic: 'g6-hora', type: 'mc', src: 'gen', q: `«${timeEs(h, m)}» hangi saat?`, opts: [clock(h, m), ...wrong], a: [clock(h, m)] });
    }
  }
  return out;
}

/** Tüm havuz. extraVocab: kullanıcının eklediği "kitaptan" kelimeler. */
export function buildPool(extraVocab = []) {
  const vocab = [...CONTENT.vocab, ...extraVocab];
  return [
    ...CONTENT.questions,
    ...vocabQuestions(vocab),
    ...conjQuestions(CONTENT.verbs),
    ...perfectoQuestions(CONTENT.perfectVerbs),
    ...agreementQuestions(vocab),
    ...gustarQuestions(CONTENT.gustarThings),
    ...horaQuestions(),
  ];
}

export function filterPool(pool, { units, topics, src = 'all', types } = {}) {
  return pool.filter(q =>
    (!units || units.includes(q.u)) && (!topics || topics.includes(q.topic)) && (!types || types.includes(q.type)) &&
    (src === 'all' || (src === 'book' ? q.src === 'book' : src === 'sure' ? !q.unsure : q.src === 'gen')));
}

/** Bir konudan n soru: önce soru tipi dengelenir, tip içinde "kitaptan" ve daha önce yanlış yapılanlar önceliklidir. */
export function pickFromTopic(qs, n, { errors = {}, bookBoost = 3 } = {}) {
  const byType = {};
  for (const q of qs) (byType[q.type] ||= []).push(q);
  const types = shuffle(Object.keys(byType));
  const chosen = [], used = new Set();
  const w = q => (q.src === 'book' ? bookBoost : 1) * (errors[q.id] ? 2 : 1);
  let guard = 0;
  while (chosen.length < n && used.size < qs.length && guard++ < n * 20) {
    const t = types[guard % types.length];
    const cand = byType[t].filter(q => !used.has(q.id));
    if (!cand.length) continue;
    let r = Math.random() * cand.reduce((s, q) => s + w(q), 0), pick = cand[0];
    for (const q of cand) { r -= w(q); if (r <= 0) { pick = q; break; } }
    used.add(pick.id); chosen.push(pick);
  }
  return chosen;
}

/** Ağırlıkları n soruya dağıtır (en büyük kalan yöntemi). weights: {unit: sayı} */
export function allocate(n, weights) {
  const keys = Object.keys(weights).filter(k => weights[k] > 0);
  const total = keys.reduce((s, k) => s + weights[k], 0);
  const raw = keys.map(k => ({ k, x: n * weights[k] / total }));
  const out = {}; let left = n;
  for (const r of raw) { out[r.k] = Math.floor(r.x); left -= out[r.k]; }
  raw.sort((a, b) => (b.x % 1) - (a.x % 1));
  for (let i = 0; i < left; i++) out[raw[i % raw.length].k]++;
  return out;
}

/** Deneme sınavı seçimi: ünite ağırlığına göre, ünite içinde konular arasında dengeli. */
export function pickExam(pool, n, weights, opts = {}) {
  const alloc = allocate(n, weights);
  let out = [];
  for (const [u, cnt] of Object.entries(alloc)) {
    const qs = pool.filter(q => q.u === +u);
    const byTopic = {};
    for (const q of qs) (byTopic[q.topic] ||= []).push(q);
    const topics = shuffle(Object.keys(byTopic));
    if (!topics.length) continue;
    const per = allocate(cnt, Object.fromEntries(topics.map(t => [t, CONTENT.topics[t]?.kind === 'g' ? 2 : 1])));
    for (const t of topics) out.push(...pickFromTopic(byTopic[t], per[t] || 0, opts));
  }
  return shuffle(out);
}

/** Soruyu ekrana hazırlar (seçenek karıştırma, kelime kutucukları). */
export function present(q) {
  const p = { ...q };
  if (q.opts) p.shown = q.fixed ? q.opts.slice() : shuffle(q.opts);
  if (q.type === 'order') p.tokens = shuffle(q.a[0].split(' '));
  return p;
}

/** @returns {{ok, accentOnly, expected}} */
export function grade(q, answer, strict) {
  if (q.opts) return { ok: answer === q.a[0], accentOnly: false, expected: q.a[0] };
  return checkAnswer(answer, q.a, strict, { dropYo: q.type === 'tr' });
}
