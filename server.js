// servidor.js.
const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT });

let clientes = [];

wss.on('connection', (ws) => {
  console.log('Novo cliente conectado');
  clientes.push(ws);

  ws.on('message', (message) => {
    // Assume que o ESP envia um JSON
    console.log('Dados recebidos do ESP:', message);
    // Repassa a todos os navegadores conectados
    clientes.forEach((cliente) => {
      if (cliente !== ws && cliente.readyState === WebSocket.OPEN) {
        cliente.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
    clientes = clientes.filter(c => c !== ws);
  });
});

console.log('Servidor WebSocket rodando na porta 3000');
