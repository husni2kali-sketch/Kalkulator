const tombolTema = document.getElementById("tombol-tema");

function aturTema(gelap) {
  document.body.classList.toggle("gelap", gelap);
  if (tombolTema) {
    tombolTema.textContent = gelap ? "Mode Terang" : "Mode Gelap";
  }
}

// Pulihkan pilihan tema dari kunjungan sebelumnya (jika ada)
try {
  aturTema(localStorage.getItem("tema") === "gelap");
} catch (e) {
  aturTema(false);
}

if (tombolTema) {
  tombolTema.addEventListener("click", function () {
    const gelap = !document.body.classList.contains("gelap");
    aturTema(gelap);
    try {
      localStorage.setItem("tema", gelap ? "gelap" : "terang");
    } catch (e) {
      // Penyimpanan tidak tersedia; tema tetap berubah di halaman ini saja
    }
  });
}

// Fungsi bantu: tombol .tombol-toggle menampilkan / menyembunyikan elemen
// yang id-nya ada pada atribut data-target. Aman dipanggil di halaman
// mana pun karena querySelectorAll mengembalikan daftar kosong jika tidak ada.
function pasangToggle(pemilih, teksBuka, teksTutup) {
  document.querySelectorAll(pemilih).forEach(function (tombol) {
    tombol.addEventListener("click", function () {
      const target = document.getElementById(tombol.dataset.target);
      if (!target) return;
      target.classList.toggle("tersembunyi");
      tombol.textContent = target.classList.contains("tersembunyi")
        ? teksBuka
        : teksTutup;
    });
  });
}

// ===== BAGIAN PM (Index) =====
// Tombol "Lihat Detail" pada kartu biodata perorangan
pasangToggle(".tombol-detail", "Lihat Detail", "Sembunyikan Detail");
// ===== BAGIAN OPERATOR 1 (Beranda) =====
const teksSapaan = document.getElementById("sapaan");
if (teksSapaan) {
  const jam = new Date().getHours();
  let sapaan = "Selamat malam";
  if (jam >= 4 && jam < 11) {
    sapaan = "Selamat pagi";
  } else if (jam >= 11 && jam < 15) {
    sapaan = "Selamat siang";
  } else if (jam >= 15 && jam < 18) {
    sapaan = "Selamat sore";
  }
  teksSapaan.textContent = sapaan + ", selamat datang di Website Prodi!";
}

// Tombol "Selengkapnya" pada kartu informasi beranda
pasangToggle(".tombol-selengkapnya", "Selengkapnya", "Tutup");

// ===== BAGIAN OPERATOR 2 (Tentang) =====
// Akordeon visi, misi, dan teknologi
pasangToggle(".tombol-akordeon", "Tampilkan", "Sembunyikan");

// ===== BAGIAN OPERATOR 3 (Kontak) =====
const tombolKirim = document.getElementById("tombol-kirim");
if (tombolKirim) {
  const kolomPesan = document.getElementById("pesan");
  const hitungPesan = document.getElementById("hitung-pesan");
  const batasPesan = 300;

  // Penghitung karakter pada kolom pesan
  kolomPesan.addEventListener("input", function () {
    hitungPesan.textContent = kolomPesan.value.length + " / " + batasPesan;
  });

  tombolKirim.addEventListener("click", function () {
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = kolomPesan.value.trim();
    const status = document.getElementById("status-form");
    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    status.className = "galat";

    if (nama === "" || email === "" || pesan === "") {
      status.textContent = "Semua kolom wajib diisi.";
    } else if (!polaEmail.test(email)) {
      status.textContent = "Format email tidak valid. Contoh: nama@contoh.com";
    } else if (pesan.length < 10) {
      status.textContent = "Pesan minimal 10 karakter.";
    } else if (pesan.length > batasPesan) {
      status.textContent = "Pesan maksimal " + batasPesan + " karakter.";
    } else {
      status.className = "sukses";
      status.textContent = "Terima kasih, " + nama + ". Pesan Anda diterima.";
      document.getElementById("nama").value = "";
      document.getElementById("email").value = "";
      kolomPesan.value = "";
      hitungPesan.textContent = "0 / " + batasPesan;
    }
  });
}
