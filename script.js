let produkDipilih = "";

// Fungsi untuk membuka modal pemesanan
function bukaForm(namaProduk) {
    produkDipilih = namaProduk;
    document.getElementById("orderModal").style.display = "flex";
}

// Fungsi untuk menutup modal
function tutupModal() {
    document.getElementById("orderModal").style.display = "none";
}

// Fungsi untuk memproses data dan membuka WhatsApp
function kirimKeWA() {
    // Ubah dengan nomor WhatsApp milik toko (contoh: 6281234567890)
    const noHP = "6289603178165"; 
    
    const nama = document.getElementById("nama").value;
    const warna = document.getElementById("warna").value;
    const ucapan = document.getElementById("ucapan").value;

    if (!nama) {
        alert("Harap isi nama pemesan terlebih dahulu!");
        return;
    }

    const pesan = `Halo, saya mau pesan buket:%0A` +
                  `- Produk: ${encodeURIComponent(produkDipilih)}%0A` +
                  `- Nama Pemesan: ${encodeURIComponent(nama)}%0A` +
                  `- Request Warna: ${encodeURIComponent(warna)}%0A` +
                  `- Kartu Ucapan: ${encodeURIComponent(ucapan)}`;

    window.open(`https://wa.me/${noHP}?text=${pesan}`, '_blank');
    tutupModal();
}
