import puppeteer from 'puppeteer';
import {Acceptcookies, OpenWebsite, SearchName}  from './helper.js';
const url = "https://www.joboo.de/de/jobs-finden/suchformular";
const company = "Kellner";
const city=["Arnstein","Freudenberg"];



(async () => {
  const browser = await puppeteer.launch({
    headless: false,
       
      defaultViewport:null,
         args: ["--start-maximized"]

  });
   
  const page = await browser.newPage();

  await page.setViewport({
    width: 1280,
    height: 500,
    deviceScaleFactor: 1,
});

try {
    await OpenWebsite(url,page)
    
    await Acceptcookies(url,page)
    // await gettingproductname(page)
    await SearchName(company,city,page)
} catch (error) {
    console.log(error.message)
    
}





//   await page.goto('https://example.com');



//   await page.screenshot({ path: 'example.png' });

  // await browser.close();



})();