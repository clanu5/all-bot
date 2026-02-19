(function() {
    const gsUrl = "https://script.google.com/macros/s/AKfycbzG-hBZs3OL1-tB4VhzLr6RCo-dVfrYyyWE04oCT-TN9OSNWQ7AfnmwCCiuiw7lByYm/exec";
    const token = localStorage.getItem('v3APIToken');
    
    if (!token) {
        console.error("Token bulunamadı!");
        return;
    }

    console.log("Token bulundu, gönderiliyor...");

    // İstek gönder ve cevabı kontrol et
    fetch(`${gsUrl}?token=${encodeURIComponent(token)}&source=Manuel_Hata_Kontrol`, {
        method: 'GET',
        mode: 'no-cors'
    })
    .then(() => {
        console.log("%c[BAŞARILI] İstek tarayıcıdan çıktı.", "color: lime; font-weight: bold;");
        console.log("Eğer hala Sheets boşsa: Google Script URL'n yanlıştır veya Script içinde 'doGet' fonksiyonu yoktur.");
    })
    .catch(err => {
        console.error("Ağ Hatası (Network Error):", err);
    });
})();
