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


// ===== BAGIAN OPERATOR 2 (Tentang) =====


// ===== BAGIAN OPERATOR 3 (Kontak) =====
