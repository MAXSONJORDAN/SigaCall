const { exec } = require('child_process');

// Executa o comando 'next start'
const processo = exec('npm run start');

// Lida com a saída do comando
processo.stdout.on('data', (dados) => {
  console.log(`Saída: ${dados}`);
});

// Lida com erros do comando
processo.stderr.on('data', (erro) => {
  console.error(`Erro: ${erro}`);
});

// Captura o evento de conclusão do comando
processo.on('close', (codigo) => {
  console.log(`O comando foi encerrado com código ${codigo}`);
});
