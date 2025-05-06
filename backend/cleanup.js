// clearBeforeDeployment.js - One-time script to clear Excel data before deployment

const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

// Define paths
const tempDir = path.join(__dirname, 'temp');
const excelFilePath = path.join(tempDir, 'applications.xlsx');
const uploadsDir = path.join(__dirname, 'temp/uploads');

async function clearExcelData() {
  console.log('Starting Excel data cleanup process...');
  
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
      console.log(`✅ Created temp directory at ${tempDir}`);
    }

    // Check if the Excel file exists
    if (fs.existsSync(excelFilePath)) {
      console.log(`Found Excel file at ${excelFilePath}. Removing it...`);
      
      // Delete the existing file to ensure clean state
      fs.unlinkSync(excelFilePath);
      console.log(`✅ Removed existing Excel file`);
    }
    
    // Create a new workbook with just headers
    console.log('Creating new Excel file with headers only...');
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Applications');
    
    // Define columns (same as in your server.js)
    worksheet.columns = [
      // Personal Information
      { header: 'Full Name', key: 'fullName', width: 20 },
      { header: 'Age', key: 'age', width: 8 },
      { header: 'Mobile Number', key: 'mobileNumber', width: 15 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'City', key: 'city', width: 15 },
      
      // Educational Background
      { header: 'Education', key: 'education', width: 25 },
      { header: 'College Name', key: 'collegeName', width: 30 },
      { header: 'Year of Passout', key: 'passoutYear', width: 15 },
      { header: '10th Marks (%)', key: 'marks10th', width: 12 },
      { header: '12th Marks (%)', key: 'marks12th', width: 12 },
      { header: 'Graduation Marks (%)', key: 'marksGraduation', width: 12 },
      
      // Professional Details
      { header: 'Skills', key: 'skills', width: 40 },
      { header: 'Job Role', key: 'jobRole', width: 25 },
      { header: 'Work Experience', key: 'workExperience', width: 40 },
      { header: 'Resume', key: 'resume', width: 25 },
      { header: 'Submitted On', key: 'submittedOn', width: 20 }
    ];
    
    // Make sure the first row is created for headers
    worksheet.getRow(1).values = worksheet.columns.map(col => col.header);
    
    // Save the workbook
    await workbook.xlsx.writeFile(excelFilePath);
    console.log(`✅ New Excel file created with headers at ${excelFilePath}`);
    
    // Check the file size to confirm it was written correctly
    const stats = fs.statSync(excelFilePath);
    console.log(`File size: ${stats.size} bytes`);
    
    // Clean up any resume files in the temp/uploads folder
    if (fs.existsSync(uploadsDir)) {
      try {
        const files = fs.readdirSync(uploadsDir);
        if (files.length > 0) {
          for (const file of files) {
            // Skip if directory
            const filePath = path.join(uploadsDir, file);
            if (fs.statSync(filePath).isDirectory()) continue;
            
            fs.unlinkSync(filePath);
          }
          console.log(`✅ Cleared ${files.length} files from the uploads directory`);
        } else {
          console.log('ℹ️ No files found in uploads directory');
        }
      } catch (err) {
        console.warn('⚠️ Warning: Could not clean up all files in uploads directory', err);
        console.error(err);
      }
    } else {
      console.log('ℹ️ Uploads directory does not exist, creating it...');
      // Create the directory for future uploads
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log(`✅ Created uploads directory at ${uploadsDir}`);
    }
    
    console.log('✅ Data cleanup process completed successfully!');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    console.error(error.stack);
  }
}

// Run the cleanup function
clearExcelData().then(() => {
  console.log('Excel cleanup script finished execution');
}).catch(err => {
  console.error('Unhandled error in script:', err);
});