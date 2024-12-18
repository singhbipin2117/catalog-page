const fs = require('fs');
const xlsx = require('xlsx');
const nunjucks = require('nunjucks');
const path = require('path');

// Configure Nunjucks to use the templates folder
nunjucks.configure('templates', { autoescape: true });

// Function to read Excel data
const getDataFromExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  return data;
};

// Load data from Excel
const filePath = './catalog.xlsx'; // Replace with your Excel file path
const catalogData = getDataFromExcel(filePath);

// Render the HTML using Nunjucks
const outputHTML = nunjucks.render('index.njk', { catalogData });

// Write the HTML to a file
fs.writeFileSync('index.html', outputHTML);

console.log('index.html has been generated successfully!');
