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

describe("Edit Task", function() {
  this.timeout(60000);

  before(async function() {
    await driver.init(androidOptions);
  });

  after(async function() {
    await driver.quit();
  });

  it('Deve editar tarefas corretamente', async () => {
    
    // adicionando primeira tarefa para depois marcar
    const taskNameSelector = 'new UiSelector().text("Escolha o nome de uma tarefa")';
    const taskName = await driver.waitForElementByAndroidUIAutomator(taskNameSelector);
    await taskName.click()
    await taskName.sendKeys('Appium Automation');

    const concluirTask = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Tempo de conclusão (HH:MM)")')
    await concluirTask.click()
    await concluirTask.sendKeys('0200');

    const adicionarButton = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Adicionar")')
    await adicionarButton.click()

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
  });
});
