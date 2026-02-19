let client = PalringoWebConnection;
let lastFishTimestamp = 0;
let messageQueue = [];
let isProcessing = false;

let _sendMessage = (targetId, content, isGroup) => {
  let packet = {
    body: {
      recipient: targetId,
      isGroup: isGroup,
      mimeType: 'text/plain',
      data: new TextEncoder().encode(content).buffer,
      flightId: Math.random().toString(36).substring(7),
      metadata: undefined,
      embeds: undefined,
    }
  };
  return client.socket.emit('message send', packet);
};

let sendGroupMessage = (targetId, content) => _sendMessage(targetId, content, true);

async function processQueue() {
  if (isProcessing || messageQueue.length === 0) return;
  isProcessing = true;
  const { groupId, command } = messageQueue.shift();
  console.warn(`Sıradaki gruba mesaj gönderiliyor: ${groupId} - ${command}`);
  sendGroupMessage(groupId, command);
  lastFishTimestamp = Date.now();
  setTimeout(() => {
    isProcessing = false;
    processQueue();
  }, 10000);
}

client.socket.on('message send', async function (data) {
  let message = data.body;
  message.text = new TextDecoder().decode(message.data);
  let groupId = message.recipient;

  if (message.originator === 32060007 && (message.text.includes('fishing_bot/assets/refill/0/refill.png') || message.text.includes('إضافي لجميع أعضاء هذه'))) {
    console.warn('Fish doldu, kuyruğa eklendi:', groupId);
    messageQueue.push({ groupId, command: commandMap.fish });
  } else if (message.originator === 76305584 && message.text.includes('إضافي لجميع أعضاء هذه')) {
    console.warn('Hunt doldu, kuyruğa eklendi:', groupId);
    messageQueue.push({ groupId, command: commandMap.hunt });
  } else if (message.originator === 39369782 && message.text.includes('إضافي لجميع أعضاء هذه')) {
    console.warn('Heist doldu, kuyruğa eklendi:', groupId);
    messageQueue.push({ groupId, command: commandMap.heist });
  } else if (message.originator === 45578849 && (message.text.includes('herosquad_bot/assets/unite/0/bg_groupUnite.jpg') || message.text.includes('إضافي لجميع أعضاء هذه'))) {
    console.warn('Hero doldu, kuyruğa eklendi:', groupId);
    messageQueue.push({ groupId, command: commandMap.hero });
  }

  if (!isProcessing) {
    processQueue();
  }
});
