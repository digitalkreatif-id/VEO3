# Veo 3 Consistent Character Prompt Generator

Generator prompt sinematik untuk model video Veo 3. Aplikasi bersifat **static** (HTML + CSS + JS) sehingga dapat dijalankan lokal ataupun dipublikasikan dengan GitHub Pages tanpa server backend.

---

## Fitur Utama

1. Form 11 kolom lengkap sesuai struktur prompt Veo 3.  
2. Daftar **Camera Motion** mencakup gerakan umum + seluruh motion Higgsfield (EN + ID).  
3. Tombol **Generate Prompt** menghasilkan:  
   • Kolom Bahasa Indonesia (dapat diedit)  
   • Kolom English Final (*read-only*, otomatis terjemahan, dialog tetap ID).  
4. Tombol **Reset** mengosongkan input & output.  
5. Kontrol warna dinamis (Primary / Secondary / Accent).  
6. Desain responsif dan bebas batas kuota (seluruh logika di sisi klien).  

---

## Struktur Berkas (root repo)
```
├─ index.html
├─ styles.css
├─ script.js
├─ .nojekyll        # mematikan Jekyll pada GitHub Pages
└─ README.md
```

---

## Menjalankan Lokal
1. Clone repo, lalu buka `index.html` di browser mana pun.

```bash
git clone https://github.com/username/veo3-prompt-generator.git
cd veo3-prompt-generator
start index.html   # Windows
# atau
open index.html    # macOS
```

Tidak ada dependensi tambahan.

---

## Deploy ke GitHub Pages
1. Pastikan struktur file seperti di atas (root).  
2. File **.nojekyll** sudah ada untuk menonaktifkan Jekyll.  
3. Push → Settings → Pages → *Branch*: `main` dan *Folder*: `/ (root)` → Save.  
4. Tunggu ~1 menit, situs tersedia di `https://username.github.io/repo-name/`.

---

## Panduan Penggunaan

1. Isi semua kolom form sesuai placeholder. Contoh lengkap ada di README lama / deskripsi awal proyek.  
2. Pilih satu atau lebih gerakan kamera (tahan *Ctrl/⌘* untuk multi-select).  
3. Klik **Generate Prompt**. Dua kolom hasil akan muncul.  
4. Koreksi jika perlu pada kolom Bahasa Indonesia, lalu salin *Final Prompt (English)* ke Veo 3.  
5. Klik **Reset** apabila ingin memulai prompt baru.

### Tip Konsistensi Karakter / Multi-Scene
* Gunakan form yang sama untuk scene berikutnya — **jangan ubah** kolom 1-3 (Judul Scene, Deskripsi Karakter, Detail Suara).  
* Cukup ubah Aksi/Action, Ekspresi, Latar Tempat & Waktu, Dialog, serta pilih Camera Motion berbeda untuk menjaga kontinuitas.

---

## Panduan Tambahan (menggunakan ChatGPT)

Gunakan instruksi berikut agar ChatGPT membantu membuat variasi scene secara cepat:

> **HASILKAN PROMPT BARU DENGAN CERITA YANG BERBEDA DI CHAT GPT**  
>  
> Tolong ganti **cerita, karakter, dan lokasi** tanpa mengubah format prompt (lihat contoh prompt di atas).  
>  
> Buatkan *scene* berikutnya — **cukup ubah pergerakan kamera, dialog karakter, serta latar tempat & waktu** untuk menjaga konsistensi.

Tempel instruksi tersebut ke ChatGPT, lalu salin prompt yang dihasilkan kembali ke kolom aplikasi ini untuk menghasilkan terjemahan otomatis.

---

## Lisensi

MIT — silakan digunakan dan dimodifikasi. 