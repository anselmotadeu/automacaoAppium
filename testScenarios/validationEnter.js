const assert = require("assert");
const wd = require("wd");

const androidOptions = {
  platformName: "Android",
  deviceName: "createApp",
  app: "/Users/anselmosantos/Documents/automacao-toDoApp-React/app/ToDo.apk",
  automationName: "UiAutomator2",
  dontStopAppOnReset: true
};

const driver = wd.promiseChainRemote({
  hostname: "127.0.0.1",
  port: 4723,
  path: "/wd/hub",
});

describe("Validation Task", function() {
  this.timeout(60000);

  before(async function() {
    await driver.init(androidOptions);
  });

  after(async function() {
    await driver.quit();
  });

  it('Deve validar a visibilidade de todos os elementos', async () => {
    
    // adicionando primeira tarefa para depois filtrar
    const taskNameSelector = 'new UiSelector().text("Escolha o nome de uma tarefa")';
    const taskName = await driver.waitForElementByAndroidUIAutomator(taskNameSelector);
    const isDisplayedTaskName = await taskName.isDisplayed();
    if (isDisplayedTaskName) {
    console.log('O campo "Definir nome da Tarefa" está visível');
    } else {
    console.log('O campo "Definir nome da Tarefa" não está visível');
    }

    const nameTitle = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Lista de Tarefas")')
    const isDisplayedNameTitle = await nameTitle.isDisplayed();
    if (isDisplayedNameTitle) {
    console.log('O título "Lista de Tarefas" está visível');
    } else {
    console.log('O título "Lista de Tarefas" não está visível');
    }

    const concluirTask = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Tempo de conclusão (HH:MM)")')
    const isDisplayedConcluirTask = await concluirTask.isDisplayed();
    if (isDisplayedConcluirTask) {
    console.log('O campo "Tempo de Conclusão" está visível');
    } else {
    console.log('O campo "Tempo de Conclusão" não está visível');
    }

    const adicionarButton = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Adicionar")')
    const isDisplayedAdicionarButton = await adicionarButton.isDisplayed();
    if (isDisplayedAdicionarButton) {
    console.log('O botão "Adicionar" está visível');
    } else {
    console.log('O botão "Adicionar"  não está visível');
    }

    const todasFilterButton = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Todas")')
    const isDisplayedTodasFilterButton = await todasFilterButton.isDisplayed();
    if (isDisplayedTodasFilterButton) {
    console.log('O filtro "Todas" está visível');
    } else {
    console.log('O filtro "Todas" não está visível');
    }

    const pendentesFilterButton = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Pendentes")')
    const isDisplayedPendentesFilterButton = await pendentesFilterButton.isDisplayed();
    if (isDisplayedPendentesFilterButton) {
    console.log('O filtro "Pendentes" está visível');
    } else {
    console.log('O filtro "Pendentes" não está visível');
    }

    const concluidasFilterButton = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Concluídas")')
    const isDisplayedConcluidasFilterButton = await concluidasFilterButton.isDisplayed();
    if (isDisplayedConcluidasFilterButton) {
    console.log('O filtro "Concluídas" está visível');
    } else {
    console.log('O filtro "Concluídas" não está visível');
    }
  });
});
