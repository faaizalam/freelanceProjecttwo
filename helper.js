import fs from "fs"
const Email = "faaiz.13527@iqra.edu.pk"
const Password = "karachipakistan"

let PageExist = true
let index = 0

export const OpenWebsite = (async (url, page) => {
  await page.goto(url)
  console.log("opened Website")

  if (fs.existsSync('./cookiess.json')) {

    const gettingcookies = await fs.promises.readFile("./cookiess.json")
    const savecook = JSON.parse(gettingcookies)
    console.log("checking cookies")
    if (savecook) {
      console.log("yes cookies present")

      await page.setCookie(...savecook)
      return
    }

  } else {
    console.log("you are not logged in let us take to login fisrt")

  }

})

export const Acceptcookies = (async (url, page) => {
  try {

    // await page.waitForTimeout(2000)
    const Acceptbutton = await page.waitForSelector("#cookie-preferences-alert > div > div.row.align-items-center.mb-2 > div > button.btn.btn-flat.btn-sm.btn-success.cookie-preferences-alert-cta.w-100.mx-0.cookies-accept-all-cta")
    await Acceptbutton.click()
    await page.waitForTimeout(1000)
    console.log("accepted the cookies")

    try {
      await LoginAndsaving(page)

    } catch (error) {
      console.log("eroor login")
    }

  } catch (error) {
    console.log("not found cookies button")
  }


})

// this is the login function i explained above in Acceptcookies func
const LoginAndsaving = (async (page) => {
  console.log("verifying if logged in or not")

  if (fs.existsSync('./cookiess.json')) {
    return

  }
  await page.goto("https://www.joboo.de/de/einloggen")
  await page.type("#username", Email)

  await page.type("#password", Password)

  await page.waitForSelector("#_submit")
  await page.evaluate(() => {
    document.querySelector("#_submit").click()
  })

  await page.waitForTimeout(1000)
  await page.goto("https://www.joboo.de/de/jobs-finden/suchformular")
  // await waitForNavigation()

  const cook = await page.cookies()
  await fs.promises.writeFile('./cookiess.json', JSON.stringify(cook, null, 2))
})
const exitsitem = (async (company, city, page) => {





  try {
    for (const cityonebyone of city) {

      await page.waitForTimeout(1000)

      await page.evaluate((e) =>
        document.getElementById("recurrent_jobs_search_parameters_filterSearchterm").value = "");
      await page.type('#recurrent_jobs_search_parameters_filterSearchterm', company)
      await page.waitForTimeout(1000)
      await page.evaluate((e) =>
        document.getElementById("recurrent_jobs_search_parameters_filterZipcode").value = "");
      await page.type('#recurrent_jobs_search_parameters_filterZipcode', cityonebyone)




      try {
        await page.waitForTimeout(2000)

        const thumb = await page.$('.noUi-handle');
        const slider = await page.$('.noUi-base');

        const thumbBoundingBox = await thumb.boundingBox();
        const sliderBoundingBox = await slider.boundingBox();

        await page.mouse.move(
          thumbBoundingBox.x + thumbBoundingBox.width / 2,
          thumbBoundingBox.y + thumbBoundingBox.height / 2,
        );

        await page.mouse.down();
        let v = 0
        await page.mouse.move(
          // 1100,200,
          sliderBoundingBox.x + sliderBoundingBox.width, 0,
          // sliderBoundingBox.y + sliderBoundingBox.height / 2,

          { steps: 20 } // specify the number of steps to simulate the dragging motion

        );
        console.log(v)

        await page.mouse.up();

        await page.waitForTimeout(3000)



        await page.waitForSelector("#button-submit-search")
        await page.evaluate(() => {
          document.getElementById("button-submit-search").click()

        }
        )
        await page.waitForNavigation();
        // here getting start getting pages and click on them

        await gettingcitynameJobsArtical(page)
        await page.evaluate((e) =>
          document.getElementById("recurrent_jobs_search_parameters_filterZipcode").value = "");
      } catch (error) {
        console.log(error.message, "yes me")
      }
      // console.log("me")

    }

  } catch (error) {
    console.log("input not found")

  }
})

export const SearchName = (async (company, city, page, browser) => {
  await exitsitem(company, city, page)
  await browser.close();
})



let lastElement = null
let qty = 0
const gettingcitynameJobsArtical = (async (page) => {
  PageExist = true
  while (PageExist) {
    console.log("while loop in")
    await page.waitForTimeout(2000)
    PageExist = await page.evaluate(() => {
      // div.rounded.text-right.d-none.d-sm-block
      const parentDiv = document.querySelector("div.rounded.text-right.d-none.d-sm-block") !== null;
      return parentDiv

    });
    console.log(PageExist)
    try {

      const arrs = await page.$$eval('div.col-md-3.col-12.d-none.d-md-block.p-0.pr-3.pt-2 > span > a', elements => {
        return elements.map(e => e.href); // return the href attribute of each <a> element
        // return Array.from(elements);
      });

      console.log(arrs)
      let n = arrs.splice(10, 2)

      for (const handle of n) {
        qty++
        console.log("work loop", qty);
        // try {

        await page.goto(handle)

        const currentUrl = await page.url();
        console.log(currentUrl)

        await Redirectingpages(page, currentUrl)


      }
      console.log("out of loop")
      if (PageExist) {
        await NextPagination(page)
      }


    } catch (error) {
      console.log("my error page problem")
      console.log(error.message);
    }
  }
})



const NextPagination = async (page) => {
  index++

  const children = await page.$$eval("div.rounded.text-right.d-none.d-sm-block > a", (x) => {
    return x.map((x) => x.href)

  })
  PageExist = await page.evaluate(async (index, children) => {




    console.log(children.length, children, "child")
    if (index < children.length) {

      // const href = await element.$eval('a', a => a.href);
      // await page.goto(href)
      return true

    } else {

      return false

    }

  }, index, children)
  console.log(index, PageExist, "inside pagin")
  if (index < children.length) {

    try {
      // const element = children[index].click()
      await page.goto(children[index]);
      console.log("went to")
    } catch (error) {
      // await OpenWebsite()
      return error.message

    }
  } else {
    await page.goto("https://www.joboo.de/de/jobs-finden/suchformular")
  }
  await page.waitForTimeout(2000)

}






const Redirectingpages = (async (page, currentUrl) => {

  if (currentUrl.includes("weiterleitung-zu-stellenanzeige")) {
    console.log("this job artical has been removed")
    await new Promise(r => setTimeout(r, 2000));
    await page.goBack()
    await page.waitForTimeout(6000);

  } else {

    await new Promise(r => setTimeout(r, 4000));
    await page.goBack();
    await page.waitForTimeout(6000);

  }

})