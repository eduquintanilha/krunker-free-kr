/**
 *  Title: Automated FreeKR Claim
 *  Description: A simple automated Selenium script to claim your FreeKR on Krunker.io game.
 *  Notice: This script is not intended to make money or break Krunker.io, it merely automates the process of getting KR points honestly, like manual process.
                We are not responsible for the misuse of this script to harm Krunker.io.
    Author: Eduardo Quintanilha 
    Github: @quintanilhaedu
    E-mail: eduardohq@pm.me
    License: ISC
 */

const {Builder, By, until} = require('selenium-webdriver');
const Selenium = require('selenium-webdriver/chrome');
const CFG = require('./config/configs');


const DOM_ELEMENTS = {
    BTN_OPEN_LOGIN: 'button lgn',
    INPUT_LOGIN: 'accName',
    INPUT_PASS: 'accPass',
    BTN_SUBMIT_LOGIN: 'accountButton',
    TIMER_FREE_KR: 'claimTimer',
    BTN_FREE_KR: 'claimImg'
}

async function openPage(url, driver){
    await driver.get(url); 
}

async function sleepTime(seconds) {
    await new Promise(resolve => setTimeout(resolve, seconds*1000));
}

async function findElementByClass(className, driver) {
    let loginBtn = await driver.findElement(By.className(className));
    return loginBtn;
}

async function findElementById(id, driver) {
    let loginBtn = await driver.findElement(By.id(id));
    return loginBtn;
}

async function clickOnElement(element) {
    if (element) 
        await element.click();
}

async function inputTextOnElement(element, text) {
    if (element && text) 
        await element.sendKeys(text);
}

async function executeJsOnPage(code, driver) {
    if (code && driver) {
        driver.executeScript(code);
    } 
}


async function Main(Driver) {
    await openPage(CFG.KRUNKER_URL, Driver);
    await sleepTime(3);

    //Open the page
    let loginBtn = await findElementByClass(DOM_ELEMENTS.BTN_OPEN_LOGIN, Driver);
    await sleepTime(2);
    //Find Login modal button elements
    if(loginBtn) {
        await clickOnElement(loginBtn); //Click on login modal button
        await sleepTime(0.5);
    }else {console.log(`Element ${loginBtn} not found`)}    

    //Find user Input element
    let loginInput = await findElementById(DOM_ELEMENTS.INPUT_LOGIN, Driver);
    if(loginInput) {
        //Click on user input element
        await clickOnElement(loginInput);
        await sleepTime(0.5);
        //Write user on input element
        await inputTextOnElement(loginInput, CFG.KRUNKER_USER);
        await sleepTime(0.5);
    }else {console.log(`Element ${loginBtn} not found`)} 

    //Find pass Input element
    let loginPass = await findElementById(DOM_ELEMENTS.INPUT_PASS, Driver);
    if(loginPass) {
        //Click on pass input element
        await clickOnElement(loginPass);
        await sleepTime(0.5);
        //Write pass on input element
        await inputTextOnElement(loginPass, CFG.KRUNKER_PASS);
        await sleepTime(0.5);
    }else {console.log(`Element ${loginPass} not found`)} 

    //Find login submit button
    let loginSubmit = await findElementByClass(DOM_ELEMENTS.BTN_SUBMIT_LOGIN, Driver);
    if(loginSubmit) {
        //Click on submit form login
        //await clickOnElement(loginSubmit);
        await sleepTime(0.5);
        //await clickOnElement(loginSubmit);
        await executeJsOnPage('loginAcc();',Driver);
    }else {console.log(`Element ${loginSubmit} not found`)} 
    
    
    await sleepTime(1);

    let claimImg = await findElementById(DOM_ELEMENTS.BTN_FREE_KR, Driver);
 
    if(claimImg) {
        await sleepTime(2);
        claimImg.getAttribute("src")
            .then((async src => {
                if(src.includes('claim_0')){
                    executeJsOnPage('claimReward();', Driver);
                } else {
                    let freeKrTimer = await findElementById(DOM_ELEMENTS.TIMER_FREE_KR, Driver);
                    freeKrTimer.getText().then((time) => console.log(`NOT YET :( \nRemaining time to claim your FreeKR => ${time} \n\n\tKeep the terminal open ;)`));
                }}))
            .catch((err) => console.log(`Error on get image FREE KR source`));
    } 
    await sleepTime(1);   
    Driver.quit();
}


async function execLoop() {
    if(CFG.KRUNKER_USER && CFG.KRUNKER_PASS){
    //Start loop    
    do {
        let options = new Selenium.Options();
        options.addArguments('disable-infobars');
        options.setUserPreferences({ credential_enable_service: false });
    
        const  DRIVER = new Builder()
            .setChromeOptions(options)
            .forBrowser('chrome')
            .build();
        DRIVER.manage().window().maximize();

        await Main(DRIVER);
        await sleepTime(7200); //every 2 hours = 7200 seconds
    } while(1==1);
    } else {
        console.log(`\n\n\tUser and password not found! Set the environment variable before execute.\n`);
        process.exit();
    }

}

execLoop();
