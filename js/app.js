import { CONTENT, UNIT_META, showEs } from './content.js';
import { buildPool, filterPool, pickFromTopic, pickExam, present, grade, shuffle, TYPE_LABEL, conjugate, verbTopic } from './quiz.js';
import { PERSONS, sm2, dayNum, stripAccents } from './spanish.js';
import { S, save, resetAll, exportData, importData, storageOk } from './store.js';

const VERSION = '2.0.0 (Ünite 5–9, Midterm + Final)';
const READY = Object.keys(CONTENT.units).map(Number);
const MODES = {
  midterm: { name: 'Midterm', units: [5, 6], weights: () => ({ 5: 50, 6: 50 }) },
  final: { name: 'Final', units: [5, 6, 7, 8, 9], weights: () => S.settings.weights },
};
const view = document.getElementById('view');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = () => dayNum();
const pct = x => Math.round(x * 100);

// ---------- veri yardımcıları ----------
let POOL = [], POOL_BY_ID = {};
function allVocab() {
  return [...CONTENT.vocab, ...S.custom].map(v => S.book[v.id] ? { ...v, src: 'book' } : v);
}
function rebuild() {
  POOL = buildPool(S.custom).map(q => q.vid && S.book[q.vid] ? { ...q, src: 'book' } : q);
  POOL_BY_ID = Object.fromEntries(POOL.map(q => [q.id, q]));
}
const srcOk = x => { const s = S.settings.src; return s === 'all' || (s === 'book' ? x.src === 'book' : s === 'sure' ? !x.unsure : x.src !== 'book'); };
const pool = (f = {}) => filterPool(POOL, { src: S.settings.src, ...f });
const badges = x => `<span class="badge ${x.src === 'book' ? 'book' : ''}">${x.src === 'book' ? 'kitaptan' : 'üretildi'}</span>${x.unsure ? ' <span class="badge unsure">emin değilim</span>' : ''}`;

function logAdd(k, n = 1) { const d = (S.log[today()] ||= {}); d[k] = (d[k] || 0) + n; }
const logGet = k => (S.log[today()] || {})[k] || 0;

function cardIds(units, dir = S.settings.dir) {
  const out = [];
  for (const v of allVocab()) {
    if (!units.includes(v.u) || !srcOk(v)) continue;
    if (dir !== 'tr') out.push({ id: v.id + '|es', v, dir: 'es' });
    if (dir !== 'es') out.push({ id: v.id + '|tr', v, dir: 'tr' });
  }
  return out;
}

function mastery(tid) {
  const t = CONTENT.topics[tid], st = S.stats[tid];
  const quiz = st && st.n ? (st.recent.reduce((a, b) => a + b, 0) / st.recent.length) * Math.min(1, st.n / 8) : 0;
  if (t.kind !== 'v') return quiz;
  const ids = allVocab().filter(v => v.cat === tid).flatMap(v => [v.id + '|es', v.id + '|tr']);
  const card = ids.length ? ids.reduce((s, id) => { const c = S.srs[id]; return s + (!c ? 0 : c.int >= 6 ? 1 : 0.4); }, 0) / ids.length : 0;
  return st && st.n ? (quiz + card) / 2 : card / 2;
}
const unitMastery = u => { const ids = CONTENT.units[u].topicIds; return ids.reduce((s, id) => s + mastery(id), 0) / ids.length; };

function record(q, res, ua) {
  const st = (S.stats[q.topic] ||= { n: 0, recent: [] });
  st.n++; st.recent.push(res.ok ? 1 : 0); if (st.recent.length > 12) st.recent.shift();
  logAdd('q');
  if (!res.ok) { const e = (S.errors[q.id] ||= { n: 0 }); e.n++; e.streak = 0; e.ua = ua; e.last = today(); e.topic = q.topic; e.u = q.u; }
  else if (S.errors[q.id] && ++S.errors[q.id].streak >= 2) delete S.errors[q.id];
  save();
}

// ---------- genel arayüz ----------
let toastT;
function toast(msg, ms = 3200) { const el = document.getElementById('toast'); el.textContent = msg; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), ms); }

function speak(text) {
  if (!('speechSynthesis' in window)) return toast('Bu tarayıcı sesli okumayı desteklemiyor.');
  const vs = speechSynthesis.getVoices();
  const v = vs.find(v => v.lang === 'es-ES') || vs.find(v => v.lang.replace('_', '-').startsWith('es'));
  if (vs.length && !v) return toast('Cihazda İspanyolca ses bulunamadı. iOS: Ayarlar › Erişilebilirlik › Seslendirilen İçerik › Sesler › İspanyolca.', 6000);
  const u = new SpeechSynthesisUtterance(text.replace(/\s*\/\s*/g, ', ').replace(/_+/g, ' ').replace(/[«»]/g, ''));
  u.lang = v ? v.lang : 'es-ES'; if (v) u.voice = v; u.rate = 0.9;
  speechSynthesis.cancel(); speechSynthesis.speak(u);
}
if ('speechSynthesis' in window) speechSynthesis.getVoices();
const spk = text => `<button class="small ghost" data-act="speak" data-text="${esc(text)}" aria-label="Sesli oku">🔊</button>`;
const ACC = `<div class="acc" aria-label="Özel karakterler">${['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'].map(c => `<button type="button" data-ch="${c}">${c}</button>`).join('')}</div>`;
let lastInput = null;
document.addEventListener('focusin', e => { if (e.target.matches('input[type=text], textarea')) lastInput = e.target; });
document.addEventListener('pointerdown', e => { if (e.target.closest('[data-ch]')) e.preventDefault(); });

const ACTIONS = {};
document.addEventListener('click', e => {
  const ch = e.target.closest('[data-ch]');
  if (ch) {
    const el = lastInput && document.contains(lastInput) ? lastInput : view.querySelector('input[type=text], textarea');
    if (el) { const s = el.selectionStart ?? el.value.length, t = el.selectionEnd ?? s; el.setRangeText(ch.dataset.ch, s, t, 'end'); el.focus(); el.dispatchEvent(new Event('input', { bubbles: true })); }
    return;
  }
  const a = e.target.closest('[data-act]');
  if (a && ACTIONS[a.dataset.act]) { e.preventDefault(); ACTIONS[a.dataset.act](a.dataset, a); }
});
ACTIONS.speak = d => speak(d.text);
ACTIONS.go = d => { location.hash = d.to; };

// ---------- yönlendirme ----------
const ROUTES = {};
let tick = null;
function route() {
  clearInterval(tick); tick = null;
  const [name = '', arg = ''] = location.hash.replace(/^#\/?/, '').split('/');
  const r = ROUTES[name] || ROUTES[''];
  document.body.classList.toggle('focus', ['quiz', 'play'].includes(name));
  const navKey = { '': 'home', study: 'study', topic: 'study', cards: 'cards', play: 'cards', errors: 'errors', settings: 'settings', add: 'settings', write: 'home', speak: 'home', progress: 'home', quiz: 'study', result: 'study' }[name];
  document.querySelectorAll('#nav a').forEach(a => a.dataset.nav === navKey ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  view.innerHTML = r(decodeURIComponent(arg));
  window.scrollTo(0, 0);
  const af = view.querySelector('[autofocus]'); if (af) af.focus({ preventScroll: true });
}
const rerender = () => { const y = window.scrollY; route(); window.scrollTo(0, y); };
window.addEventListener('hashchange', route);

// ---------- BUGÜN ----------
function examInfo() {
  const t = today(), out = [];
  for (const k of ['midterm', 'final']) {
    const d = S.settings[k]; if (!d) continue;
    const days = dayNum(new Date(d + 'T12:00:00')) - t;
    out.push({ k, name: MODES[k].name, days, date: d });
  }
  return out;
}
function plan() {
  const next = examInfo().filter(e => e.days >= 0).sort((a, b) => a.days - b.days)[0];
  const units = (next ? MODES[next.k].units : READY).filter(u => READY.includes(u));
  const days = next ? Math.max(1, next.days) : 14;
  const cards = cardIds(units);
  const t = today();
  const due = cards.filter(c => S.srs[c.id] && S.srs[c.id].due <= t).length;
  const unseen = cards.filter(c => !S.srs[c.id]).length;
  const newTarget = Math.min(40, Math.max(unseen ? 6 : 0, Math.ceil((unseen + logGet('newCards')) / Math.max(1, days - 1))));
  const weak = units.flatMap(u => CONTENT.units[u].topicIds).map(id => ({ id, m: mastery(id) })).sort((a, b) => a.m - b.m).slice(0, 2).map(x => x.id);
  const qTarget = days <= 3 ? 40 : 20;
  const prod = t % 2 === 0 ? 'w' : 's';
  const mock = next && days <= 7 && (days <= 2 || t % 2 === 0);
  return { next, units, days, due, unseen, newTarget, weak, qTarget, prod, mock };
}
ROUTES[''] = () => {
  const ex = examInfo(), p = plan();
  const nErr = Object.keys(S.errors).length;
  const count = ex.length ? `<div class="count">${ex.map(e => `<div class="card"><div class="eyebrow">${e.name}</div><div class="big">${e.days < 0 ? '—' : e.days}</div><div class="sub">${e.days < 0 ? 'geçti' : e.days === 0 ? 'bugün!' : 'gün kaldı'} · ${e.date.split('-').reverse().join('.')}</div></div>`).join('')}</div>`
    : `<div class="card"><b>Sınav tarihlerini gir</b><p class="sub">Geri sayım ve günlük hedef, sınava kalan güne göre hesaplanır.</p><a class="btn" href="#/settings">Tarihleri ayarla</a></div>`;
  const newDone = logGet('newCards'), cardsDone = logGet('cards'), qDone = logGet('q');
  const todo = (done, html) => `<div class="todo ${done ? 'done' : ''}"><div class="tick">${done ? '✓' : ''}</div><div class="grow t">${html}</div></div>`;
  const items = [
    todo(p.due === 0 && newDone >= p.newTarget, `<b>Kartlar:</b> ${p.due} tekrar + ${Math.max(0, p.newTarget - newDone)} yeni kelime <span class="sub">(bugün ${cardsDone} kart çalışıldı)</span><br><a href="#/cards">Kartlara git</a>`),
    todo(qDone >= p.qTarget, `<b>${p.qTarget} soru</b>, en zayıf iki konudan <span class="sub">(bugün ${qDone})</span><br>${p.weak.map(id => `<a href="#/topic/${id}">${esc(CONTENT.topics[id].title)}</a> <span class="sub">%${pct(mastery(id))}</span>`).join(' · ')}`),
    p.prod === 'w' ? todo(logGet('w') > 0, `<b>1 yazma görevi</b><br><a href="#/write">Yazma alıştırmaları</a>`) : todo(logGet('s') > 0, `<b>2 konuşma sorusu</b><br><a href="#/speak">Konuşma alıştırmaları</a>`),
  ];
  if (nErr) items.push(todo(false, `<b>Hata defteri:</b> ${nErr} soru bekliyor<br><a href="#/errors">Yanlışlarımı tekrar et</a>`));
  if (p.mock) items.push(todo(logGet('exam') > 0, `<b>Süreli deneme sınavı</b> <span class="sub">(${p.next.name})</span><br><a href="#/study">Deneme başlat</a>`));
  return `<div class="eyebrow">Aula 1 · Unidades 5–9</div><h1>Bugün</h1>
${count}
<h2>Bugünün planı</h2>
<p class="sub">${p.next ? `${p.next.name} sınavına ${p.days} gün var; hedef Ü${p.units[0]}–${p.units[p.units.length - 1]} kelimelerini sınavdan bir gün önce bitirmek.` : 'Sınav tarihi girilmedi; 14 günlük varsayılan tempo kullanılıyor.'}</p>
<div class="card">${items.join('')}</div>
<h2>Araçlar</h2>
<div class="grid2">
<a class="btn" href="#/write">✍︎ Yazma</a><a class="btn" href="#/speak">🎙 Konuşma</a>
<a class="btn" href="#/progress">▥ İlerleme</a><a class="btn" href="#/errors">✎ Hata defteri (${nErr})</a>
</div>
${storageOk ? '' : '<p class="card fb">Uyarı: tarayıcı veri kaydetmeye izin vermiyor (özel sekme olabilir). İlerleme saklanmayacak.</p>'}`;
};

// ---------- ÇALIŞ ----------
let studyTab = 'general';
const topicRow = id => { const t = CONTENT.topics[id], m = mastery(id); return `<a class="item" href="#/topic/${id}"><div class="grow"><div>${esc(t.title)} ${t.unsure ? '<span class="badge unsure">emin değilim</span>' : ''}</div><div class="bar" style="margin-top:6px"><i style="width:${pct(m)}%"></i></div></div><div class="pct">%${pct(m)}</div></a>`; };
ROUTES.study = () => {
  const tabs = `<div class="chips" role="tablist">${[['general', 'Genel çalışma'], ['midterm', 'Midterm'], ['final', 'Final']].map(([k, n]) => `<button class="chip" role="tab" aria-pressed="${studyTab === k}" data-act="tab" data-k="${k}">${n}</button>`).join('')}</div>`;
  let body = '';
  if (studyTab === 'general') {
    const sel = S.settings.units.filter(u => READY.includes(u));
    body = `<p class="sub">Çalışmak istediğin üniteleri seç.</p>
<div class="chips">${[5, 6, 7, 8, 9].map(u => `<button class="chip" aria-pressed="${sel.includes(u)}" ${READY.includes(u) ? '' : 'disabled'} data-act="unit" data-u="${u}">Ü${u}${READY.includes(u) ? '' : ' · yakında'}</button>`).join('')}</div>
${sel.map(u => `<h2>Unidad ${u} · <span class="es">${esc(CONTENT.units[u].title)}</span></h2><div class="card">${CONTENT.units[u].topicIds.map(topicRow).join('')}</div>`).join('')}
${sel.length ? `<button class="primary wide" data-act="mixed">Karışık quiz (15 soru)</button>` : '<p class="card">En az bir ünite seç.</p>'}`;
  } else {
    const M = MODES[studyTab], ready = M.units.every(u => READY.includes(u));
    const w = M.weights();
    const dist = M.units.map(u => `Ü${u} %${Math.round(100 * w[u] / M.units.reduce((s, x) => s + w[x], 0))}`).join(' · ');
    const hist = S.history.filter(h => h.mode === studyTab).slice(-3).reverse();
    body = `<p class="sub">${studyTab === 'midterm' ? 'Yalnızca 5. ve 6. üniteler.' : 'Tüm üniteler; 7, 8 ve 9 ağırlıklı. Ağırlıklar Ayarlar\'dan değişir.'} Soru dağılımı: ${dist}</p>
${ready ? `<div class="card"><b>Süreli deneme sınavı</b><p class="sub">${S.settings.examN} soru · ${S.settings.examMin} dakika · aksan: ${S.settings.accentExam === 'strict' ? 'strict (aksan hatası yanlış)' : 'lenient'} · cevaplar sonda gösterilir</p><button class="primary wide" data-act="exam" data-mode="${studyTab}">Denemeyi başlat</button>
${hist.length ? `<p class="sub" style="margin-top:10px">Son denemeler: ${hist.map(h => `%${pct(h.score / h.total)}`).join(' · ')}</p>` : ''}</div>
<h2>Konu bazlı çalışma</h2>${M.units.map(u => `<div class="card"><div class="eyebrow">Unidad ${u}</div>${CONTENT.units[u].topicIds.map(topicRow).join('')}</div>`).join('')}`
      : `<div class="card fb warn"><b class="h">Final modu henüz açık değil</b><p>7, 8 ve 9. ünitelerin içeriği ikinci aşamada eklenecek. Motor, ağırlıklar ve deneme sınavı hazır; eksik olan yalnızca içerik. O zamana kadar Ü5–6 için Midterm modunu kullanabilirsin.</p></div>`}`;
  }
  return `<h1>Çalış</h1>${tabs}${body}`;
};
ACTIONS.tab = d => { studyTab = d.k; rerender(); };
ACTIONS.unit = d => { const u = +d.u, a = S.settings.units; S.settings.units = a.includes(u) ? a.filter(x => x !== u) : [...a, u].sort(); save(); rerender(); };
ACTIONS.mixed = () => {
  const units = S.settings.units.filter(u => READY.includes(u));
  const qs = pickExam(pool({ units }), 15, Object.fromEntries(units.map(u => [u, 1])), { errors: S.errors });
  startQuiz({ title: 'Karışık quiz', qs, back: '#/study' });
};
ACTIONS.exam = d => {
  const M = MODES[d.mode];
  const qs = pickExam(pool({ units: M.units }), S.settings.examN, M.weights(), { errors: S.errors });
  if (qs.length < 5) return toast('Bu filtreyle yeterli soru yok. Ayarlar\'dan kaynak filtresini değiştir.');
  startQuiz({ title: `${M.name} denemesi`, qs, exam: true, minutes: S.settings.examMin, mode: d.mode, back: '#/study' });
};

// ---------- KONU ----------
ROUTES.topic = id => {
  const t = CONTENT.topics[id]; if (!t) return ROUTES.study();
  const vocab = allVocab().filter(v => v.cat === id);
  const verbs = CONTENT.verbs.filter(v => verbTopic(v) === id);
  const qs = pool({ topics: [id] });
  const types = [...new Set(qs.map(q => q.type))];
  const hasConj = qs.some(q => q.type === 'conj');
  const m = mastery(id);
  return `<a href="#/study" class="sub">‹ Çalış</a>
<div class="eyebrow" style="margin-top:10px">Unidad ${t.u} · ${t.kind === 'g' ? 'Dilbilgisi' : 'Kelime'}</div>
<h1 class="es">${esc(t.title)}</h1>
<div class="row"><span class="badge">üretildi</span>${t.unsure ? '<span class="badge unsure">emin değilim</span>' : ''}<span class="sub">Ustalık %${pct(m)}</span></div>
${t.unsure ? `<p class="card fb warn"><b>Emin değilim:</b> ${esc(t.unsure)}</p>` : ''}
<div class="row" style="margin-top:12px"><button class="primary grow" data-act="tquiz" data-id="${id}">Quiz (10 soru)</button>${hasConj ? `<button class="grow" data-act="tquiz" data-id="${id}" data-conj="1">Çekim drill'i (12)</button>` : ''}${vocab.length ? `<a class="btn grow" href="#/cards">Kartlar</a>` : ''}</div>
<p class="note">Bu konudaki soru tipleri: ${types.map(x => TYPE_LABEL[x]).join(', ')} · ${qs.length} soru</p>
${t.html ? `<div class="card"><div class="scroll">${t.html}</div></div>` : ''}
${t.examples.length ? `<h2>Örnekler</h2><div class="card">${t.examples.map(([es, tr]) => `<div class="item"><div class="grow"><div class="es">${esc(es)}</div><div class="sub">${esc(tr)}</div></div>${spk(es)}</div>`).join('')}</div>` : ''}
${verbs.length ? `<h2>Çekim tabloları</h2>${verbs.map(v => `<details class="card"><summary><span class="es">${v.inf}</span> <span class="sub">${esc(v.tr)} · ${esc(v.grp)}</span></summary><table>${conjugate(v).map((f, i) => `<tr><th>${PERSONS[i]}</th><td class="es">${f}</td></tr>`).join('')}</table>${spk(conjugate(v).join(', '))}</details>`).join('')}` : ''}
${vocab.length ? `<h2>Kelimeler (${vocab.length})</h2><p class="note">Kitapta gördüğün bir kelimeyi "kitaptan" yapmak için etiketine dokun; quiz ve denemelerde öncelik alır.</p><div class="card">${vocab.map(v => `<div class="item"><div class="grow"><div class="es">${esc(showEs(v))}${v.type === 'n' && v.pl !== '-' ? ` <span class="sub">· çoğul: ${esc(v.pl)}</span>` : ''}</div><div class="sub">${esc(v.tr)}</div></div><button class="small ghost" data-act="mark" data-id="${esc(v.id)}" aria-label="Kaynak etiketini değiştir">${badges(v)}</button>${spk(showEs(v))}</div>`).join('')}</div><a class="btn wide" href="#/add/${id}">+ Kitaptan kelime ekle</a>` : ''}`;
};
ACTIONS.tquiz = d => {
  const all = pool({ topics: [d.id], ...(d.conj ? { types: ['conj'] } : {}) });
  if (!all.length) return toast('Bu filtreyle soru yok.');
  startQuiz({ title: CONTENT.topics[d.id].title, qs: shuffle(pickFromTopic(all, d.conj ? 12 : 10, { errors: S.errors })), back: '#/topic/' + d.id });
};
ACTIONS.mark = d => {
  if (S.custom.some(v => v.id === d.id)) return toast('Bu kelimeyi sen ekledin; zaten "kitaptan".');
  if (S.book[d.id]) delete S.book[d.id]; else S.book[d.id] = 1;
  save(); rebuild(); rerender();
};

// ---------- QUIZ ----------
let sess = null;
function startQuiz({ title, qs, exam = false, minutes = 0, mode = '', back = '#/' }) {
  sess = { title, qs: qs.map(present), i: 0, res: [], exam, mode, back, fb: false, order: [], done: false,
    strict: (exam ? S.settings.accentExam : S.settings.accentStudy) === 'strict', endAt: exam ? Date.now() + minutes * 60000 : 0 };
  if (location.hash === '#/quiz') route(); else location.hash = '#/quiz';
}
function fmtTime(ms) { const s = Math.max(0, Math.ceil(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }
ROUTES.quiz = () => {
  if (!sess || sess.done) { location.hash = sess ? '#/result' : '#/'; return ''; }
  const q = sess.qs[sess.i], r = sess.res[sess.i];
  if (sess.endAt) tick = setInterval(() => {
    const left = sess.endAt - Date.now(), el = document.getElementById('timer');
    if (left <= 0) { clearInterval(tick); toast('Süre doldu.'); finish(); return; }
    if (el) { el.textContent = fmtTime(left); el.classList.toggle('low', left < 120000); }
  }, 500);
  const head = `<div class="row"><button class="small ghost" data-act="quit">✕ Çık</button><div class="grow sub">${esc(sess.title)} · ${sess.i + 1} / ${sess.qs.length}</div>${sess.endAt ? `<span class="timer" id="timer">${fmtTime(sess.endAt - Date.now())}</span>` : ''}</div>
<div class="bar" style="margin:10px 0"><i style="width:${100 * sess.i / sess.qs.length}%"></i></div>
<div class="row"><span class="eyebrow">${TYPE_LABEL[q.type]}</span>${badges(q)}<span class="sub">Ü${q.u} · ${esc(CONTENT.topics[q.topic].title)}</span></div>`;
  const isEsPrompt = ['fill', 'conj', 'art', 'plural', 'fem'].includes(q.type);
  let body = `<div class="qtext ${isEsPrompt ? 'es' : ''}">${esc(q.q)}</div>${q.type === 'tr' ? '<p class="sub">İspanyolcaya çevir.</p>' : ''}${q.hint ? `<p class="sub">${esc(q.hint)}</p>` : ''}`;
  const locked = sess.fb;
  if (q.shown) {
    body += `<div class="opts ${q.shown.length === 2 ? 'two' : ''}">${q.shown.map((o, k) => `<button data-act="opt" data-k="${k}" ${locked ? 'disabled' : ''} ${locked && o === q.a[0] ? 'style="border-color:var(--ok);border-width:2px"' : ''}>${esc(o)}</button>`).join('')}</div>`;
  } else if (q.type === 'order') {
    const chosen = sess.order;
    body += `<div class="tokens" aria-label="Cümlen">${chosen.map((k, j) => `<button data-act="untok" data-j="${j}" ${locked ? 'disabled' : ''}>${esc(q.tokens[k])}</button>`).join('') || '<span class="sub">Kelimelere sırayla dokun.</span>'}</div>
<div class="tokens" style="border-style:solid">${q.tokens.map((w, k) => chosen.includes(k) ? '' : `<button data-act="tok" data-k="${k}" ${locked ? 'disabled' : ''}>${esc(w)}</button>`).join('')}</div>
${locked ? '' : `<button class="primary wide" data-act="submitOrder" ${chosen.length === q.tokens.length ? '' : 'disabled'}>Kontrol et</button>`}`;
  } else {
    body += `<form data-form="answer"><input type="text" id="ans" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" lang="es" aria-label="Cevabın" ${locked ? `disabled value="${esc(r.ua)}"` : 'autofocus'}>${locked ? '' : ACC + '<button class="primary wide">Kontrol et</button>'}</form>`;
  }
  if (sess.exam && !locked) body += `<button class="ghost wide" style="margin-top:8px" data-act="skip">Boş bırak</button>`;
  if (locked) {
    const cls = r.ok ? (r.accentOnly ? 'warn' : 'ok') : '';
    const msg = r.ok ? (r.accentOnly ? 'Doğru ama aksan eksik' : 'Doğru') : (r.accentOnly ? 'Yanlış: aksan hatası (strict mod)' : 'Yanlış');
    body += `<div class="card fb ${cls}" role="status"><b class="h">${msg}</b>${!r.ok || r.accentOnly ? `<div>Doğrusu: <span class="es"><b>${esc(r.expected)}</b></span> ${spk(r.expected)}</div>` : ''}${q.a.length > 1 && !q.opts && q.type !== 'hora' ? `<div class="sub">Kabul edilen diğer cevaplar: ${q.a.slice(1).map(esc).join(' · ')}</div>` : ''}${!r.ok ? `<a class="sub" href="#/topic/${q.topic}">Konu anlatımına git</a>` : ''}</div>
<button class="primary wide" data-act="next" autofocus>${sess.i + 1 < sess.qs.length ? 'Sonraki' : 'Bitir'}</button>`;
  }
  return head + body;
};
function answer(ua) {
  const q = sess.qs[sess.i];
  const res = grade(q, ua, sess.strict);
  sess.res[sess.i] = { ...res, ua };
  if (sess.exam) return next();
  record(q, res, ua); sess.fb = true; route();
}
function next() { sess.i++; sess.fb = false; sess.order = []; if (sess.i >= sess.qs.length) finish(); else route(); }
function finish() {
  clearInterval(tick);
  sess.qs.forEach((q, i) => { if (!sess.res[i]) sess.res[i] = { ok: false, accentOnly: false, expected: q.a[0], ua: '' }; });
  if (sess.exam) {
    sess.qs.forEach((q, i) => record(q, sess.res[i], sess.res[i].ua));
    const byUnit = {};
    sess.qs.forEach((q, i) => { const b = (byUnit[q.u] ||= [0, 0]); b[1]++; if (sess.res[i].ok) b[0]++; });
    S.history.push({ d: today(), mode: sess.mode, score: sess.res.filter(r => r.ok).length, total: sess.qs.length, byUnit });
    logAdd('exam'); save();
  }
  sess.done = true;
  if (location.hash === '#/result') route(); else location.hash = '#/result';
}
ACTIONS.opt = d => answer(sess.qs[sess.i].shown[+d.k]);
ACTIONS.tok = d => { sess.order.push(+d.k); rerender(); };
ACTIONS.untok = d => { sess.order.splice(+d.j, 1); rerender(); };
ACTIONS.submitOrder = () => { const q = sess.qs[sess.i]; answer(sess.order.map(k => q.tokens[k]).join(' ')); };
ACTIONS.skip = () => { sess.res[sess.i] = { ok: false, accentOnly: false, expected: sess.qs[sess.i].a[0], ua: '' }; next(); };
ACTIONS.next = () => next();
ACTIONS.quit = () => { if (sess.exam && !confirmQuit()) return; const b = sess.back; sess = null; location.hash = b; };
let quitArmed = 0;
function confirmQuit() { if (Date.now() - quitArmed < 4000) return true; quitArmed = Date.now(); toast('Denemeden çıkmak için bir kez daha dokun. Sonuç kaydedilmez.'); return false; }
document.addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target.dataset.form;
  if (f === 'answer') { const v = document.getElementById('ans').value; if (!v.trim()) return toast('Bir cevap yaz.'); answer(v); }
  else if (FORMS[f]) FORMS[f](e.target);
});
const FORMS = {};

ROUTES.result = () => {
  if (!sess || !sess.done) { location.hash = '#/'; return ''; }
  const n = sess.qs.length, okN = sess.res.filter(r => r.ok).length;
  const agg = key => { const m = {}; sess.qs.forEach((q, i) => { const b = (m[key(q)] ||= [0, 0]); b[1]++; if (sess.res[i].ok) b[0]++; }); return m; };
  const byU = agg(q => q.u), byT = agg(q => q.topic);
  const wrong = sess.qs.map((q, i) => ({ q, r: sess.res[i] })).filter(x => !x.r.ok || x.r.accentOnly);
  return `<div class="eyebrow">${esc(sess.title)}</div><h1>Sonuç</h1>
<div class="card"><div class="big">${okN} / ${n} <span class="sub" style="font-size:1rem">%${pct(okN / n)}</span></div>${sess.exam ? `<p class="sub">Aksan modu: ${sess.strict ? 'strict' : 'lenient'}</p>` : ''}</div>
<h2>Ünite bazında</h2><div class="card">${Object.entries(byU).map(([u, [a, b]]) => `<div class="item"><div class="grow">Unidad ${u}<div class="bar" style="margin-top:6px"><i style="width:${pct(a / b)}%"></i></div></div><div class="pct">${a}/${b}</div></div>`).join('')}</div>
<h2>Konu bazında</h2><div class="card">${Object.entries(byT).sort((x, y) => x[1][0] / x[1][1] - y[1][0] / y[1][1]).map(([t, [a, b]]) => `<a class="item" href="#/topic/${t}"><div class="grow">${esc(CONTENT.topics[t].title)}</div><div class="pct">${a}/${b}</div></a>`).join('')}</div>
<h2>Yanlışlar ve uyarılar (${wrong.length})</h2>
${wrong.length ? `<div class="card">${wrong.map(({ q, r }) => `<div class="item"><div class="grow"><div class="sub">${TYPE_LABEL[q.type]} · ${esc(CONTENT.topics[q.topic].title)}</div><div>${esc(q.type === 'order' ? 'Cümle sıralama' : q.q)}</div><div>${r.ok ? '<span style="color:var(--warn)">aksan eksik:</span>' : '<span style="color:var(--bad)">senin cevabın:</span>'} ${r.ua ? esc(r.ua) : '<i>boş</i>'}</div><div><span style="color:var(--ok)">doğrusu:</span> <span class="es"><b>${esc(r.expected)}</b></span></div></div></div>`).join('')}</div>` : '<p class="card">Hiç yanlış yok. ¡Muy bien!</p>'}
<div class="row">${wrong.some(x => !x.r.ok) ? '<button class="primary grow" data-act="retry">Yanlışları tekrar et</button>' : ''}<a class="btn grow" href="${sess.back}">Bitti</a></div>`;
};
ACTIONS.retry = () => { const qs = sess.qs.filter((q, i) => !sess.res[i].ok).map(q => POOL_BY_ID[q.id] || q); startQuiz({ title: 'Yanlışların tekrarı', qs, back: sess.back }); };

// ---------- KARTLAR ----------
let cs = null;
ROUTES.cards = () => {
  const units = S.settings.units.filter(u => READY.includes(u));
  const all = cardIds(units), t = today();
  const due = all.filter(c => S.srs[c.id] && S.srs[c.id].due <= t).length;
  const fresh = eligibleNew(all).length, seen = all.filter(c => S.srs[c.id]).length;
  const nNew = Math.min(fresh, Math.max(5, plan().newTarget - logGet('newCards')));
  const hasVoice = 'speechSynthesis' in window;
  return `<h1>Kartlar</h1><p class="sub">Aralıklı tekrar (SM-2). Kartın arkasını gör, ne kadar iyi hatırladığını işaretle; kart ona göre yeniden planlanır.</p>
<div class="chips">${[5, 6, 7, 8, 9].map(u => `<button class="chip" aria-pressed="${units.includes(u)}" ${READY.includes(u) ? '' : 'disabled'} data-act="unit" data-u="${u}">Ü${u}</button>`).join('')}</div>
<label>Yön</label><div class="chips">${[['both', 'İki yön'], ['es', 'ES → TR'], ['tr', 'TR → ES']].map(([k, n]) => `<button class="chip" aria-pressed="${S.settings.dir === k}" data-act="dir" data-k="${k}">${n}</button>`).join('')}</div>
<div class="count" style="margin-top:14px"><div class="card"><div class="big">${due}</div><div class="sub">tekrar zamanı gelen</div></div><div class="card"><div class="big">${all.length - seen}</div><div class="sub">hiç görülmemiş</div></div><div class="card"><div class="big">${seen}</div><div class="sub">çalışılan</div></div></div>
<button class="primary wide" data-act="cstart" data-new="${nNew}" ${due + nNew ? '' : 'disabled'}>Bugünkü kartlar: ${due} tekrar + ${nNew} yeni</button>
<div class="row" style="margin-top:8px"><button class="grow" data-act="cstart" data-new="10" data-only="1" ${fresh ? '' : 'disabled'}>+10 yeni kart</button><button class="grow" data-act="cstart" data-new="0" data-cram="1" ${seen ? '' : 'disabled'}>Serbest tekrar (20)</button></div>
<p class="note">İki yön seçiliyken bir kelimenin TR → ES kartı, ES → TR kartını bir kez gördükten sonra açılır. Kaynak filtresi (${{ all: 'hepsi', book: 'kitaptan', gen: 'üretildi', sure: 'emin olunanlar' }[S.settings.src]}) Ayarlar'dadır.${hasVoice ? '' : ' Bu tarayıcıda sesli okuma yok.'}</p>`;
};
function eligibleNew(all) {
  return all.filter(c => !S.srs[c.id] && (c.dir === 'es' || S.settings.dir === 'tr' || S.srs[c.v.id + '|es']));
}
ACTIONS.dir = d => { S.settings.dir = d.k; save(); rerender(); };
ACTIONS.cstart = d => {
  const units = S.settings.units.filter(u => READY.includes(u)), all = cardIds(units), t = today();
  let queue;
  if (d.cram) queue = shuffle(all.filter(c => S.srs[c.id])).slice(0, 20);
  else {
    const due = d.only ? [] : shuffle(all.filter(c => S.srs[c.id] && S.srs[c.id].due <= t));
    const fresh = eligibleNew(all).sort((a, b) => (b.v.src === 'book') - (a.v.src === 'book')).slice(0, +d.new);
    queue = [...due, ...fresh];
  }
  if (!queue.length) return toast('Çalışılacak kart yok.');
  cs = { queue, i: 0, flip: false, n: 0, cram: !!d.cram, total: queue.length };
  location.hash = '#/play';
};
ROUTES.play = () => {
  if (!cs) { location.hash = '#/cards'; return ''; }
  if (cs.i >= cs.queue.length) { const n = cs.n; cs = null; return `<h1>Tamamlandı</h1><div class="card"><div class="big">${n}</div><div class="sub">kart çalışıldı</div></div><a class="btn primary wide" href="#/cards">Kartlara dön</a><a class="btn wide" style="margin-top:8px" href="#/">Bugün</a>`; }
  const c = cs.queue[cs.i], v = c.v, es = showEs(v);
  const front = c.dir === 'es' ? es : v.tr, back = c.dir === 'es' ? v.tr : es;
  const extra = v.type === 'n' ? (v.pl === '-' ? (v.gen === 'f' && v.art === 'el' ? 'dişil isim (el yalnızca telaffuz için)' : '') : `çoğul: ${(v.gen || (v.art === 'la' ? 'f' : 'm')) === 'f' ? 'las' : 'los'} ${v.pl}`) : v.type === 'adj' ? (v.f === v.es ? 'eril = dişil' : `eril: ${v.es} · dişil: ${v.f}`) : '';
  return `<div class="row"><button class="small ghost" data-act="cquit">✕ Çık</button><div class="grow sub">${cs.i + 1} / ${cs.queue.length} · ${c.dir === 'es' ? 'ES → TR' : 'TR → ES'}${S.srs[c.id] ? '' : ' · yeni'}</div>${badges(v)}</div>
<div class="bar" style="margin:10px 0"><i style="width:${100 * cs.i / cs.queue.length}%"></i></div>
<div class="card flash" data-act="flip" role="button" tabindex="0" aria-label="Kartı çevir">
<div class="sub">${esc(CONTENT.topics[v.cat].title)}</div>
<div class="front ${c.dir === 'es' ? 'es' : ''}">${esc(front)}</div>
${cs.flip ? `<hr style="width:60%;border:0;border-top:1px solid var(--line)"><div class="back ${c.dir === 'tr' ? 'es' : ''}"><b>${esc(back)}</b></div>${extra ? `<div class="sub es">${esc(extra)}</div>` : ''}` : '<div class="sub">cevabı görmek için dokun</div>'}
</div>
<div class="row" style="justify-content:center">${c.dir === 'es' || cs.flip ? `<button class="small" data-act="speak" data-text="${esc(es)}">🔊 Dinle</button>` : ''}</div>
${cs.flip ? `<div class="grades" style="margin-top:10px">${[[1, 'Tekrar', 'bilemedim'], [3, 'Zor', 'zorlandım'], [4, 'İyi', 'bildim'], [5, 'Kolay', 'çok rahat']].map(([g, n, s]) => `<button data-act="cgrade" data-g="${g}" ${g === 4 ? 'class="primary"' : ''}>${n}<small ${g === 4 ? 'style="color:inherit"' : ''}>${s}</small></button>`).join('')}</div>` : `<button class="primary wide" data-act="flip" autofocus>Cevabı göster</button>`}`;
};
ACTIONS.flip = () => { if (!cs.flip) { cs.flip = true; rerender(); } };
ACTIONS.cgrade = d => {
  const c = cs.queue[cs.i], g = +d.g, isNew = !S.srs[c.id];
  if (!cs.cram || isNew) S.srs[c.id] = sm2(S.srs[c.id] || {}, g, today());
  else if (g < 3) S.srs[c.id] = sm2(S.srs[c.id], g, today());
  if (!c.again) { logAdd('cards'); if (isNew) logAdd('newCards'); cs.n++; }
  if (g < 3 && (c.again || 0) < 3) cs.queue.push({ ...c, again: (c.again || 0) + 1 });
  save(); cs.i++; cs.flip = false; route();
};
ACTIONS.cquit = () => { cs = null; location.hash = '#/cards'; };

// ---------- HATA DEFTERİ ----------
ROUTES.errors = () => {
  const list = Object.entries(S.errors).map(([id, e]) => ({ id, e, q: POOL_BY_ID[id] })).filter(x => x.q).sort((a, b) => b.e.n - a.e.n);
  const byT = {}; for (const x of list) (byT[x.q.topic] ||= []).push(x);
  return `<h1>Hata defteri</h1><p class="sub">Yanlış yaptığın her soru burada birikir. Bir soruyu iki kez üst üste doğru yapınca defterden çıkar.</p>
${list.length ? `<button class="primary wide" data-act="errquiz">Sadece yanlışlarım (${Math.min(20, list.length)} soru)</button>
${Object.entries(byT).map(([t, xs]) => `<h2>${esc(CONTENT.topics[t].title)} <span class="sub">Ü${CONTENT.topics[t].u} · ${xs.length}</span></h2><div class="card">${xs.map(({ id, e, q }) => `<div class="item"><div class="grow"><div class="sub">${TYPE_LABEL[q.type]} · ${e.n} kez yanlış</div><div>${esc(q.type === 'order' ? q.a[0].split(' ').sort().join(' / ') : q.q)}</div>${e.ua ? `<div class="sub">son cevabın: ${esc(e.ua)}</div>` : ''}<div class="es"><b>${esc(q.a[0])}</b></div></div><button class="small ghost" data-act="errdel" data-id="${esc(id)}" aria-label="Defterden sil">✕</button></div>`).join('')}</div>`).join('')}`
      : '<div class="card">Defter boş. Quiz ya da deneme çözdükçe yanlışların burada toplanır.</div>'}`;
};
ACTIONS.errquiz = () => {
  const qs = shuffle(Object.keys(S.errors).map(id => POOL_BY_ID[id]).filter(Boolean)).slice(0, 20);
  startQuiz({ title: 'Sadece yanlışlarım', qs, back: '#/errors' });
};
ACTIONS.errdel = d => { delete S.errors[d.id]; save(); rerender(); };

// ---------- İLERLEME ----------
ROUTES.progress = () => {
  const days = Object.keys(S.log).map(Number).sort((a, b) => b - a);
  let streak = 0, d0 = today(); if (!S.log[d0]) d0--; while (S.log[d0]) { streak++; d0--; }
  const tot = k => days.reduce((s, d) => s + (S.log[d][k] || 0), 0);
  return `<a href="#/" class="sub">‹ Bugün</a><h1>İlerleme</h1>
<div class="count"><div class="card"><div class="big">${streak}</div><div class="sub">günlük seri</div></div><div class="card"><div class="big">${tot('q')}</div><div class="sub">soru</div></div><div class="card"><div class="big">${tot('cards')}</div><div class="sub">kart</div></div></div>
${READY.map(u => `<h2>Unidad ${u} <span class="sub">%${pct(unitMastery(u))}</span></h2><div class="card">${CONTENT.units[u].topicIds.map(topicRow).join('')}</div>`).join('')}
${[7, 8, 9].filter(u => !READY.includes(u)).map(u => `<div class="card sub">Unidad ${u} · ${esc(UNIT_META[u].title)}: içerik ikinci aşamada eklenecek.</div>`).join('')}
<h2>Deneme sınavları</h2>${S.history.length ? `<div class="card">${S.history.slice().reverse().map(h => `<div class="item"><div class="grow">${MODES[h.mode]?.name || h.mode}<div class="sub">${new Date(h.d * 86400000).toLocaleDateString('tr-TR')} · ${Object.entries(h.byUnit).map(([u, [a, b]]) => `Ü${u} ${a}/${b}`).join(' · ')}</div></div><div class="pct">%${pct(h.score / h.total)}</div></div>`).join('')}</div>` : '<p class="card sub">Henüz deneme çözülmedi.</p>'}
<p class="note">Ustalık nasıl hesaplanır: dilbilgisi konularında son 12 cevabın doğruluk oranı (ilk 8 soruya kadar kademeli). Kelime konularında bunun, kartların ne kadarının öğrenildiğiyle ortalaması.</p>`;
};

// ---------- YAZMA ----------
const drafts = {};
function checkWriting(w, text) {
  const flat = ' ' + stripAccents(text.toLowerCase()).replace(/[^a-zñ0-9 ]+/g, ' ').replace(/\s+/g, ' ') + ' ';
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const rows = [{ label: `Uzunluk: ${w.min}–${w.max} kelime (senin metnin: ${words})`, ok: words >= w.min && words <= w.max + 15 }];
  for (const c of w.checks) {
    let ok, found = [];
    if (c.re) ok = new RegExp(c.re).test(flat);
    else if (c.count) { found = flat.match(new RegExp(c.count, 'g')) || []; ok = found.length >= c.n; }
    else if (c.reAll) { found = c.reAll.filter(r => new RegExp(r).test(flat)); ok = found.length >= c.n; }
    else {
      for (const v of allVocab().filter(v => v.cat === c.vocab)) {
        const forms = [v.es, v.f, v.pl].filter(Boolean).map(s => stripAccents(s.toLowerCase()).replace(/^(el|la|los|las) /, ''));
        if (v.type === 'adj') forms.push(...forms.map(f => f + (/[aeiou]$/.test(f) ? 's' : 'es')));
        if (forms.some(f => flat.includes(' ' + f + ' '))) found.push(v.es);
      }
      ok = found.length >= c.n;
    }
    rows.push({ label: c.label + (c.vocab && found.length ? ` (bulunan: ${found.slice(0, 5).join(', ')})` : c.reAll || c.count ? ` (bulunan: ${found.length})` : ''), ok });
  }
  return rows;
}
ROUTES.write = id => {
  const w = CONTENT.writing.find(x => x.id === id);
  if (!w) return `<a href="#/" class="sub">‹ Bugün</a><h1>Yazma</h1><p class="sub">Sınavda çıkabilecek türden kısa yazma görevleri. Cevabın önce kurallarla kontrol edilir; Claude API anahtarı girdiysen ayrıntılı düzeltme de alabilirsin.</p>
<div class="card">${CONTENT.writing.map(x => `<a class="item" href="#/write/${x.id}"><div class="grow"><div class="eyebrow">Unidad ${x.u}</div><div><b>${esc(x.title)}</b></div><div class="sub">${esc(x.prompt)}</div></div><span>›</span></a>`).join('')}</div>`;
  const d = drafts[id] || {};
  return `<a href="#/write" class="sub">‹ Yazma</a><div class="eyebrow" style="margin-top:10px">Unidad ${w.u} · ${w.min}–${w.max} kelime</div><h1>${esc(w.title)}</h1><p>${esc(w.prompt)}</p>
<form data-form="write" data-id="${id}"><textarea id="wtext" lang="es" spellcheck="false" autocapitalize="sentences" aria-label="Metnin">${esc(d.text || '')}</textarea>${ACC}
<button class="primary wide">Kurallarla kontrol et</button></form>
${d.rows ? `<div class="card"><b>Kural tabanlı kontrol: ${d.rows.filter(r => r.ok).length} / ${d.rows.length}</b>${d.rows.map(r => `<div class="check ${r.ok ? 'y' : 'n'}"><span class="m">${r.ok ? '✓' : '✗'}</span><span>${esc(r.label)}</span></div>`).join('')}<p class="note">Bu kontrol yalnızca beklenen yapıların ve kelimelerin metinde geçip geçmediğine bakar. Dilbilgisi ya da anlam hatalarını bulamaz.</p></div>
${S.settings.apiKey ? `<button class="wide" data-act="claude" data-id="${id}" ${d.loading ? 'disabled' : ''}>${d.loading ? 'Claude düzeltiyor…' : 'Claude ile ayrıntılı düzelt'}</button>` : '<p class="note">Ayrıntılı, nedenleriyle düzeltme için Ayarlar\'dan Claude API anahtarı girebilirsin (isteğe bağlı).</p>'}
${d.ai ? `<div class="card"><div class="eyebrow">Claude'un düzeltmesi</div><div class="pre">${esc(d.ai)}</div></div>` : ''}${d.err ? `<div class="card fb"><b>Düzeltme alınamadı.</b> ${esc(d.err)}</div>` : ''}
<details class="card"><summary>Örnek cevabı göster</summary><p class="es">${esc(w.model)}</p>${spk(w.model)}<p class="note">Örnek metin "üretildi" etiketlidir; tek doğru cevap değildir.</p></details>` : ''}`;
};
FORMS.write = f => {
  const id = f.dataset.id, w = CONTENT.writing.find(x => x.id === id), text = document.getElementById('wtext').value;
  if (!text.trim()) return toast('Önce metnini yaz.');
  drafts[id] = { ...(drafts[id] || {}), text, rows: checkWriting(w, text) };
  logAdd('w'); save(); rerender();
};
ACTIONS.claude = async d => {
  const w = CONTENT.writing.find(x => x.id === d.id), dr = drafts[d.id];
  dr.text = document.getElementById('wtext').value; dr.loading = true; dr.err = ''; rerender();
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': S.settings.apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({
        model: S.settings.model, max_tokens: 1500,
        system: 'Sen Türk bir öğrenciye A1 seviyesinde İspanyolca (İspanya İspanyolcası, Aula 1 ders kitabı) öğreten titiz bir öğretmensin. Öğrencinin metnini düzelt. Çıktı düz metin olsun, Markdown kullanma. Sırasıyla şunları ver: 1) "Düzeltilmiş metin": öğrencinin cümlelerini koruyarak yalnızca hataları düzelt. 2) "Hatalar": her hata için "yanlış → doğru" ve bir cümlelik Türkçe neden (çekim, uyum, artikel, aksan, kelime seçimi). Hata yoksa bunu söyle. 3) "Görev": görevde istenenlerden eksik kalan var mı. 4) "Öneri": A1 seviyesini aşmayan en fazla iki öneri. Açıklamalar Türkçe, dilbilgisi terimleri İspanyolca olsun. Emin olmadığın bir şeyi kesinmiş gibi söyleme.',
        messages: [{ role: 'user', content: `Görev (Unidad ${w.u}): ${w.prompt} (${w.min}-${w.max} kelime)\n\nÖğrencinin metni:\n${dr.text}` }],
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error?.message || `HTTP ${res.status}`);
    dr.ai = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim() || '(boş yanıt)';
  } catch (e) { dr.err = navigator.onLine === false ? 'Çevrimdışısın; bu özellik internet gerektirir.' : String(e.message || e); }
  dr.loading = false; rerender();
};

// ---------- KONUŞMA ----------
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const canRecord = !!(navigator.mediaDevices && window.MediaRecorder);
const sp = {};
let recog = null, recorder = null;
ROUTES.speak = id => {
  const s = CONTENT.speaking.find(x => x.id === id);
  const support = `<p class="note">Bu cihazda: konuşma tanıma ${SR ? '<b>var gibi görünüyor</b> (iOS\'ta Safari\'de çalışır, ana ekrana eklenen uygulamada çoğu zaman çalışmaz; çalışmazsa kayıt moduna geç)' : '<b>yok</b>'} · ses kaydı ${canRecord ? '<b>var</b>' : '<b>yok</b>'}. Tanıma internet gerektirebilir ve A1 telaffuzunda yanlış anlayabilir; sonucu kesin not gibi değil, ipucu gibi oku. Telaffuzun kendisi otomatik değerlendirilmez.</p>`;
  if (!s) return `<a href="#/" class="sub">‹ Bugün</a><h1>Konuşma</h1><p class="sub">Soruyu sesli cevapla. Tarayıcı destekliyorsa söylediğin metne çevrilir ve anahtar ifadeler kontrol edilir; desteklemiyorsa kendini kaydedip dinler, kontrol listesiyle değerlendirirsin.</p>${support}
<div class="card">${CONTENT.speaking.map(x => `<a class="item" href="#/speak/${x.id}"><div class="grow"><div class="eyebrow">Unidad ${x.u}</div><div class="es"><b>${esc(x.q)}</b></div><div class="sub">${esc(x.tr)}</div></div><span>›</span></a>`).join('')}</div>`;
  const d = (sp[id] ||= {});
  const flat = d.text ? ' ' + stripAccents(d.text.toLowerCase()) + ' ' : '';
  const kw = s.kw.map(k => ({ k, ok: k.split('|').some(a => flat.includes(stripAccents(a.toLowerCase()))) }));
  return `<a href="#/speak" class="sub">‹ Konuşma</a><div class="eyebrow" style="margin-top:10px">Unidad ${s.u}</div>
<div class="qtext es">${esc(s.q)} ${spk(s.q)}</div><p class="sub">${esc(s.tr)}</p>
<div class="row">${SR ? `<button class="primary grow" data-act="listen" data-id="${id}" ${d.listening ? 'disabled' : ''}>${d.listening ? 'Dinliyorum…' : '🎙 Konuş (metne çevir)'}</button>` : ''}${canRecord ? `<button class="grow ${SR ? '' : 'primary'}" data-act="rec" data-id="${id}">${d.recording ? '■ Kaydı durdur' : '● Kendini kaydet'}</button>` : ''}</div>
${!SR && !canRecord ? '<p class="card fb warn">Bu tarayıcıda ne konuşma tanıma ne de ses kaydı var. Cevabını sesli söyle ve aşağıdaki listeyle kendini değerlendir.</p>' : ''}
${d.err ? `<p class="card fb warn">${esc(d.err)}</p>` : ''}
${d.text ? `<div class="card"><div class="eyebrow">Tarayıcının anladığı</div><p class="es">${esc(d.text)}</p>${kw.map(x => `<div class="check ${x.ok ? 'y' : 'n'}"><span class="m">${x.ok ? '✓' : '✗'}</span><span>beklenen ifade: <span class="es">${esc(x.k.split('|').join(' / '))}</span></span></div>`).join('')}</div>` : ''}
${d.url ? `<div class="card"><div class="eyebrow">Kaydın</div><audio controls src="${d.url}" style="width:100%"></audio></div>` : ''}
<h2>Öz değerlendirme</h2><div class="card">${s.list.map((l, i) => `<label class="check" style="font-weight:400;margin:0"><input type="checkbox" style="width:22px;height:22px;flex:none" data-chk="${id}:${i}" ${d['c' + i] ? 'checked' : ''}><span>${esc(l)}</span></label>`).join('')}</div>
<details class="card"><summary>Örnek cevap</summary><p class="es">${esc(s.model)}</p>${spk(s.model)}</details>${support}`;
};
document.addEventListener('change', e => {
  const c = e.target.dataset.chk; if (c) { const [id, i] = c.split(':'); (sp[id] ||= {})['c' + i] = e.target.checked; if (e.target.checked) { logAdd('s'); save(); } }
  const s = e.target.dataset.set; if (s) setSetting(s, e.target);
});
ACTIONS.listen = d => {
  const st = (sp[d.id] ||= {}); st.err = '';
  try {
    recog = new SR(); recog.lang = 'es-ES'; recog.interimResults = false; recog.maxAlternatives = 1;
    recog.onresult = ev => { st.text = [...ev.results].map(r => r[0].transcript).join(' '); logAdd('s'); save(); };
    recog.onerror = ev => { st.err = `Konuşma tanıma çalışmadı (${ev.error}). ${canRecord ? '"Kendini kaydet" ile devam edebilirsin.' : ''}`; };
    recog.onend = () => { st.listening = false; if (location.hash === '#/speak/' + d.id) rerender(); };
    st.listening = true; recog.start();
  } catch (e) { st.listening = false; st.err = 'Konuşma tanıma başlatılamadı: ' + e.message; }
  rerender();
};
ACTIONS.rec = async d => {
  const st = (sp[d.id] ||= {});
  if (st.recording && recorder) { recorder.stop(); return; }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const chunks = []; recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => { stream.getTracks().forEach(t => t.stop()); if (st.url) URL.revokeObjectURL(st.url); st.url = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType })); st.recording = false; logAdd('s'); save(); if (location.hash === '#/speak/' + d.id) rerender(); };
    recorder.start(); st.recording = true; st.err = '';
  } catch (e) { st.err = 'Mikrofona erişilemedi: ' + e.message + '. Tarayıcı ayarlarından mikrofon iznini kontrol et.'; }
  rerender();
};

// ---------- AYARLAR ----------
ROUTES.settings = () => {
  const s = S.settings, w = s.weights, sum = [5, 6, 7, 8, 9].reduce((a, u) => a + (+w[u] || 0), 0);
  const p789 = sum ? Math.round(100 * (w[7] + w[8] + w[9]) / sum) : 0;
  const sel = (key, opts) => `<select data-set="${key}">${opts.map(([v, n]) => `<option value="${v}" ${String(s[key]) === String(v) ? 'selected' : ''}>${n}</option>`).join('')}</select>`;
  return `<h1>Ayarlar</h1>
<h2>Sınav tarihleri</h2><div class="card grid2"><div><label for="d1">Midterm</label><input id="d1" type="date" data-set="midterm" value="${s.midterm}"></div><div><label for="d2">Final</label><input id="d2" type="date" data-set="final" value="${s.final}"></div></div>
<h2>Aksan işaretleri</h2><div class="card"><label>Çalışırken</label>${sel('accentStudy', [['lenient', 'Lenient: doğru say, "aksan eksik" diye uyar'], ['strict', 'Strict: aksan hatası yanlış']])}<label>Deneme sınavında</label>${sel('accentExam', [['strict', 'Strict: aksan hatası yanlış'], ['lenient', 'Lenient: doğru say, uyar']])}<p class="note">ñ bir aksan değil ayrı bir harftir; iki modda da "n" yazmak yanlış sayılır. Noktalama ve büyük/küçük harf hiçbir modda değerlendirilmez.</p></div>
<h2>İçerik kaynağı</h2><div class="card">${sel('src', [['all', 'Hepsi (kitaptan olanlar öncelikli)'], ['book', 'Yalnızca "kitaptan"'], ['gen', 'Yalnızca "üretildi"'], ['sure', '"Emin değilim" olanları gizle']])}<p class="note">Şu an ${allVocab().filter(v => v.src === 'book').length} kelime "kitaptan" etiketli. Dilbilgisi soruları şimdilik hep "üretildi".</p><a class="btn wide" href="#/add">+ Kitaptan kelime ekle</a></div>
<h2>Deneme sınavı</h2><div class="card grid2"><div><label>Soru sayısı</label>${sel('examN', [[20, '20'], [30, '30'], [40, '40'], [50, '50']])}</div><div><label>Süre</label>${sel('examMin', [[15, '15 dk'], [25, '25 dk'], [40, '40 dk'], [60, '60 dk']])}</div></div>
<h2>Final modu ünite ağırlıkları</h2><div class="card"><div class="row">${[5, 6, 7, 8, 9].map(u => `<div style="flex:1;min-width:54px"><label for="w${u}">Ü${u}</label><input id="w${u}" type="number" inputmode="decimal" min="0" max="100" step="0.5" data-set="w:${u}" value="${w[u]}"></div>`).join('')}</div><p class="note">Toplam ${sum}. Oranlar toplamdan hesaplanır; şu an Ü7–8–9 payı %${p789}.</p></div>
<h2>Claude ile yazma düzeltmesi (isteğe bağlı)</h2><div class="card"><label for="key">Claude API anahtarı</label><input id="key" type="password" autocomplete="off" data-set="apiKey" value="${esc(s.apiKey)}" placeholder="sk-ant-…"><label for="model">Model</label><input id="model" type="text" data-set="model" value="${esc(s.model)}"><p class="note">Anahtar yalnızca bu cihazda saklanır, koda ve yedek dosyasına yazılmaz. Yalnızca "Claude ile düzelt"e bastığında, metninle birlikte doğrudan api.anthropic.com adresine gönderilir. Anahtar olmadan da uygulamanın geri kalanı tam çalışır.</p></div>
<h2>Ses</h2><div class="card"><button class="wide" data-act="speak" data-text="Hola, ¿qué tal? Me gusta mucho la música.">🔊 İspanyolca sesi dene</button></div>
<h2>Veri</h2><div class="card"><div class="row"><button class="grow" data-act="export">Yedek al</button><label class="btn grow" style="margin:0">Yedekten yükle<input type="file" accept="application/json,.json" data-set="import" hidden></label></div><button class="ghost wide" style="margin-top:8px;color:var(--bad)" data-act="reset">Tüm ilerlemeyi sil</button><p class="note">Tüm veriler bu cihazda kalır; hesap yok, sunucu yok. iPhone ve iPad arasında otomatik eşitleme de yok: taşımak için yedek al ve diğer cihazda yükle.</p></div>
<p class="note">Sürüm ${VERSION}</p>`;
};
function setSetting(key, el) {
  const s = S.settings;
  if (key === 'import') {
    const file = el.files[0]; if (!file) return;
    file.text().then(t => { importData(t); rebuild(); toast('Yedek yüklendi.'); route(); }).catch(e => toast('Yüklenemedi: ' + e.message));
    return;
  }
  if (key.startsWith('w:')) s.weights[key.slice(2)] = Math.max(0, +el.value || 0);
  else if (['examN', 'examMin'].includes(key)) s[key] = +el.value;
  else s[key] = el.value.trim();
  save(); if (key !== 'apiKey' && key !== 'model') rerender();
}
ACTIONS.export = () => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([exportData()], { type: 'application/json' }));
  a.download = `aula1-yedek-${new Date().toISOString().slice(0, 10)}.json`; a.click();
};
let resetArmed = 0;
ACTIONS.reset = () => {
  if (Date.now() - resetArmed > 4000) { resetArmed = Date.now(); return toast('Silmek için 4 saniye içinde bir kez daha dokun. Bu geri alınamaz.'); }
  resetAll(); rebuild(); toast('Tüm veriler silindi.'); route();
};

// ---------- KİTAPTAN KELİME EKLE ----------
ROUTES.add = cat => {
  const cats = Object.values(CONTENT.topics).filter(t => t.kind === 'v');
  return `<a href="#/settings" class="sub">‹ Ayarlar</a><h1>Kitaptan kelime ekle</h1><p class="sub">Kitapta ya da ders notlarında geçen bir kelimeyi ekle. "kitaptan" etiketi alır, kartlarda ve sınav seçiminde öncelikli olur.</p>
<form data-form="add" class="card">
<label for="acat">Konu</label><select id="acat">${cats.map(t => `<option value="${t.id}" ${t.id === cat ? 'selected' : ''}>Ü${t.u} · ${esc(t.title)}</option>`).join('')}</select>
<label for="atype">Tür</label><select id="atype"><option value="n">İsim (artikel + çoğul)</option><option value="adj">Sıfat (eril / dişil)</option><option value="phr">Fiil ya da kalıp</option></select>
<label for="aes">İspanyolca <span class="sub">(isimde artikelle: la ciudad · sıfatta eril: alto)</span></label><input id="aes" type="text" lang="es" autocapitalize="off" autocorrect="off" spellcheck="false" required>${ACC}
<label for="a2">Çoğul (isim) ya da dişil (sıfat) <span class="sub">kalıplarda boş bırak</span></label><input id="a2" type="text" lang="es" autocapitalize="off" autocorrect="off" spellcheck="false">
<label for="atr">Türkçe</label><input id="atr" type="text" required>
<button class="primary wide" style="margin-top:14px">Ekle</button></form>
${S.custom.length ? `<h2>Eklediklerin (${S.custom.length})</h2><div class="card">${S.custom.map(v => `<div class="item"><div class="grow"><div class="es">${esc(showEs(v))}</div><div class="sub">${esc(v.tr)} · ${esc(CONTENT.topics[v.cat].title)}</div></div><button class="small ghost" data-act="cdel" data-id="${esc(v.id)}" aria-label="Sil">✕</button></div>`).join('')}</div>` : ''}`;
};
FORMS.add = () => {
  const g = id => document.getElementById(id).value.trim().normalize('NFC');
  const cat = g('acat'), type = g('atype'), es = g('aes'), x2 = g('a2'), tr = g('atr');
  const v = { id: `custom:${Date.now().toString(36)}`, u: CONTENT.topics[cat].u, cat, type, src: 'book', tr };
  if (type === 'n') {
    const m = es.match(/^(el|la) (.+)$/i);
    if (!m) return toast('İsimleri artikelle yaz: "el …" ya da "la …".');
    if (!x2) return toast('İsmin çoğulunu da yaz (artikelsiz).');
    Object.assign(v, { art: m[1].toLowerCase(), gen: m[1].toLowerCase() === 'la' ? 'f' : 'm', es: m[2], pl: x2.replace(/^(los|las) /i, '') });
  } else if (type === 'adj') Object.assign(v, { es, f: x2 || es });
  else v.es = es;
  S.custom.push(v); save(); rebuild(); toast('Eklendi.'); route();
};
ACTIONS.cdel = d => { S.custom = S.custom.filter(v => v.id !== d.id); for (const k of Object.keys(S.srs)) if (k.startsWith(d.id + '|')) delete S.srs[k]; save(); rebuild(); rerender(); };

// ---------- başlat ----------
rebuild();
route();
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      const w = reg.installing;
      w && w.addEventListener('statechange', () => { if (w.state === 'installed' && navigator.serviceWorker.controller) toast('Yeni sürüm indirildi. Uygulamayı kapatıp açınca etkin olur.', 6000); });
    });
  }).catch(e => console.warn('Service worker kaydedilemedi', e));
}
