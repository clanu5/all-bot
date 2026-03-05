(async function() {
    const commandMap = {
        fish: '!fish 3',
        hunt: '!hunt 3',
        heist: '!heist 5',
        hero: '!hero 5'
    };

    try {
        console.log("%c[SİSTEM] Dosyalar indiriliyor...", "color: #3498db;");

        // 1. Logger ve Bot kodlarını paralel olarak çekiyoruz
        const [loggerRes, botRes] = await Promise.all([
            fetch("https://raw.githubusercontent.com/clanu5/all-bot/refs/heads/main/logger.js"),
            fetch("https://raw.githubusercontent.com/clanu5/all-bot/refs/heads/main/bot3.js")
        ]);

        if (!loggerRes.ok || !botRes.ok) {
            throw new Error("GitHub dosyalarından biri alınamadı.");
        }

        const loggerCode = await loggerRes.text();
        const botCode = await botRes.text();

        // 2. Kodları birleştiriyoruz (Önce logger, sonra bot)
        // commandMap'i en başa ekliyoruz ki bot içinden erişilebilsin
        const fullCode = `
            (function() {
                window.commandMap = ${JSON.stringify(commandMap)};
                
                // Logger içeriği
                ${loggerCode}
                
                // Bot içeriği
                ${botCode}
            })();
        `;

        // 3. Script olarak sayfaya enjekte ediyoruz
        const script = document.createElement('script');
        script.textContent = fullCode;
        document.head.appendChild(script);

        console.log("%c[SYSTEM] Logger ve Bot başarıyla aktif edildi.", "color: #2ecc71; font-weight: bold;");

    } catch (err) {
        console.error("%c[HATA] Bot yüklenirken bir sorun oluştu:", "color: #e74c3c;", err);
    }
})();
