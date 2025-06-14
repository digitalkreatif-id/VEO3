// Utility: Simple API-based translator (Google Translate unofficial endpoint)
async function translateText(text, from = 'id', to = 'en') {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    // data[0] is an array of [translatedText, originalText, ...]
    return data[0].map((d) => d[0]).join('');
  } catch (err) {
    console.error('Translation error:', err);
    return '[Translation failed] ' + text;
  }
}

// Build Indonesian prompt using provided inputs
function buildIndoPrompt(values) {
  const {
    judul,
    deskripsi,
    suaraKarakter,
    aksiKarakter,
    ekspresiKarakter,
    latar,
    visual,
    kamera,
    suasana,
    ambience,
    dialog,
    negative,
  } = values;

  return `Scene \"${judul}\": ${deskripsi}. Suara karakter: ${suaraKarakter}. Aksi: ${aksiKarakter}. Ekspresi: ${ekspresiKarakter}. Latar: ${latar}. Visual: ${visual}. Gerakan kamera: ${kamera}. Suasana: ${suasana}. Ambience: ${ambience}. Dialog: \"${dialog}\". Negative prompt: ${negative}.`;
}

// Build English prompt template (will be filled after translation)
function buildEnglishPrompt(trans) {
  const {
    judul,
    deskripsi,
    suaraKarakter,
    aksiKarakter,
    ekspresiKarakter,
    latar,
    visual,
    kamera,
    suasana,
    ambience,
    dialog, // keep Indonesian dialog
    negative,
  } = trans;

  return `Scene \"${judul}\": ${deskripsi}. Character voice: ${suaraKarakter}. Action: ${aksiKarakter}. Expression: ${ekspresiKarakter}. Setting: ${latar}. Visuals: ${visual}. Camera movement: ${kamera}. Mood: ${suasana}. Ambience: ${ambience}. Dialog (Indonesian): \"${dialog}\". Negative prompt: ${negative}.`;
}

// Capture DOM elements
const elements = {
  judul: document.getElementById('judul'),
  deskripsi: document.getElementById('deskripsi'),
  suaraKarakter: document.getElementById('suaraKarakter'),
  aksiKarakter: document.getElementById('aksiKarakter'),
  ekspresiKarakter: document.getElementById('ekspresiKarakter'),
  latar: document.getElementById('latar'),
  visual: document.getElementById('visual'),
  kamera: document.getElementById('kamera'),
  suasana: document.getElementById('suasana'),
  ambience: document.getElementById('ambience'),
  dialog: document.getElementById('dialog'),
  negative: document.getElementById('negative'),
  outID: document.getElementById('outputID'),
  outEN: document.getElementById('outputEN'),
  generateBtn: document.getElementById('generateBtn'),
  ubahJudulBtn: document.getElementById('ubahJudulBtn'),
};

// List of camera movement options (English + Indonesian)
const cameraOptions = [
  { en: "Static Shot", id: "Tembakan Diam" },
  { en: "Tracking Shot", id: "Pengambilan Bergerak" },
  { en: "3D Rotation", id: "Rotasi 3D" },
  { en: "360 Orbit", id: "Orbit 360" },
  { en: "Action Run", id: "Lari Aksi" },
  { en: "Agent Reveal", id: "Perkenalan Agen" },
  { en: "Arc Left", id: "Busur Kiri" },
  { en: "Arc Right", id: "Busur Kanan" },
  { en: "Bullet Time", id: "Waktu Peluru" },
  { en: "Car Chasing", id: "Kejaran Mobil" },
  { en: "Car Explosion", id: "Ledakan Mobil" },
  { en: "Car Grip", id: "Grip Mobil" },
  { en: "Crane Down", id: "Crane Turun" },
  { en: "Crane Up", id: "Crane Naik" },
  { en: "Crane Over The Head", id: "Crane Di Atas Kepala" },
  { en: "Crash Zoom In", id: "Crash Zoom In" },
  { en: "Crash Zoom Out", id: "Crash Zoom Out" },
  { en: "Datamosh", id: "Datamosh" },
  { en: "Dolly In", id: "Dolly Masuk" },
  { en: "Dolly Out", id: "Dolly Keluar" },
  { en: "Dolly Left", id: "Dolly Kiri" },
  { en: "Dolly Right", id: "Dolly Kanan" },
  { en: "Dolly Zoom In", id: "Dolly Zoom In" },
  { en: "Dolly Zoom Out", id: "Dolly Zoom Out" },
  { en: "Double Dolly", id: "Double Dolly" },
  { en: "Dutch Angle", id: "Sudut Dutch" },
  { en: "Fisheye", id: "Fisheye" },
  { en: "Focus Change", id: "Perubahan Fokus" },
  { en: "FPV Drone", id: "Drone FPV" },
  { en: "Glowshift", id: "Glowshift" },
  { en: "Handheld", id: "Handheld" },
  { en: "Head Tracking", id: "Pelacakan Kepala" },
  { en: "Hyperlapse", id: "Hyperlapse" },
  { en: "Incline", id: "Miring" },
  { en: "Jelly Drift", id: "Jelly Drift" },
  { en: "Jib Down", id: "Jib Turun" },
  { en: "Jib Up", id: "Jib Naik" },
  { en: "Lazy Susan", id: "Lazy Susan" },
  { en: "Lens Flare", id: "Lens Flare" },
  { en: "Levitation", id: "Levitation" },
  { en: "Low Shutter", id: "Shutter Rendah" },
  { en: "Morphskin", id: "Morphskin" },
  { en: "Orbit", id: "Orbit" },
  { en: "Pan", id: "Pan" },
  { en: "Pedestal", id: "Pedestal" },
  { en: "Push To Glass", id: "Dorong ke Kaca" },
  { en: "Robo Arm", id: "Lengan Robo" },
  { en: "Snorricam", id: "Snorricam" },
  { en: "Super Dolly In", id: "Super Dolly Masuk" },
  { en: "Super Dolly Out", id: "Super Dolly Keluar" },
  { en: "Tentacles", id: "Tentakel" },
  { en: "Thunder God", id: "Dewa Petir" },
  { en: "Tilt Down", id: "Tilt Turun" },
  { en: "Tilt Up", id: "Tilt Naik" },
  { en: "Time-lapse Human", id: "Time-lapse Manusia" },
  { en: "Time-lapse Landscape", id: "Time-lapse Lanskap" },
  { en: "Whip Pan", id: "Whip Pan" },
  { en: "Wind to Face", id: "Angin ke Wajah" },
  { en: "Wiggle", id: "Goyang" },
  { en: "YoYo Zoom", id: "YoYo Zoom" },
  { en: "Zoom In", id: "Zoom Masuk" },
  { en: "Zoom Out", id: "Zoom Keluar" },
  { en: "Aerial Shot", id: "Drone dari Atas" },
];

// Populate the select element with the camera options
function populateCameraSelect() {
  // Add placeholder option first
  elements.kamera.innerHTML = '<option value="" disabled selected>Pilih gerakan kamera</option>';
  cameraOptions.forEach((opt) => {
    const option = document.createElement('option');
    const label = `${opt.en} (${opt.id})`;
    option.value = label;
    option.textContent = label;
    elements.kamera.appendChild(option);
  });
}

// Call immediately (script loaded after DOM elements exist)
populateCameraSelect();

// Collect current input values
function collectValues() {
  return {
    judul: elements.judul.value.trim(),
    deskripsi: elements.deskripsi.value.trim(),
    suaraKarakter: elements.suaraKarakter.value.trim(),
    aksiKarakter: elements.aksiKarakter.value.trim(),
    ekspresiKarakter: elements.ekspresiKarakter.value.trim(),
    latar: elements.latar.value.trim(),
    visual: elements.visual.value.trim(),
    kamera: elements.kamera.value,
    suasana: elements.suasana.value.trim(),
    ambience: elements.ambience.value.trim(),
    dialog: elements.dialog.value.trim(),
    negative: elements.negative.value.trim(),
  };
}

// Generate prompt handler
async function handleGenerate() {
  const values = collectValues();
  // Build Indonesian prompt
  const indoPrompt = buildIndoPrompt(values);
  elements.outID.value = indoPrompt;

  // Translate each field except dialog
  const transPromises = Object.entries(values).map(async ([key, val]) => {
    if (key === 'dialog') return [key, val]; // keep original
    if (key === 'kamera') return [key, val]; // camera already English/Indo combined
    const translated = await translateText(val);
    return [key, translated];
  });

  const translatedEntries = await Promise.all(transPromises);
  const translatedValues = Object.fromEntries(translatedEntries);
  // Ensure dialog preserved
  translatedValues.dialog = values.dialog;
  // Build English prompt
  const engPrompt = buildEnglishPrompt(translatedValues);
  elements.outEN.value = engPrompt;
}

// Reset handler clears outputs too
function handleReset() {
  elements.outID.value = '';
  elements.outEN.value = '';
}

// Change title within prompts
function handleChangeTitle() {
  const newTitle = prompt('Masukkan judul scene baru:');
  if (!newTitle) return;

  // Update input field
  elements.judul.value = newTitle;

  // Replace inside existing prompts if present
  ['outID', 'outEN'].forEach((outKey) => {
    const area = elements[outKey];
    area.value = area.value.replace(/Scene \\\".*?\\\"/, `Scene \"${newTitle}\"`);
  });
}

// Event listeners
elements.generateBtn.addEventListener('click', handleGenerate);

document.getElementById('promptForm').addEventListener('reset', handleReset);

elements.ubahJudulBtn.addEventListener('click', handleChangeTitle); 