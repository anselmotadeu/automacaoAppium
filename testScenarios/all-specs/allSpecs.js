const { spawn } = require('child_process');

// Lista de arquivos de teste
const testFiles = [
  'testScenarios/addTask.js',
  'testScenarios/editTask.js',
  'testScenarios/markTest.js',
  'testScenarios/filterTask.js',
  'testScenarios/deleteTask.js',
  'testScenarios/validationEnter.js',
  'testScenarios/all-specs/allScenarios.js'
];

// Função para executar um arquivo de teste
function runTestFile(file) {
  return new Promise((resolve, reject) => {
    const mochaProcess = spawn('npx', ['mocha', file]);

    mochaProcess.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Test file ${file} failed with exit code ${code}`));
      }
    });

    mochaProcess.stdout.pipe(process.stdout);
    mochaProcess.stderr.pipe(process.stderr);
  });
}

// Função para executar os testes sequencialmente
async function runTests() {
  for (const file of testFiles) {
    console.log(`Executando o arquivo de teste: ${file}`);
    try {
      await runTestFile(file);
      console.log(`Teste concluído: ${file}\n`);
    } catch (error) {
      console.error(`Erro ao executar o teste: ${file}`);
      console.error(error);
    }
  }
}

runTests();