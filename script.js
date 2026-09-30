// --- FITUR PEMESANAN LANGSUNG ---
let produkDipilih = "";

function bukaForm(namaProduk) {
    produkDipilih = namaProduk;
    document.getElementById("orderModal").style.display = "flex";
}

function tutupModal() {
    document.getElementById("orderModal").style.display = "none";
}

function kirimKeWA() {
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

// --- FITUR KERANJANG BELANJA & EDIT JUMLAH ---
let keranjang = [];

function tambahKeKeranjang(namaProduk, harga) {
    const itemAda = keranjang.find(item => item.nama === namaProduk);
    if (itemAda) {
        itemAda.jumlah += 1;
    } else {
        keranjang.push({ nama: namaProduk, harga: harga, jumlah: 1 });
    }
    
    updateTampilanKeranjang();
    alert(`"${namaProduk}" berhasil dimasukkan ke keranjang!`);
}

function ubahJumlah(index, perubahan) {
    keranjang[index].jumlah += perubahan;
    
    if (keranjang[index].jumlah <= 0) {
        keranjang.splice(index, 1);
    }
    
    updateTampilanKeranjang();
}

function hapusDariKeranjang(index) {
    keranjang.splice(index, 1);
    updateTampilanKeranjang();
}

function updateTampilanKeranjang() {
    const cartCount = document.getElementById("cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let totalJumlah = keranjang.reduce((sum, item) => sum + item.jumlah, 0);
    cartCount.innerText = totalJumlah;

    cartItemsContainer.innerHTML = "";
    let totalHarga = 0;

    if (keranjang.length === 0) {
        cartItemsContainer.innerHTML = "<p style='color:#888; text-align:center; padding: 20px 0;'>Keranjang masih kosong.</p>";
    } else {
        keranjang.forEach((item, index) => {
            let subtotal = item.harga * item.jumlah;
            totalHarga += subtotal;

            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.nama}</div>
                        <small>Rp ${item.harga.toLocaleString('id-ID')}</small>
                    </div>
                    <div class="cart-item-controls">
                        <div class="qty-control">
                            <button class="btn-qty" onclick="ubahJumlah(${index}, -1)">-</button>
                            <span class="qty-number">${item.jumlah}</span>
                            <button class="btn-qty" onclick="ubahJumlah(${index}, 1)">+</button>
                        </div>
                        <strong class="subtotal-text">Rp ${subtotal.toLocaleString('id-ID')}</strong>
                        <button class="btn-remove-item" onclick="hapusDariKeranjang(${index})" title="Hapus">✕</button>
                    </div>
                </div>
            `;
        });
    }

    cartTotal.innerText = `Rp ${totalHarga.toLocaleString('id-ID')}`;
}

function bukaKeranjang() {
    updateTampilanKeranjang();
    document.getElementById("cartModal").style.display = "flex";
}

function tutupKeranjang() {
    document.getElementById("cartModal").style.display = "none";
}

function checkoutKeranjangWA() {
    const noHP = "6289603178165"; 
    const nama = document.getElementById("nama-cart").value;
    const catatan = document.getElementById("catatan-cart").value;

    if (keranjang.length === 0) {
        alert("Keranjang belanja kamu masih kosong!");
        return;
    }

    if (!nama) {
        alert("Harap isi Nama Pemesan terlebih dahulu!");
        return;
    }

    let daftarBelanja = "";
    let totalHarga = 0;

    keranjang.forEach((item, i) => {
        let subtotal = item.harga * item.jumlah;
        totalHarga += subtotal;
        daftarBelanja += `${i + 1}. ${item.nama} (${item.jumlah}x) = Rp ${subtotal.toLocaleString('id-ID')}%0A`;
    });

    const pesan = `Halo, saya mau pesan keranjang belanja:%0A%0A` +
                  `*Daftar Produk:*%0A${daftarBelanja}%0A` +
                  `*Total Pembayaran:* Rp ${totalHarga.toLocaleString('id-ID')}%0A%0A` +
                  `*Nama Pemesan:* ${encodeURIComponent(nama)}%0A` +
                  `*Catatan/Request:* ${encodeURIComponent(catatan || '-')}`;

    window.open(`https://wa.me/${noHP}?text=${pesan}`, '_blank');
    
    keranjang = [];
    updateTampilanKeranjang();
    tutupKeranjang();
}