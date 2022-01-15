


var request = require('request');



const puppeteer = require('puppeteer-extra')
const path = require('path');

console.clear();


function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }


exports.start = async ()=>
{
    // Add stealth plugin and use defaults (all tricks to hide puppeteer usage)
    const StealthPlugin = require('puppeteer-extra-plugin-stealth')
    puppeteer.use(StealthPlugin())

    // Add adblocker plugin to block all ads and trackers (saves bandwidth)
    //const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
    //puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

    let xpath = __dirname.split("\\").join("/");
    if(!xpath.endsWith("/")) xpath+="/";

    let brw = await puppeteer.launch({headless: false,
        defaultViewport: null, 
        timeout:60000,
       // args: ['--window-size=800,800', "--disable-notifications"],
        args: ['--app='+xpath+'index.html','--window-size=800,800' , '--no-sandbox', '--user-data-dir="/tmp/chromium"', '--disable-web-security'],
        //slowMo:10
        // executablePath: path.join(__dirname, './Application/chrome.exe')
    })

    const [page] = await brw.pages();


    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9'
    });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36');

    //await page.goto("https://patrickhlauke.github.io/recaptcha/", {waitUntil: 'load', timeout: 0})
    await page.goto("file:///C:/Users/Armin/Desktop/car/index.html", {waitUntil: 'load', timeout: 0})
    
    await page.setRequestInterception(true)

    setInterval(async () => {
        await page.mouse.click(100, 100);
    }, 300);
   
   
    // await page.evaluate(() => 
    // {
    //     let items = document.getElementsByTagName("li");

    //     for(let i of items)
    //     {
    //         if(i.innerText.trim() == "خرید")
    //         {
    //             i.click()
    //             break;
    //         } 
    //     }
    // });

        
}

setInterval(() => {
    
}, 1000);

exports.start();