import fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';

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
});
