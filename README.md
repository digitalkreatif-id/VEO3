# Veo 3 Consistent Character Prompt Generator

Generator prompt untuk model video **Veo 3**. Aplikasi bersifat **static** (HTML + Tailwind CSS + Vanilla JS) sehingga dapat dijalankan secara lokal maupun dipublikasikan melalui GitHub Pages tanpa server backend.

---

## Fitur Utama

1. Form 11 kolom lengkap yang mengikuti struktur prompt Veo 3.  
2. Daftar **Camera Motion** mencakup gerakan umum + seluruh motion Higgsfield (label EN + ID) dan mendukung **multi-select**.  
3. Tombol **Generate Prompt** menghasilkan:  
   • Kolom Bahasa Indonesia (dapat diedit)  
   • Kolom English Final (*read-only*, otomatis terjemahan, dialog tetap ID).  
4. Tombol **Reset** mengosongkan semua input & output.  
5. Desain responsif, bebas kuota—seluruh logika berjalan di sisi klien.

---

## Struktur Berkas (root repo)
```
├─ index.html          # UI + Tailwind CDN
├─ script.js           # Logika generator & terjemahan
├─ .nojekyll           # Menonaktifkan Jekyll di GitHub Pages
└─ README.md
```

---

## Menjalankan Lokal
1. Clone repo, lalu buka `index.html` di browser apa pun.

```bash
git clone https://github.com/digitalkreatif-id/Veo3.git
cd Veo3
start index.html   # Windows
# atau
open index.html    # macOS / Linux (xdg-open)
```

Tidak ada dependensi tambahan—Tailwind diambil via CDN.

---

## Deploy ke GitHub Pages
1. Pastikan struktur file sesuai daftar di atas (semua di root).  
2. File `.nojekyll` sudah ada untuk menonaktifkan Jekyll.  
3. Push → Settings → Pages → *Branch*: `main` dan *Folder*: `/ (root)` → Save.  
4. Tunggu ±1 menit, situs aktif di `https://<username>.github.io/<repo>`.

---

## Panduan Penggunaan

1. Isi setiap kolom form sesuai placeholder.  
2. Pilih satu **atau lebih** gerakan kamera (tahan *Ctrl/⌘* untuk multi-select).  
3. Klik **Generate Prompt**. Dua kolom hasil akan muncul.  
4. Koreksi jika perlu di kolom Bahasa Indonesia, lalu salin *Final Prompt (English)* ke Veo 3.  
5. Klik **Reset** untuk memulai prompt baru.

### Tip Konsistensi Karakter / Multi-Scene
* Untuk scene selanjutnya, **jangan ubah** kolom 1-3 (Judul Scene, Deskripsi Karakter, Detail Suara).  
* Cukup ubah Aksi, Ekspresi, Latar, Dialog, serta pilih Camera Motion berbeda agar kontinuitas terjaga.

---

## Panduan Tambahan (menggunakan ChatGPT)

Gunakan instruksi berikut agar ChatGPT membantu membuat variasi scene secara cepat:

> **HASILKAN PROMPT BARU DENGAN CERITA YANG BERBEDA**  
> Tolong ganti **cerita, karakter, dan lokasi** tanpa mengubah format prompt (lihat contoh).  
> Buatkan *scene* berikutnya — **cukup ubah pergerakan kamera, dialog karakter, serta latar tempat & waktu** untuk menjaga konsistensi.

Tempel instruksi di atas ke ChatGPT, lalu salin prompt yang dihasilkan kembali ke kolom aplikasi untuk terjemahan otomatis.

---

## Lisensi

MIT — silakan digunakan dan dimodifikasi. 
