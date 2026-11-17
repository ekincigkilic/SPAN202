// Tüm veriler yalnızca bu cihazda, localStorage içinde tutulur.
const KEY = 'aula1-pwa-v1';

const DEFAULTS = () => ({
  settings: {
    accentStudy: 'lenient', accentExam: 'strict',
    midterm: '', final: '',
    weights: { 5: 17.5, 6: 17.5, 7: 22, 8: 22, 9: 21 },
    src: 'all', units: [5, 6, 7, 8, 9], dir: 'both',
    examN: 30, examMin: 25,
    apiKey: '', model: 'claude-sonnet-5-5',
  },
  srs: {},      // kart kimliği -> { ef, int, reps, due }
  stats: {},    // konu -> { n, recent: [0|1] }
  errors: {},   // soru kimliği -> { n, streak, ua, last, topic, u }
  custom: [],   // kullanıcının eklediği "kitaptan" kelimeler
  book: {},     // "kitaptan" diye işaretlenen hazır kelimeler
  history: [],  // deneme sınavı sonuçları
  log: {},      // gün -> { cards, newCards, q, w, s, exam }
});

function load() {
  const d = DEFAULTS();
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (raw) { Object.assign(d, raw); d.settings = { ...DEFAULTS().settings, ...raw.settings }; }
  } catch (e) { console.warn('Kayıt okunamadı', e); }
  return d;
}

export let S = load();
export let storageOk = true;

export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); storageOk = true; }
  catch (e) { storageOk = false; console.warn('Kaydedilemedi', e); }
}
export function resetAll() { S = DEFAULTS(); save(); }
export function exportData() { const { apiKey, ...settings } = S.settings; return JSON.stringify({ ...S, settings }, null, 1); }
export function importData(text) {
  const raw = JSON.parse(text);
  if (!raw || typeof raw !== 'object' || !raw.settings) throw new Error('Geçersiz yedek dosyası');
  const key = S.settings.apiKey;
  S = { ...DEFAULTS(), ...raw, settings: { ...DEFAULTS().settings, ...raw.settings, apiKey: key } };
  save();
}
