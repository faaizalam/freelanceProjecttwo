const Emails=[]
let ti=0

// export const Emailsystem = async(page,articals) => {
//     console.log(articals.length, "this is length");
//     try {
//         for (const iterator of articals) {
//             console.log("dekho")
//             await new Promise(r => setTimeout(r, 3000));
//             await page.waitForSelector("div.col-md-3.col-12.d-none.d-md-block.p-0.pr-3.pt-2 > span > a");
    
//             const elementHandle = await page.evaluateHandle((iterator) => {
//                 const element = document.querySelector("div.col-md-3.col-12.d-none.d-md-block.p-0.pr-3.pt-2 > span > a");
//                 return element;
//             }, iterator);

//             console.log(elementHandle, "i am ");
            
//             await elementHandle.click();
//             console.log("clicked");
            
//             await page.waitForNavigation();
   
//             await page.goBack();
//             await new Promise(r => setTimeout(r, 9000));
//         }
//     } catch (error) {
//         console.log(error.message);
        
//         await page.goBack();
//         console.log("clicked back catch");
//         await page.waitForTimeout(2000);
//     }
// }

