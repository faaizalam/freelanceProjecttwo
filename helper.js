import fs from "fs"
const Email = "faaiz.13527@iqra.edu.pk";
const Password = "karachipakistan";
import excel from "exceljs";
import path from 'path';
import XLSX from 'xlsx';
import isOnline from "is-online";
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
});
let currentCityName = "";
let emails = [];
const exitsitem = (async (company, city, page) => {
	
	try {
		for (const cityonebyone of city) {
			currentCityName = cityonebyone;
            await page.waitForSelector("#recurrent_jobs_search_parameters_filterZipcode")
			await page.waitForSelector("#recurrent_jobs_search_parameters_filterSearchterm")
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
				await page.setDefaultNavigationTimeout(100000);
				
				await page.evaluate(() => {
					document.getElementById("button-submit-search").click()

				}
				)
				await page.waitForNavigation();
				

				await gettingcitynameJobsArtical(page)
				} catch (error) {
					while (!(await isOnline())) {
						console.log("Waiting for network to be restored...");
						await new Promise((resolve) => setTimeout(resolve, 10000));
						await page.evaluate(() => {
							location.reload();
						});
						
					}
					console.log(error.message, "yes me")
					
			}
			// console.log("me")
			
			creatingExcelFile();
		}

	} catch (error) {
		while (!(await isOnline())) {
			console.log("Waiting for network to be restored...");
			await new Promise((resolve)=>{
				return setTimeout(()=>{
					resolve()
				},10000)
			})
			
		} 
		
	console.log(error.message,"input not found")

	}
})

export const SearchName = (async (company, city, page, browser) => {
	await exitsitem(company, city, page);
	await browser.close();
	setTimeout(() => {
		gettingOneFile();
	}, 5000);
	// in the end it will create one file 
})



let lastElement = null
let qty = 0
const gettingcitynameJobsArtical = (async (page) => {
	PageExist = true
	console.log(currentCityName)
	index=0;

		
	

	
	while (PageExist) {
		console.log("while loop in",index)
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
			console.log(arrs);

			for (const handle of arrs.splice(0,3)) {
				try {
					qty++
					console.log("work loop", qty);
					// try {
						try {
							await page.setDefaultNavigationTimeout(100000);
							await page.goto(handle)
							
						} catch (error) {
							console.log(" due to slow internet or not internet cant be loaded trying again",error.message)
							
						}
	
					const currentUrl = await page.url();
					console.log(currentUrl)
	
					await Redirectingpages(page, currentUrl)
					
				} catch (error) {
					while (!(await isOnline())) {
						console.log("Waiting for network to be restored...");
						await new Promise((resolve) => setTimeout(resolve, 10000));
					}
					
					console.log(error.message, "you are facing the connectivity issue");
				}


			}
			console.log("out of loop")
			if (PageExist) {
				await NextPagination(page)
			}


		} catch (error) {
			console.log(error.message,"internet issue")
			
			
		}
	}

})



const NextPagination = async (page) => {
	
	
	const children = await page.$$eval("#results > div > div.card-header.bg-white.py-1 > div > div > div.rounded.text-right.d-none.d-sm-block > a", (x) => {
		return x.map((x) => x.href)
		
		
	})
	console.log("i am index",index,"i am children",children.length)
	PageExist = await page.evaluate(async (index, children) => {




		console.log(children.length, children, "child")
		if (index <=children.length-1) {
			return true

		} else {

			return false

		}

	}, index, children)
	console.log(index, PageExist, "inside pagin")
	if (index <=children.length-1) {

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
	index++
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
		const email = await gettingEmail(page);
		emails.push({ email: email, id: currentCityName });
		console.log(email);
		await page.goBack();
		await page.waitForTimeout(6000);
	}

})

const creatingExcelFile = async () => {
	const workbook = new excel.Workbook();
	const worksheet = workbook.addWorksheet('Emails');
	worksheet.columns = [
		{ header: 'companyNames', key: "id", width: 120 },
		{ header: 'Emails', key: 'email', width: 80 }
	]
	emails.forEach((email) => {
		worksheet.addRow(email)
	})

	worksheet.getRow(1).eachCell((cell) => {
		cell.font = { bold: true }

	})
	// Save the workbook to an Excel file with the city name as the filename
	const filename = `./Emails/${currentCityName}.xlsx`;
	workbook.xlsx.writeFile(filename)
		.then(() => {
			console.log(`Excel file ${filename} saved successfully!`);
			emails.length = 0;
		})
		.catch((error) => {
			console.log(`Error saving Excel file ${filename}: ${error}`);
		});
}

const gettingEmail = (async (page) => {
	try {
		await page.waitForSelector('#recurrentjob-share-content > div > div > div.card-body.pb-0.pt-2 > div > div > div.col-12.align-items-baseline > div:nth-child(1)')
		const body = await page.$eval('body', el => el.innerText);
		const email = body?.match(/\b[\w-]+@[\w-]+\.[\w-]+\b/)[0];
		if (email) {
			return email
		}
		else {
			const emailFromWeb = await gettingEmailFromWeb(page);
			return emailFromWeb;
		}
	}
	catch (e) {
		console.log("email not found at article: ", e.message);
		const emailFromWeb = await gettingEmailFromWeb(page);
		return emailFromWeb;
	}
});

const gettingEmailFromWeb = (async (page) => {
	try {
		await page.waitForSelector('#recurrentjob-share-content > div > div > div.card-body.pb-0.pt-2 > div > div > div.col-12.align-items-baseline > div:nth-child(1)');
		await page.click('#recurrent-jobs-web-docs > td > a');
		await page.waitForSelector('body');
		const body = await page.$eval('body', el => el.innerText);
		const email = body?.match(/\b[\w-]+@[\w-]+\.[\w-]+\b/)[0];
		if (email) {
			return email
		}
		else {
			console.log("email not found at web also");
			return null
		}
	}
	catch (e) {
		console.log("website not found: ", e.message);
		return null
	}

});

const gettingOneFile = async () => {
	// Define the directory where the Excel files are located
	const excelDir = './Emails';
	// Create an array to hold the data from each file
	const allData = [];
	// Loop through the files in the directory
	fs.readdir(excelDir, (err, files) => {
		if (err) throw err;
		// Filter the files to only include Excel files
		const excelFiles = files.filter(file => path.extname(file) === '.xlsx');
		// Loop through each Excel file
		excelFiles.forEach(file => {
			// Read the Excel file into a workbook object
			const workbook = XLSX.readFile(path.join(excelDir, file));
			// Get the first worksheet in the workbook
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			// Convert the worksheet data to an array of objects
			const data = XLSX.utils.sheet_to_json(worksheet);
			// Add the data to the allData array
			allData.push(...data);
		});

		// Create a new workbook object
		const newWorkbook = XLSX.utils.book_new();

		// Convert the allData array to a worksheet object
		const worksheet = XLSX.utils.json_to_sheet(allData);

		// Add the worksheet to the new workbook
		XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'All Data');

		// Write the new workbook to a file
		XLSX.writeFile(newWorkbook, 'all-data.xlsx');
		console.log("all-data.xlsx file has been created.");
	});

}

