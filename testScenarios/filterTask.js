const assert = require("assert");
const wd = require("wd");
const { default: click } = require("webdriverio/build/commands/element/click");

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

describe("Filter Task", function() {
  this.timeout(60000);

  before(async function() {
    await driver.init(androidOptions);
  });

  after(async function() {
    await driver.quit();
  });

  it('Deve filtrar tarefas corretamente', async () => {
    
    // adicionando primeira tarefa para depois filtrar
    const taskNameSelector = 'new UiSelector().text("Escolha o nome de uma tarefa")';
    const taskName = await driver.waitForElementByAndroidUIAutomator(taskNameSelector);
    await taskName.click()
    await taskName.sendKeys('Appium Automation');

    const concluirTask = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Tempo de conclusão (HH:MM)")')
    await concluirTask.click()
    await concluirTask.sendKeys('0200');

    const adicionarButton = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Adicionar")')
    await adicionarButton.click()

    await taskName.click()
    await taskName.sendKeys('Cypress Automation');
    await concluirTask.click()
    await concluirTask.sendKeys('0800');

    await adicionarButton.click()

    const markButton = await driver.waitForElementByXPath('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.TextView')
    const isDisplayedMarkButton = await markButton.isDisplayed();
    if (isDisplayedMarkButton) {
    console.log('O checkbox "Mark" está visível');
    } else {
    console.log('O checkbox "Mark" não está visível');
    }
    
    await markButton.click()
    await markButton.click()

    const todasFilterButton = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Todas")')
    await todasFilterButton.click()

    const pendentesFilterButton = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Pendentes")')
    await pendentesFilterButton.click()

    const concluidasFilterButton = await driver.waitForElementByAndroidUIAutomator('new UiSelector().text("Concluídas")')
    await concluidasFilterButton.click()
  });
});
