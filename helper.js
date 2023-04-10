import fs from "fs"
import noUiSlider from 'nouislider'
// email and password for thw website
const Email = "usamaalam1999@gmail.com"
const Password = "karachipakistan"

// down below function open the website and check if the cookies i have if exists then it will use them no need to login
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




// this function accept the button the formal cookies which pops up when web is open
// also then this function redirect to login function which also see if cookies presnt then return no need to run func
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


// this func acctually acting as an child component or func which was used in down below serachname func
// this func gets company name kellener city array page built in method 
//  it has static page.type for company becouse its same  then loop of city which is am array
const exitsitem = (async (company, city, page) => {

  await page.type('#recurrent_jobs_search_parameters_filterSearchterm', company)

 
  

  try {
    for (const cityonebyone of city) {

      console.log("hello")
      await page.waitForTimeout(1000)
      await page.evaluate((e) =>
        document.getElementById("recurrent_jobs_search_parameters_filterZipcode").value = "");
      await page.type('#recurrent_jobs_search_parameters_filterZipcode', cityonebyone)




      try {
        await page.waitForTimeout(1000)

        const thumb = await page.$('.noUi-handle');
        const slider = await page.$('.noUi-base');
        
        const thumbBoundingBox = await thumb.boundingBox();
        const sliderBoundingBox = await slider.boundingBox();
        
        await page.mouse.move(
          thumbBoundingBox.x + thumbBoundingBox.width / 2,
          thumbBoundingBox.y + thumbBoundingBox.height / 2,
        );
        
        await page.mouse.down();
        let v=0
        await page.mouse.move(
          // 1100,200,
          sliderBoundingBox.x + sliderBoundingBox.width,0,
          // sliderBoundingBox.y + sliderBoundingBox.height / 2,
          
          { steps: 20 } // specify the number of steps to simulate the dragging motion
          
        );
        console.log(v)
        
        await page.mouse.up();
        

        // const thumbBoundingBox = await thumb.boundingBox();
        // const thumbWidth = thumbBoundingBox.width;
        
        // // move the mouse to the center of the thumb
        // await page.mouse.move(thumbBoundingBox.x + thumbWidth / 2, thumbBoundingBox.y + thumbBoundingBox.height / 2);
        
        // // simulate a mouse button press
        // await page.mouse.down();
        
        // // move the mouse to the rightmost position of the slider
        // await page.mouse.move(thumbBoundingBox.x + thumbBoundingBox.width, thumbBoundingBox.y + thumbBoundingBox.height / 2);
        
        // // release the mouse button
        // await page.mouse.up();
   
  
      
        
        
        
        
        




        
       
         await page.waitForTimeout(1000)


     
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
        // await page.evaluate((t) => {
        //   const d = document.querySelector("#filter-zipcode-radius-slider > div.noUi-base > div.noUi-origin")
        //   d.style.transform = "translate(0%, 0px)"

        // })






      } catch (error) {
        console.log(error.message)
      }
      // console.log("me")

    }

  } catch (error) {
    console.log("input not found")

  }
})

export const SearchName = (async (company, city, page) => {
  await exitsitem(company, city, page)


})
// export const gettingproductname=(async(page)=>{
//     try {
//     await page.waitForSelector('.gridItem--Yd0sa')
//         const allpage=  await page.$$('.gridItem--Yd0sa')
//         console.log("uyys",allpage)
//         for (const iterator of allpage) {

//             // const p=await page.waitForSelector('span.currency--GVKjl')
//             const name=await page.evaluate((e) => {
//               return e.querySelector('span.currency--GVKjl').textContent

//             },iterator);
//             console.log(name)
//     }

//     } catch (error) {
//         console.log(error.message)
//     }


// })


const gettingcitynameJobsArtical = (async (page) => {

  await page.waitForSelector('.card-body')
  try {
    await page.waitForTimeout(1000)
    const AllarticalofSpecificcity = await page.$$('.recurrent-job-box')
    console.log(AllarticalofSpecificcity, "here its")
    // await page.goto("https://www.joboo.de/de/jobs-finden/suchformular")
    for (const iterator of AllarticalofSpecificcity) {




    }



  } catch (error) {

  }






})