// server.js - Express backend to handle form submissions
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const ExcelJS = require('exceljs');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create temp directories if they don't exist
const tempDir = path.join(__dirname, 'temp');
const uploadsDir = path.join(__dirname, 'temp/uploads');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only pdf and doc/docx files
  if (file.mimetype === 'application/pdf' || 
      file.mimetype === 'application/msword' || 
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, DOC, or DOCX files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB max file size
  },
  fileFilter: fileFilter
});

// Middleware - IMPORTANT: ORDER MATTERS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL || 'https://dreamcatchplacement.com' 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// For regular JSON data
app.use(bodyParser.json({ limit: '10mb' }));
// For handling form data - IMPORTANT for multer to work properly
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Email configuration
const configureTransporter = () => {
  // Check if required environment variables are set
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Warning: Email credentials not set in environment variables');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail', // or another service like 'outlook', 'yahoo', etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// API endpoint to handle application submissions
app.post('/api/submit-application', upload.single('resume'), async (req, res) => {
  console.log('Received application submission');
  
  try {
    // Check if applicationData exists in the request
    if (!req.body.applicationData) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing applicationData in request' 
      });
    }
    
    // Parse application data from the request
    let applicationData;
    try {
      applicationData = JSON.parse(req.body.applicationData);
    } catch (parseError) {
      console.error('Error parsing application data:', parseError);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid applicationData format' 
      });
    }
    
    const { newApplication, allApplications } = applicationData;
    
    if (!newApplication || !allApplications) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields in applicationData' 
      });
    }
    
    console.log('Processing application for:', newApplication.fullName);
    
    // Create Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Applications');
    
    // Define columns
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
    
    // Add all applications to the worksheet
    worksheet.addRows(allApplications);
    
    // Create a temporary file path for the Excel file
    const excelFilePath = path.join(tempDir, `applications.xlsx`);
    
    // Write Excel file
    await workbook.xlsx.writeFile(excelFilePath);
    console.log('Excel file created at:', excelFilePath);
    
    // Initialize email transporter
    const transporter = configureTransporter();
    
    if (!transporter) {
      console.log('Email transporter not configured, skipping email send');
      
      // Even if email can't be sent, we'll save the application and return success
      return res.status(200).json({ 
        success: true, 
        message: 'Application saved (email not sent - missing configuration)'
      });
    }

    if (!process.env.RECIPIENT_EMAIL) {
      console.warn('Warning: Recipient email not set in environment variables');
      return res.status(200).json({ 
        success: true, 
        message: 'Application saved (email not sent - missing recipient)'
      });
    }
    
    // Prepare email attachments array
    const attachments = [
      {
        filename: 'job_applications.xlsx',
        path: excelFilePath
      }
    ];

    // Add resume attachment if it was uploaded
    if (req.file) {
      attachments.push({
        filename: `resume_${newApplication.fullName.replace(/\s+/g, '_')}_${Date.now()}${path.extname(req.file.originalname)}`,
        path: req.file.path
      });
    }
    
    // Send email with attachments
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: 'New Job Application Received',
      html: `
        <h2>New Job Application Received</h2>
        <p>A new application has been submitted by ${newApplication.fullName}.</p>
        
        <h3>Personal Information:</h3>
        <ul>
          <li><strong>Full Name:</strong> ${newApplication.fullName}</li>
          <li><strong>Age:</strong> ${newApplication.age}</li>
          <li><strong>Mobile Number:</strong> ${newApplication.mobileNumber}</li>
          <li><strong>Email:</strong> ${newApplication.email}</li>
          <li><strong>City:</strong> ${newApplication.city}</li>
        </ul>
        
        <h3>Educational Background:</h3>
        <ul>
          <li><strong>Education:</strong> ${newApplication.education}</li>
          <li><strong>College Name:</strong> ${newApplication.collegeName}</li>
          <li><strong>Year of Passout:</strong> ${newApplication.passoutYear}</li>
          <li><strong>10th Marks (%):</strong> ${newApplication.marks10th}</li>
          <li><strong>12th Marks (%):</strong> ${newApplication.marks12th}</li>
          <li><strong>Graduation Marks (%):</strong> ${newApplication.marksGraduation}</li>
        </ul>
        
        <h3>Professional Details:</h3>
        <ul>
          <li><strong>Skills:</strong> ${newApplication.skills}</li>
          <li><strong>Job Role:</strong> ${newApplication.jobRole}</li>
          <li><strong>Work Experience:</strong> ${newApplication.workExperience || 'None'}</li>
          <li><strong>Resume:</strong> ${req.file ? 'Attached' : 'Not provided'}</li>
          <li><strong>Submitted On:</strong> ${newApplication.submittedOn}</li>
        </ul>
        
        <p>Please find attached an Excel file with all applications received so far${req.file ? ' and the applicant\'s resume' : ''}.</p>
      `,
      attachments: attachments
    };
    
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Still return success as the application was processed
      return res.status(200).json({ 
        success: true, 
        message: 'Application saved but email failed to send' 
      });
    }
    
    //Clean up the temporary files
    try {
      fs.unlinkSync(excelFilePath);
      console.log('Temporary Excel file cleaned up');
    } catch (cleanupError) {
      console.warn('Warning: Could not clean up temporary file:', cleanupError);
    }
    
    res.status(200).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error processing application:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing application', 
      error: error.message
    });
  }
});

// Add a test endpoint to verify server is running
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for testing
module.exports = app;