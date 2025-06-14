document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selections ---
    const getEl = (id) => document.getElementById(id);

    const sceneTitle = getEl('scene-title');
    const characterDesc = getEl('character-desc');
    const characterVoice = getEl('character-voice');
    const characterAction = getEl('character-action');
    const characterExpression = getEl('character-expression');
    const setting = getEl('setting');
    const cameraMovement = getEl('camera-movement');
    const lighting = getEl('lighting');
    const artStyle = getEl('art-style');
    const visualQuality = getEl('visual-quality');
    const atmosphere = getEl('atmosphere');
    const ambience = getEl('ambience');
    const dialogue = getEl('dialogue');
    const negativePrompt = getEl('negative-prompt');

    const generatePromptBtn = getEl('generate-prompt-btn');
    const newStoryBtn = getEl('new-story-btn');
    const nextSceneBtn = getEl('next-scene-btn');
    const changeTitleBtn = getEl('change-title-btn');
    const changeStyleBtn = getEl('change-style-btn');

    const titleInput = getEl('title-input');
    const styleInput = getEl('style-input');
    const mainTitle = getEl('main-title');

    const outputId = getEl('output-id');
    const outputEn = getEl('output-en');

    // --- Initial Data Setup ---
    function loadInitialData() {
        sceneTitle.value = 'terminal bus malam';
        characterDesc.value = 'Seorang vlogger wanita muda asal Minang berusia 27 tahun.\nPerawakan/Bentuk Tubuh: tubuh mungil, tinggi 158cm, bentuk badan proporsional.\nwarna kulit: sawo matang cerah.\nRambut: ikal sebahu, hitam kecokelatan, diikat setengah ke belakang.\nWajah: wajah oval, alis tebal alami, mata hitam besar, senyum ramah, pipi merona, bibir natural dengan sentuhan lip tint.\nPakaian: mengenakan jaket parasut warna kuning mustard dan celana panjang hitam, membawa ransel kecil.';
        characterVoice.value = 'Dia berbicara dengan suara wanita muda yang hangat dan penuh semangat.\nNada: mezzo-soprano.\nTimbre: bersahabat dan enerjik.\nAksen/Logat: logat Indonesia dengan sentuhan khas Minang halus, berbicara murni dalam Bahasa Indonesia.\nCara Berbicara: tempo sedang-cepat, gaya bicara lincah dan ekspresif.\nPENTING: Seluruh dialog harus dalam Bahasa Indonesia dengan pengucapan natural dan jelas. Pastikan suara karakter ini konsisten di seluruh video.';
        characterAction.value = 'berjalan di sekitar terminal bus malam sambil melihat-lihat aktivitas penumpang dan pedagang.';
        characterExpression.value = 'Karakter menunjukkan ekspresi kagum dan antusias, sering tersenyum sambil melirik kamera.';
        setting.value = 'latar tempat: di terminal bus antar kota malam hari, terdapat pedagang kaki lima di pinggir jalur keberangkatan, beberapa bus berjajar dengan lampu menyala.\nWaktu: malam hari, hujan rintik-rintik.';
        cameraMovement.value = 'Tracking Shot';
        lighting.value = 'natural dari lampu jalan dan lampu bus, pantulan cahaya pada aspal basah.';
        artStyle.value = 'cinematic realistis.';
        visualQuality.value = 'Resolusi 4K.';
        atmosphere.value = 'Suasana sibuk, ramai, dengan kesan perjalanan malam yang hidup dan dinamis meskipun hujan.';
        ambience.value = 'SOUND: suara mesin bus menyala, pengumuman dari pengeras suara, derai hujan ringan, dan percakapan samar antar penumpang dan pedagang.';
        dialogue.value = 'DIALOG dalam Bahasa Indonesia: Karakter berkata: "Tiap kota punya terminal kayak gini, dan aku suka banget suasana malamnya… hangat walau gerimis begini. Rasanya kayak perjalanan baru mau dimulai."';
        negativePrompt.value = 'Hindari: teks di layar, subtitle, tulisan di video, font, logo, distorsi, artefak, anomali, wajah ganda, anggota badan cacat, tangan tidak normal, orang tambahan, objek mengganggu, kualitas rendah, buram, glitch, suara robotik, suara pecah.';
    }
    
    loadInitialData();


    // --- Core Functions ---

    function generatePrompt() {
        const visualDetails = `Gerakan Kamera: ${cameraMovement.value}.\n Pencahayaan: ${lighting.value}\n Gaya Video/Art Style: ${artStyle.value}\n Kualitas Visual: ${visualQuality.value}`;

        const promptData = [
            { label: 'JUDUL SCENE', value: sceneTitle.value },
            { label: 'DESKRIPSI KARAKTER INTI', value: characterDesc.value },
            { label: 'DETAIL SUARA KARAKTER', value: characterVoice.value },
            { label: 'AKSI KARAKTER', value: characterAction.value },
            { label: 'EKSPRESI KARAKTER', value: characterExpression.value },
            { label: 'LATAR TEMPAT & WAKTU', value: setting.value },
            { label: 'DETAIL VISUAL TAMBAHAN', value: visualDetails },
            { label: 'SUASANA KESELURUHAN', value: atmosphere.value },
            { label: 'SUARA LINGKUNGAN (AMBIENCE)', value: ambience.value },
            { label: 'DIALOG KARAKTER', value: dialogue.value },
            { label: 'NEGATIVE PROMPT', value: negativePrompt.value }
        ];

        let finalPromptId = 'PROMPT KARAKTER KONSISTEN VEO3\n\n';
        promptData.forEach(item => {
            if (item.value.trim() !== '') {
                finalPromptId += `[${item.label}: ${item.value}]\n`;
            }
        });
        
        // Simplified version for the final prompt
        let finalPromptIdImproved = 'PROMPT KARAKTER KONSISTEN VEO3\n\n';
        finalPromptIdImproved += `[JUDUL SCENE: ${sceneTitle.value}]\n`;
        finalPromptIdImproved += `[DESKRIPSI KARAKTER INTI]\n${characterDesc.value}\n`;
        finalPromptIdImproved += `[DETAIL SUARA KARAKTER]\n${characterVoice.value}\n`;
        finalPromptIdImproved += `[AKSI KARAKTER]\n${characterAction.value}\n`;
        finalPromptIdImproved += `[EKSPRESI KARAKTER]\n${characterExpression.value}\n`;
        finalPromptIdImproved += `[LATAR TEMPAT & WAKTU]\n${setting.value}\n`;
        finalPromptIdImproved += `[DETAIL VISUAL TAMBAHAN]\n${visualDetails}\n`;
        finalPromptIdImproved += `[SUASANA KESELURUHAN]\n${atmosphere.value}\n`;
        finalPromptIdImproved += `[SUARA LINGKUNGAN (AMBIENCE)]\n${ambience.value}\n`;
        finalPromptIdImproved += `[DIALOG KARAKTER]\n${dialogue.value}\n`;
        finalPromptIdImproved += `[NEGATIVE PROMPT]\n${negativePrompt.value}\n`;


        outputId.value = finalPromptIdImproved;
        translateAndDisplay(finalPromptIdImproved);
    }
    
    const translationMap = {
        'JUDUL SCENE': 'SCENE TITLE',
        'DESKRIPSI KARAKTER INTI': 'CORE CHARACTER DESCRIPTION',
        'DETAIL SUARA KARAKTER': 'CHARACTER VOICE DETAILS',
        'AKSI KARAKTER': 'CHARACTER ACTION',
        'EKSPRESI KARAKTER': 'CHARACTER EXPRESSION',
        'LATAR TEMPAT & WAKTU': 'SETTING & TIME',
        'DETAIL VISUAL TAMBAHAN': 'ADDITIONAL VISUAL DETAILS',
        'Gerakan Kamera': 'Camera Movement',
        'Pencahayaan': 'Lighting',
        'Gaya Video/Art Style': 'Video/Art Style',
        'Kualitas Visual': 'Visual Quality',
        'SUASANA KESELURUHAN': 'OVERALL ATMOSPHERE',
        'SUARA LINGKUNGAN (AMBIENCE)': 'ENVIRONMENTAL SOUND (AMBIENCE)',
        'DIALOG KARAKTER': 'CHARACTER DIALOGUE',
        'DIALOG dalam Bahasa Indonesia: Karakter berkata:': 'DIALOGUE in Indonesian: Character says:',
        'NEGATIVE PROMPT': 'NEGATIVE PROMPT',
        'Hindari': 'Avoid',
        'PROMPT KARAKTER KONSISTEN VEO3': 'VEO3 CONSISTENT CHARACTER PROMPT'
    };

    function translateAndDisplay(indonesianPrompt) {
        let englishPrompt = indonesianPrompt;
        
        // This is a simple replacement, not a real translation.
        // It's designed to keep the user's detailed input and only translate the fixed labels.
        for (const [key, value] of Object.entries(translationMap)) {
             // Use a regex to replace all occurrences of the key.
            englishPrompt = englishPrompt.replace(new RegExp(key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), value);
        }

        // The user specified the dialogue should not be translated.
        // The simple replacement above might have partially translated the dialogue label.
        // We will restore the original dialogue.
        const dialogueMatch = indonesianPrompt.match(/\[DIALOG KARAKTER\]\n(.*)/);
        if (dialogueMatch && dialogueMatch[1]) {
             const originalDialogueSection = dialogueMatch[1];
             englishPrompt = englishPrompt.replace(/\[CHARACTER DIALOGUE\]\n(.*)/, `[CHARACTER DIALOGUE]\n${originalDialogueSection}`);
        }


        outputEn.value = englishPrompt;
    }


    // --- Event Listeners ---
    generatePromptBtn.addEventListener('click', generatePrompt);

    changeTitleBtn.addEventListener('click', () => {
        if (titleInput.value.trim()) {
            mainTitle.textContent = titleInput.value;
        }
    });
    
    changeStyleBtn.addEventListener('click', () => {
        const colors = styleInput.value.split(',').map(c => c.trim());
        if (colors.length >= 3) {
            document.documentElement.style.setProperty('--primary-color', colors[0]);
            document.documentElement.style.setProperty('--background-color', colors[1]);
            document.documentElement.style.setProperty('--secondary-color', colors[2]);
             // You might want to adjust other colors based on these for better contrast
        } else {
            alert('Masukkan 3 warna yang dipisahkan koma (contoh: #ff0000, #000000, #ffffff)');
        }
    });

    const storyTemplates = [
        {
            sceneTitle: 'Pasar Terapung di Pagi Hari',
            characterDesc: 'Seorang fotografer pria berusia 35 tahun dari Suku Banjar.\nPerawakan: Tinggi 175cm, tegap.\nWarna Kulit: Kuning langsat.\nRambut: Pendek, lurus, hitam legam.\nWajah: Rahang tegas, mata tajam, senyum tipis misterius.\nPakaian: Kemeja flanel digulung, celana kargo, membawa kamera DSLR dengan lensa tele.',
            characterVoice: 'Suara bariton yang dalam dan tenang.\nNada: Rendah dan jelas.\nTimbre: Hangat namun berwibawa.\nAksen: Logat Banjar yang kental namun mudah dipahami.\nCara Berbicara: Lambat, setiap kata diucapkan dengan pertimbangan.',
            characterAction: 'Mengambil foto dari atas perahu klotok, membidik para pedagang dan pembeli di pasar terapung.',
            characterExpression: 'Ekspresi fokus dan sabar, mata menyipit saat mencari momen yang tepat.',
            setting: 'Latar Tempat: Pasar terapung Lok Baintan, Sungai Martapura, Kalimantan Selatan.\nWaktu: Pagi hari, matahari terbit, kabut tipis menyelimuti permukaan air.',
            cameraMovement: 'Low Angle Shot',
            lighting: 'Cahaya keemasan matahari terbit, menciptakan siluet dan refleksi indah di air.',
            artStyle: 'Gaya dokumenter puitis.',
            visualQuality: 'Kualitas sinematik, high dynamic range (HDR).',
            atmosphere: 'Suasana tenang, damai, namun penuh dengan aktivitas perdagangan yang otentik.',
            ambience: 'SOUND: Suara dayung di air, tawar-menawar dalam bahasa Banjar, kicauan burung dari kejauhan.',
            dialogue: 'DIALOG dalam Bahasa Indonesia: Karakter bergumam: "Setiap sudut punya cerita... setiap wajah punya makna. Di sini, waktu seakan berhenti."',
            negativePrompt: 'Hindari: guncangan kamera yang berlebihan, noise digital, warna yang terlalu jenuh, perahu motor modern.'
        },
        {
            sceneTitle: 'Perpustakaan Kuno di Tengah Kota',
            characterDesc: 'Seorang mahasiswi Sastra Kuno berusia 22 tahun dari Yogyakarta.\nPerawakan: Tinggi 165cm, langsing.\nWarna Kulit: Putih gading.\nRambut: Panjang, lurus, diikat ekor kuda.\nWajah: Wajah tirus dengan kacamata bingkai bulat, mata cerdas dan penasaran.\nPakaian: Sweater rajut warna krem, rok panjang, dan sepatu flat.',
            characterVoice: 'Suara lembut dan jernih.\nNada: Soprano.\nTimbre: Melodis dan sedikit pemalu.\nAksen: Bahasa Indonesia baku dengan intonasi Jawa yang halus.\nCara Berbicara: Teratur dan penuh pemikiran.',
            characterAction: 'Menelusuri rak buku yang menjulang tinggi, mengambil sebuah buku bersampul kulit tua dengan hati-hati.',
            characterExpression: 'Ekspresi serius dan terpesona, jari-jarinya menyentuh halaman buku dengan lembut.',
            setting: 'Latar Tempat: Perpustakaan tua dengan arsitektur kolonial, cahaya masuk melalui jendela-jendela besar.\nWaktu: Siang hari.',
            cameraMovement: 'Dolly Out',
            lighting: 'Pencahayaan dramatis dari jendela, debu beterbangan terlihat di berkas cahaya.',
            artStyle: 'Gaya fantasi akademis, sedikit gelap.',
            visualQuality: 'Resolusi 4K, tekstur detail.',
            atmosphere: 'Suasana hening, sakral, dan penuh misteri.',
            ambience: 'SOUND: Suara halaman buku dibalik, langkah kaki yang menggema pelan, detak jam dinding kuno.',
            dialogue: 'DIALOG dalam Bahasa Indonesia: Karakter berbisik pada dirinya sendiri: "Berapa banyak rahasia yang kau simpan... dalam diammu selama ratusan tahun?"',
            negativePrompt: 'Hindari: pencahayaan modern yang terang, suara obrolan, buku-buku baru, kekacauan.'
        }
    ];
    
    let currentStoryIndex = 0;

    newStoryBtn.addEventListener('click', () => {
        currentStoryIndex = (currentStoryIndex + 1) % storyTemplates.length;
        const story = storyTemplates[currentStoryIndex];
        
        sceneTitle.value = story.sceneTitle;
        characterDesc.value = story.characterDesc;
        characterVoice.value = story.characterVoice;
        characterAction.value = story.characterAction;
        characterExpression.value = story.characterExpression;
        setting.value = story.setting;
        cameraMovement.value = story.cameraMovement;
        lighting.value = story.lighting;
        artStyle.value = story.artStyle;
        visualQuality.value = story.visualQuality;
        atmosphere.value = story.atmosphere;
        ambience.value = story.ambience;
        dialogue.value = story.dialogue;
        negativePrompt.value = story.negativePrompt;

        generatePrompt();
    });

    nextSceneBtn.addEventListener('click', () => {
        // Example logic for next scene: change camera, dialogue, and setting
        const nextCameraMovements = ['Dolly In', 'Crane Up', 'Handheld', 'Zoom Out'];
        const currentCameraIndex = nextCameraMovements.indexOf(cameraMovement.value);
        cameraMovement.value = nextCameraMovements[(currentCameraIndex + 1) % nextCameraMovements.length];
        
        setting.value = "Waktu: beberapa saat kemudian...";
        dialogue.value = "DIALOG dalam Bahasa Indonesia: Karakter berkata: \"Dan petualangan pun berlanjut...\"";

        generatePrompt();
    });
    
    // Initial generation on load
    generatePrompt();
}); 