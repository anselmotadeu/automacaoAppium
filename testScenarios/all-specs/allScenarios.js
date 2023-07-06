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

describe("All Scenarios", function() {
  this.timeout(60000);

  before(async function() {
    await driver.init(androidOptions);
  });

  after(async function() {
    await driver.quit();
  });

  it('Deve executar todas as funcionalidades do app', async () => {
    const taskNameSelector = 'new UiSelector().text("Escolha o nome de uma tarefa")';
    const taskName = await driver.waitForElementByAndroidUIAutomator(taskNameSelector);
    const isDisplayedTaskName = await taskName.isDisplayed();
    
    if (isDisplayedTaskName) {
      console.log('O campo "Escolha o nome de uma tarefa" está visível');
    } else {
      console.log('O campo "Escolha o nome de uma tarefa" não está visível');
    }

    await taskName.click()
    await taskName.sendKeys('Appium Automation');

    const concluirTask = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Tempo de conclusão (HH:MM)")')
    const isDisplayedconCluirTask = await concluirTask.isDisplayed();
    if (isDisplayedconCluirTask) {
    console.log('O campo "Tempo de conclusão (HH:MM)" está visível');
    } else {
    console.log('O campo "Tempo de conclusão (HH:MM)" não está visível');
    }

    await concluirTask.click()
    await concluirTask.sendKeys('0200');

    const adicionarButton = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Adicionar")')
    const isDisplayedAdicionarButton = await adicionarButton.isDisplayed();
    if (isDisplayedAdicionarButton) {
    console.log('O botão "Adicionar" está visível');
    } else {
    console.log('O botão "Adicionar" não está visível');
    }

    await adicionarButton.click()

    const taskAdicionada1 = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Appium Automation - 2 horas")')
    const isDisplayedTaskAdicionada1 = await taskAdicionada1.isDisplayed();
    if (isDisplayedTaskAdicionada1) {
    console.log('A tarefa adicionada "Appium Automation" está visível');
    } else {
    console.log('A tarefa adicionada "Appium Automation" não está visível');
    }

    // adicionando a segunda tarefa
    await taskName.click()
    await taskName.sendKeys('Entrevista');
    await concluirTask.click()
    await concluirTask.sendKeys('0045');
    await adicionarButton.click()

    const taskAdicionada2 = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Entrevista - 45 minutos")')
    const isDisplayedTaskAdicionada2 = await taskAdicionada2.isDisplayed();
    if (isDisplayedTaskAdicionada2) {
    console.log('A tarefa adicionada "Entrevista" está visível');
    } else {
    console.log('A tarefa adicionada "Entrevista" não está visível');
    }

    // adicionando a terceira tarefa
    await taskName.click()
    await taskName.sendKeys('Apresentação');
    await concluirTask.click()
    await concluirTask.sendKeys('0030');
    await adicionarButton.click()

    const taskAdicionada3 = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Apresentação - 30 minutos")')
    const isDisplayedTaskAdicionada3 = await taskAdicionada3.isDisplayed();
    if (isDisplayedTaskAdicionada3) {
    console.log('A tarefa adicionada "Apresentação" está visível');
    } else {
    console.log('A tarefa adicionada "Apresentação" não está visível');
    }

    // adicionando a quarta tarefa
    await taskName.click()
    await taskName.sendKeys('Dia de Trabalho');
    await concluirTask.click()
    await concluirTask.sendKeys('0800');
    await adicionarButton.click()

    const taskAdicionada4 = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Dia de Trabalho - 1 dia")')
    const isDisplayedTaskAdicionada4 = await taskAdicionada4.isDisplayed();
    if (isDisplayedTaskAdicionada4) {
    console.log('A tarefa adicionada "Dia de Trabalho" está visível');
    } else {
    console.log('A tarefa adicionada "Dia de Trabalho" não está visível');
    }

    // edição da Task
    const editButton = await driver.waitForElementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[1]/android.widget.TextView')
    const isDisplayedEditButton = await editButton.isDisplayed();
    if (isDisplayedEditButton) {
    console.log('O ícone "Edit" está visível');
    } else {
    console.log('O ícone "Edit" não está visível');
    }
    
    await editButton.click()
    await editButton.click()

    const taskNameAdd = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Appium Automation")')
    await taskNameAdd.click()
    await taskNameAdd.clear()

    const campoTaskVazio = await driver.waitForElementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.EditText')
    await campoTaskVazio.sendKeys('Appium Automation JS');
    await editButton.click()

    const isDisplayedCampoTaskVazio = await campoTaskVazio.isDisplayed();
    if (isDisplayedCampoTaskVazio) {
    console.log('Após edição da tarefa o nome "Appium Automation JS" está visível');
    } else {
    console.log('Após edição da tarefa o nome "Appium Automation JS" não está visível');
    }
    await editButton.click()

    // exclusão da Task
    const deleteButton = await driver.waitForElementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[2]/android.widget.TextView')
    const isDisplayedDeleteButton = await deleteButton.isDisplayed();
    if (isDisplayedDeleteButton) {
    console.log('O botão "Delete" está visível');
    } else {
    console.log('O botão "Delete" não está visível');
    }

    await deleteButton.click()
    await deleteButton.click()

    const deleteButton2 = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Excluir")')
    await deleteButton2.click()

    // marcar a Task como concluída
    const markButton = await driver.waitForElementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView')
    const isDisplayedMarkButton = await markButton.isDisplayed();
    if (isDisplayedMarkButton) {
    console.log('O checkbox "Mark" está visível');
    } else {
    console.log('O checkbox "Mark" não está visível');
    }
    
    await markButton.click()
    await markButton.click()

    // filtrar as Tasks
    const todasFilterButton = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Todas")')
    await todasFilterButton.click()

    const pendentesFilterButton = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Pendentes")')
    await pendentesFilterButton.click()

    const concluidasFilterButton = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Concluídas")')
    await concluidasFilterButton.click()

    await todasFilterButton.click()

    // adicionando uma nova tarefa
    await taskName.click()
    await taskName.sendKeys('Trilha de Estudos')
    await concluirTask.click()
    await concluirTask.sendKeys('0800')
    await adicionarButton.click()

    // adicionando uma nova tarefa
    await taskName.click()
    await taskName.sendKeys('Code Review')
    await concluirTask.click()
    await concluirTask.sendKeys('0900')
    await adicionarButton.click()

    // adicionando uma nova tarefa
    await taskName.click()
    await taskName.sendKeys('Garrafa de Água')
    await concluirTask.click()
    await concluirTask.sendKeys('1000')
    await adicionarButton.click()

    // adicionando uma nova tarefa
    await taskName.click()
    await taskName.sendKeys('Alinhamento com o Time')
    await concluirTask.click()
    await concluirTask.sendKeys('1100')
    await adicionarButton.click()

    // adicionando uma nova tarefa
    await taskName.click()
    await taskName.sendKeys('Mapeamento de tasks')
    await concluirTask.click()
    await concluirTask.sendKeys('1600')
    await adicionarButton.click()

    // adicionando uma nova tarefa
    await taskName.click()
    await taskName.sendKeys('Desenvolvimento com RN')
    await concluirTask.click()
    await concluirTask.sendKeys('2300')
    await adicionarButton.click()
  });
});
