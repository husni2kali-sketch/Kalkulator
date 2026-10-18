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


// ===== BAGIAN OPERATOR 3 (Kontak) =====
