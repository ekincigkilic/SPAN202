// İçerik deposu. Her ünite dosyası (u5.js, u6.js …) aynı kısa biçimi kullanır; burada açılır.
// Kaynak etiketi: src = 'gen' (üretildi) | 'book' (kitaptan). unsure = kitaptaki kapsamı belirsiz.
import { U5 } from './data/u5.js';
import { U6 } from './data/u6.js';
import { U7 } from './data/u7.js';
import { U8 } from './data/u8.js';
import { U9 } from './data/u9.js';

export const UNIT_DEFS = [U5, U6, U7, U8, U9];

export const UNIT_META = {
  5: { title: 'Tus amigos son mis amigos', ready: true },
  6: { title: 'Día a día', ready: true },
  7: { title: '¡A comer!', ready: true },
  8: { title: 'El barrio ideal', ready: true },
  9: { title: '¿Sabes conducir?', ready: true },
};

const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9ñ]+/g, '-').replace(/^-|-$/g, '');

/** "el padre; padres; baba" | "simpático; simpática; sempatik" | "cantar; şarkı söylemek" */
export function parseVocab(line, type, u, cat, extra = {}) {
  const p = line.split(';').map(s => s.trim());
  let v;
  if (type === 'n') {
    // "el agua (f); -; su": (f) = el ile kullanılan dişil isim, "-" = çoğulu kullanılmaz
    const m = p[0].match(/^(el|la) (.+?)( \(f\))?$/);
    if (!m || p.length !== 3) throw new Error('isim biçimi hatalı: ' + line);
    v = { art: m[1], es: m[2], gen: m[3] || m[1] === 'la' ? 'f' : 'm', pl: p[1], tr: p[2] };
  } else if (type === 'adj') {
    if (p.length !== 3) throw new Error('sıfat biçimi hatalı: ' + line);
    v = { es: p[0], f: p[1], tr: p[2] };
  } else {
    if (p.length !== 2) throw new Error('kalıp biçimi hatalı: ' + line);
    v = { es: p[0], tr: p[1] };
  }
  return { id: `${cat}:${type}:${slug((v.art ? v.art + ' ' : '') + v.es)}`, u, cat, type, src: 'gen', ...v, ...extra };
}

/** Kelimenin kartta/soruda görünen İspanyolca biçimi. */
export function showEs(v) {
  if (v.type === 'n') return `${v.art} ${v.es}`;
  if (v.type === 'adj') return v.f === v.es ? v.es : `${v.es} / ${v.f}`;
  return v.es;
}

function parseQ(type, line, i, topic, u) {
  const p = line.split('|').map(s => s.trim());
  const base = { id: `${topic.id}#${type}${i}`, u, topic: topic.id, type, src: 'gen' };
  if (type === 'mc') return { ...base, q: p[0], opts: p.slice(1), a: [p[1]] };
  if (type === 'order') return { ...base, q: 'Kelimeleri doğru sıraya diz.', a: p };
  return { ...base, q: p[0], a: p.slice(1) }; // fill, tr
}

function build() {
  const units = {}, topics = {}, vocab = [], questions = [], verbs = [], writing = [], speaking = [], perfectVerbs = [];
  for (const U of UNIT_DEFS) {
    units[U.u] = { u: U.u, title: U.title, topicIds: [] };
    for (const g of U.grammar) {
      const t = { id: g.id, u: U.u, kind: 'g', title: g.title, html: g.html, examples: g.examples || [], unsure: g.unsure || '' };
      topics[t.id] = t; units[U.u].topicIds.push(t.id);
      for (const type of ['mc', 'fill', 'tr', 'order'])
        (g[type] || []).forEach((line, i) => questions.push(parseQ(type, line, i, t, U.u)));
    }
    for (const c of U.vocab) {
      const t = { id: c.id, u: U.u, kind: 'v', title: c.title, html: c.note || '', examples: [], unsure: c.unsure || '' };
      topics[t.id] = t; units[U.u].topicIds.push(t.id);
      const extra = c.unsure ? { unsure: true } : {};
      for (const type of ['n', 'adj', 'phr'])
        (c[type] || []).forEach(line => vocab.push(parseVocab(line, type, U.u, c.id, extra)));
      for (const type of ['mc', 'fill', 'tr', 'order'])
        (c[type] || []).forEach((line, i) => questions.push(parseQ(type, line, i, t, U.u)));
    }
    for (const v of U.verbs || []) verbs.push({ ...v, u: U.u });
    for (const [inf, tr, part] of U.perfectVerbs || []) perfectVerbs.push({ inf, tr, part: part || null, u: U.u });
    (U.writing || []).forEach((w, i) => writing.push({ ...w, id: `w${U.u}-${i + 1}`, u: U.u }));
    (U.speaking || []).forEach((s, i) => speaking.push({ ...s, id: `s${U.u}-${i + 1}`, u: U.u }));
  }
  return { units, topics, vocab, questions, verbs, perfectVerbs, writing, speaking, gustarThings: U5.gustarThings };
}

export const CONTENT = build();
