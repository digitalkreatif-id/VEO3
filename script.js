// Camera motion list with Indonesian translations (sumber: higgsfield.ai)
const cameraMotions = [
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
    { en: "Zoom Out", id: "Zoom Keluar" }
];

function populateCameraMotions() {
    const select = document.getElementById('camera-motion');
    cameraMotions.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.en;
        opt.textContent = `${m.en} (${m.id})`;
        select.appendChild(opt);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateCameraMotions();

    const form = document.getElementById('prompt-form');
    const outSection = document.getElementById('output-section');
    const outID = document.getElementById('output-id');
    const outEN = document.getElementById('output-en');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const data = collectForm();
        const idPrompt = buildIDPrompt(data);
        outID.value = idPrompt;

        const enPrompt = await translatePrompt(idPrompt);
        outEN.value = enPrompt;
        outSection.classList.remove('hidden');
        outEN.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        form.reset();
        outID.value = '';
        outEN.value = '';
        outSection.classList.add('hidden');
    });

    document.getElementById('apply-style').addEventListener('click', () => {
        const p = document.getElementById('color-primary').value;
        const s = document.getElementById('color-secondary').value;
        const a = document.getElementById('color-accent').value;
        document.documentElement.style.setProperty('--primary-color', p);
        document.documentElement.style.setProperty('--secondary-color', s);
        document.documentElement.style.setProperty('--accent-color', a);
    });
});

function collectForm() {
    const v = id => document.getElementById(id).value.trim();
    return {
        scene: v('scene-title'),
        core: v('core-character'),
        voice: v('voice-detail'),
        action: v('character-action'),
        expression: v('character-expression'),
        placeTime: v('place-time'),
        visual: v('visual-detail'),
        mood: v('overall-mood'),
        ambience: v('ambience-sound'),
        dialog: v('character-dialogue'),
        negative: v('negative-prompt'),
        motions: Array.from(document.getElementById('camera-motion').selectedOptions).map(o => o.value)
    };
}

function buildIDPrompt(d) {
    const motionLine = d.motions.length ? `Gerakan Kamera Tambahan: ${d.motions.join(', ')}.` : '';
    return [
        `[JUDUL SCENE: ${d.scene}]`,
        `[DESKRIPSI KARAKTER INTI]`,
        d.core,
        `[DETAIL SUARA KARAKTER]`,
        d.voice,
        `[AKSI KARAKTER]`,
        d.action,
        `[EKSPRESI KARAKTER]`,
        d.expression,
        `[LATAR TEMPAT & WAKTU]`,
        d.placeTime,
        '',
        `[DETAIL VISUAL TAMBAHAN]`,
        `${d.visual}${motionLine ? '\n' + motionLine : ''}`,
        `[SUASANA KESELURUHAN]`,
        d.mood,
        `[SUARA LINGKUNGAN (AMBIENCE)]`,
        d.ambience,
        `[DIALOG KARAKTER]`,
        `DIALOG dalam Bahasa Indonesia: ${d.dialog}`,
        `[NEGATIVE PROMPT]`,
        d.negative
    ].join('\n');
}

async function translatePrompt(text) {
    const reg = /"([^"]+)"/g;
    const keep = [];
    const temp = text.replace(reg, (_, p1) => {
        keep.push(p1);
        return `___KEEP_${keep.length - 1}___`;
    });

    try {
        const t = await translateText(temp);
        return t.replace(/___KEEP_(\d+)___/g, (_, i) => `"${keep[Number(i)]}"`);
    } catch (e) {
        console.error(e);
        return '[Translation failed]\n' + text;
    }
}

async function translateText(text) {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|en`;
    const res = await fetch(url);
    const data = await res.json();
    return data?.responseData?.translatedText || text;
}
