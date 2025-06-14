// Camera motion list (taken from higgsfield.ai) with Indonesian translation
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

// Populate motion select options
function populateCameraMotions() {
    const select = document.getElementById('camera-motion');
    cameraMotions.forEach((motion) => {
        const option = document.createElement('option');
        option.value = motion.en;
        option.textContent = `${motion.en} (${motion.id})`;
        select.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    populateCameraMotions();

    const form = document.getElementById('prompt-form');
    const outputSection = document.getElementById('output-section');
    const outputID = document.getElementById('output-id');
    const outputEN = document.getElementById('output-en');
    const resetBtn = document.getElementById('reset-btn');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = getFormData();
        const indoPrompt = composeIndonesianPrompt(data);
        outputID.value = indoPrompt;

        const englishPrompt = await translatePrompt(indoPrompt);
        outputEN.value = englishPrompt;

        outputSection.classList.remove('hidden');
        outputEN.scrollIntoView({ behavior: 'smooth' });
    });

    resetBtn.addEventListener('click', () => {
        form.reset();
        outputSection.classList.add('hidden');
        outputID.value = '';
        outputEN.value = '';
    });

    // Style controls
    document.getElementById('apply-style').addEventListener('click', () => {
        const primary = document.getElementById('color-primary').value;
        const secondary = document.getElementById('color-secondary').value;
        const accent = document.getElementById('color-accent').value;
        document.documentElement.style.setProperty('--primary-color', primary);
        document.documentElement.style.setProperty('--secondary-color', secondary);
        document.documentElement.style.setProperty('--accent-color', accent);
    });
});

function getFormData() {
    const getVal = (id) => document.getElementById(id).value.trim();
    const selectedMotions = Array.from(document.getElementById('camera-motion').selectedOptions).map(o => o.value);

    return {
        sceneTitle: getVal('scene-title'),
        coreCharacter: getVal('core-character'),
        voiceDetail: getVal('voice-detail'),
        characterAction: getVal('character-action'),
        characterExpression: getVal('character-expression'),
        placeTime: getVal('place-time'),
        visualDetail: getVal('visual-detail'),
        overallMood: getVal('overall-mood'),
        ambienceSound: getVal('ambience-sound'),
        characterDialogue: getVal('character-dialogue'),
        negativePrompt: getVal('negative-prompt'),
        cameraMotions: selectedMotions
    };
}

function composeIndonesianPrompt(d) {
    const motionLine = d.cameraMotions.length ? `Gerakan Kamera Tambahan: ${d.cameraMotions.join(', ')}.` : '';
    const prompt = [
        `[JUDUL SCENE: ${d.sceneTitle}]`,
        `[DESKRIPSI KARAKTER INTI]`,
        d.coreCharacter,
        `[DETAIL SUARA KARAKTER]`,
        d.voiceDetail,
        `[AKSI KARAKTER]`,
        d.characterAction,
        `[EKSPRESI KARAKTER]`,
        d.characterExpression,
        `[LATAR TEMPAT & WAKTU]`,
        d.placeTime,
        '',
        `[DETAIL VISUAL TAMBAHAN]`,
        `${d.visualDetail}${motionLine ? '\n' + motionLine : ''}`,
        `[SUASANA KESELURUHAN]`,
        d.overallMood,
        `[SUARA LINGKUNGAN (AMBIENCE)]`,
        d.ambienceSound,
        `[DIALOG KARAKTER]`,
        `DIALOG dalam Bahasa Indonesia: ${d.characterDialogue}`,
        `[NEGATIVE PROMPT]`,
        d.negativePrompt
    ].join('\n');
    return prompt;
}

async function translatePrompt(text) {
    // Extract content inside quotes to preserve dialogue
    const quoteRegex = /"([^"]+)"/g;
    const preserved = [];
    let tempText = text.replace(quoteRegex, (match, p1) => {
        preserved.push(p1);
        return `__DIALOG_PLACEHOLDER_${preserved.length - 1}__`;
    });

    try {
        const translated = await translateText(tempText);
        // Reinsert preserved dialogues
        const result = translated.replace(/__DIALOG_PLACEHOLDER_(\d+)__/g, (match, idx) => `"${preserved[parseInt(idx, 10)]}"`);
        return result;
    } catch (err) {
        console.error('Translation error:', err);
        return '[Translation failed]\n' + text;
    }
}

async function translateText(text) {
    const endpoint = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=id|en`;
    const response = await fetch(endpoint);
    const data = await response.json();
    if (data && data.responseData && data.responseData.translatedText) {
        return data.responseData.translatedText;
    }
    throw new Error('Translation API failed');
} 