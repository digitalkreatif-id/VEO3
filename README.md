# Veo 3 Consistent Character Prompt Generator

Generator berbasis web untuk membuat *prompt* karakter konsisten sesuai struktur Veo 3. Aplikasi ini dibangun dengan HTML, CSS, dan JavaScript murni sehingga dapat dijalankan secara *static* (tanpa backend).

---

## Fitur

* Form 11 kolom lengkap (judul scene, deskripsi karakter, detail suara, dll.)
* Pilihan gerakan kamera (camera motions) lengkap dari Higgsfield.dengan terjemahan Indonesia.
* Tombol **Generate Prompt** menampilkan hasil:
  * Kolom Bahasa Indonesia (dapat diedit kembali)
  * Kolom Bahasa Inggris final (otomatis diterjemahkan, dialog tetap berbahasa Indonesia)
* Tombol **Reset** untuk mengosongkan semua kolom sekaligus menyembunyikan hasil.
* Opsi **Dynamic Theme** – ubah kombinasi warna (primer, sekunder, aksen) secara langsung.
* Desain responsif; nyaman dipakai di desktop maupun seluler.

---

## Cara Menjalankan Secara Lokal

1. **Klon repositori**

   ```bash
   git clone https://github.com/username/veo3-prompt-generator.git
   cd veo3-prompt-generator/AI Karakter
   ```

2. **Buka file** `index.html` di browser favorit Anda (Chrome, Edge, Firefox, dsb.).

   Tidak diperlukan proses build atau instalasi dependensi karena seluruh kode bersifat *client-side*.

---

## Cara Menggunakan (Langkah Rinci)

### 1. Menyiapkan Tampilan

Saat pertama kali membuka halaman, Anda akan melihat tiga area utama:

1. **Header** – berisi judul aplikasi serta kontrol warna (Primary / Secondary / Accent). Opsi ini bersifat opsional; abaikan jika tidak diperlukan.
2. **Formulir** – di dalam card putih, berisi 11 kolom input & dropdown gerakan kamera.
3. **Output** – area kosong yang akan menampilkan hasil setelah klik *Generate Prompt*.

### 2. Mengisi Formulir

Isi kolom‐kolom berikut sesuai kebutuhan cerita Anda. Contoh placeholder dapat dijadikan panduan struktur & gaya bahasa.

| No | Kolom | Keterangan |
|----|-------|------------|
|1|**Judul Scene**|Ringkas dan spesifik. Contoh: *Terminal Bus Malam*|
|2|**Deskripsi Karakter Inti**|Cakup asal, usia, bentuk tubuh, rambut, pakaian, dll. |
|3|**Detail Suara Karakter**|Jenis suara, aksen, tempo bicara, catatan penting dialog.|
|4|**Aksi Karakter**|Kegiatan utama yang dilakukan di scene.|
|5|**Ekspresi Karakter**|Ekspresi wajah/gaya bahasa tubuh dominan.|
|6|**Latar Tempat & Waktu**|Lokasi + kondisi waktu (pagi/malam, cuaca).|
|7|**Detail Visual Tambahan**|Teknik sinematik, pencahayaan, art style, resolusi, dll.|
|8|**Suasana Keseluruhan**|Mood global scene. Mis: *ramai, dramatis, melankolis*.|
|9|**Suara Lingkungan / Ambience**|SFX: kebisingan, musik, cuaca, dll.|
|10|**Dialog Karakter**|Kalimat yang diucapkan (Bahasa Indonesia, diapit tanda petik).|
|11|**Negative Prompt**|Hal yang harus dihindari oleh model video.|

**Gerakan Kamera** – Dropdown multiselect di bagian bawah; pilih satu atau lebih efek. Tahan `Ctrl` (Windows/Linux) atau `⌘` (macOS) sambil klik untuk memilih beberapa.

### 3. Menghasilkan Prompt

Setelah semua kolom terisi:

1. Klik **Generate Prompt**.
2. Sistem akan:
   * Merakit seluruh input menjadi prompt Bahasa Indonesia dengan tag sesuai format Veo 3.
   * Mengirimkan prompt tersebut ke API MyMemory untuk diterjemahkan ke Bahasa Inggris (kecuali kalimat dialog yang tetap asli).
3. Bagian **Output** muncul otomatis dengan dua textarea:
   * *Prompt Bahasa Indonesia* – masih dapat diedit apabila ingin koreksi cepat.
   * *Final Prompt (Bahasa Inggris)* – *read-only* dan siap disalin ke Veo 3.

### 4. Menyalin & Menggunakan

• Jika perlu, perbaiki bagian Indonesia lalu salin kembali prompt Inggris (sistem tidak memperbarui otomatis setelah Anda mengedit manual).  
• Tempel *Final Prompt* langsung ke antarmuka Veo 3 untuk mulai membuat video.  
• Simpan prompt Indonesia untuk referensi konsistensi di scene selanjutnya.

### 5. Membuat Scene Tambahan

Untuk membuat lanjutan scene dengan karakter sama:

1. Jangan ubah kolom 1-3 (judul, deskripsi karakter, detail suara) agar konsisten.  
2. Ubah kolom aksi, ekspresi, latar, dialog, dll.  
3. Klik **Generate Prompt** lagi – prompt baru tercantum di bawah.

### 6. Reset Form

Klik **Reset** untuk:

* Mengosongkan seluruh input.
* Menyembunyikan area output.

> **Tip**: gunakan tombol Reset hanya saat mulai proyek baru agar data sebelumnya tidak hilang.

---

**Catatan Layanan Terjemahan**  
Aplikasi memanfaatkan API MyMemory (gratis). Jika Anda mencapai limit harian atau koneksi tersendat, bagian *Final Prompt* dapat menampilkan pesan error. Dalam kasus tersebut:

* Coba lagi beberapa saat kemudian, atau  
* Salin manual prompt Indonesia ke alat terjemahan lain.

---

## Kustomisasi Warna & Judul

Di bagian header terdapat kontrol warna (color‐picker) untuk **Primary / Secondary / Accent**. Setelah memilih warna, klik **Apply Style** maka seluruh tema akan berubah instan. Judul aplikasi juga bisa diubah langsung pada berkas `index.html` (elemen dengan id `app-title`).

---

## Deploy ke GitHub Pages 

Anda dapat mempublikasikan proyek ini agar dapat diakses publik melalui GitHub Pages:

1. Push seluruh berkas ke repositori GitHub publik.
2. Di halaman repo → *Settings* → *Pages*.
3. Pilih **Branch** (mis: `main`) dan folder `/ (root)` atau `AI Karakter/` sebagai sumber.
4. Klik **Save**. Setelah proses selesai, GitHub Pages akan memberikan URL: `https://username.github.io/repo-name/`.
5. Buka URL tersebut – aplikasi siap digunakan oleh siapa saja tanpa server tambahan.

---

## Kontribusi

* Pull request untuk penambahan fitur atau penyempurnaan UI dipersilakan.
* Laporkan *issue* jika menemukan bug.

---

## Lisensi

Proyek ini dirilis di bawah lisensi MIT. Silakan gunakan, modifikasi, dan distribusikan sesuai kebutuhan. 