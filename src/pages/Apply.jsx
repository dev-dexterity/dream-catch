import React, { useState, useEffect } from 'react';
import img from '../assets/apply.png'
import './Apply.css';

const Apply = () => {
    const [formData, setFormData] = useState({
        // Personal Information
        fullName: '',
        age: '',
        mobileNumber: '',
        email: '',
        city: '',
        
        // Educational Background
        education: '',
        collegeName: '',
        passoutYear: '2023',
        marks10th: '',
        marks12th: '',
        marksGraduation: '',
        
        // Professional Details
        skills: '',
        jobRole: '',
        workExperience: '',
        resume: null
    });

    const [resumeFileName, setResumeFileName] = useState('');
    const [applications, setApplications] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Load existing applications from localStorage on component mount
    useEffect(() => {
        const savedApplications = localStorage.getItem('dreamCatchApplications');
        if (savedApplications) {
            setApplications(JSON.parse(savedApplications));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('File size exceeds 2MB. Please choose a smaller file.');
                e.target.value = '';
                return;
            }

            // Check file type
            const fileType = file.type;
            if (fileType !== 'application/pdf' && 
                fileType !== 'application/msword' && 
                fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                alert('Please upload only PDF or DOC/DOCX files.');
                e.target.value = '';
                return;
            }

            setFormData(prevState => ({
                ...prevState,
                resume: file
            }));
            setResumeFileName(file.name);
        }
    };

    const sendApplicationByEmail = async (newApplication, allApplications) => {
        setIsSubmitting(true);
        setSubmitStatus('sending');

        try {
            // Create form data for multipart/form-data to handle file upload
            const formDataToSend = new FormData();
            
            // Add resume file if it exists
            if (formData.resume) {
                formDataToSend.append('resume', formData.resume);
            }
            
            // Add application data as JSON
            formDataToSend.append('applicationData', JSON.stringify({
                newApplication,
                allApplications
            }));

            // Define the API URL - adjust based on your environment
            const apiUrl = process.env.NODE_ENV === 'production'
                ? '/api/submit-application'  // For production
                : 'http://localhost:5000/api/submit-application'; // For development

            console.log('Submitting application to:', apiUrl);

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formDataToSend,
                credentials: 'include', // Include cookies in the request
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Network response was not ok');
            }

            console.log('Submission successful:', responseData);
            setSubmitStatus('success');
            setTimeout(() => setSubmitStatus(null), 5000);
        } catch (error) {
            console.error('Error submitting application:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);

        // Create new application with timestamp (excluding the actual resume file)
        const newApplication = {
            ...formData,
            resume: formData.resume ? formData.resume.name : 'No resume uploaded',
            submittedOn: new Date().toLocaleString()
        };

        // Update applications array
        const updatedApplications = [...applications, newApplication];

        // Save to localStorage for persistence
        localStorage.setItem('dreamCatchApplications', JSON.stringify(updatedApplications));

        // Update state
        setApplications(updatedApplications);

        // Send application data to your email
        sendApplicationByEmail(newApplication, updatedApplications);

        // Reset form
        setFormData({
            // Personal Information
            fullName: '',
            age: '',
            mobileNumber: '',
            email: '',
            city: '',
            
            // Educational Background
            education: '',
            collegeName: '',
            passoutYear: '2023',
            marks10th: '',
            marks12th: '',
            marksGraduation: '',
            
            // Professional Details
            skills: '',
            jobRole: '',
            workExperience: '',
            resume: null
        });
        setResumeFileName('');
    };

    return (
        <div className="apply-container">
            <div className="apply-hero">
                <div className="apply-content">
                    <h2>Apply Now</h2>
                    <p>Join Dream Catch IT Training and Placement — fill in your details and take a step closer to your dream job.</p>
                </div>
                <div className="apply-image">
                    <img src={img} alt="Apply Now Image" />
                </div>
            </div>

            <div className="apply-form-section">
                <h3>Application Form</h3>
                <form className="application-form" onSubmit={handleSubmit}>
                    {/* Personal Information Section */}
                    <div className="form-section-header">
                        <h4>Personal Information</h4>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your complete name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            placeholder="Your age"
                            value={formData.age}
                            onChange={handleChange}
                            min="18"
                            max="70"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <input
                            type="tel"
                            id="mobileNumber"
                            name="mobileNumber"
                            placeholder="Your contact number"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10-digit mobile number"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email ID</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            placeholder="Your current city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Educational Background Section */}
                    <div className="form-section-header">
                        <h4>Educational Background</h4>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="education">Education</label>
                        <input
                            type="text"
                            id="education"
                            name="education"
                            placeholder="Your highest qualification (e.g., B.Tech, MBA, etc.)"
                            value={formData.education}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="collegeName">College Name</label>
                        <input
                            type="text"
                            id="collegeName"
                            name="collegeName"
                            placeholder="Name of your college/university"
                            value={formData.collegeName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="passoutYear">Year of Passout</label>
                        <select
                            id="passoutYear"
                            name="passoutYear"
                            value={formData.passoutYear}
                            onChange={handleChange}
                            required
                            className="year-select"
                        >
                            {Array.from({ length: 15 }, (_, i) => 2010 + i).map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="marks10th">10th Marks (%)</label>
                        <input
                            type="number"
                            id="marks10th"
                            name="marks10th"
                            placeholder="Your 10th standard percentage"
                            value={formData.marks10th}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="marks12th">12th Marks (%)</label>
                        <input
                            type="number"
                            id="marks12th"
                            name="marks12th"
                            placeholder="Your 12th standard percentage"
                            value={formData.marks12th}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="marksGraduation">Graduation Marks (%)</label>
                        <input
                            type="number"
                            id="marksGraduation"
                            name="marksGraduation"
                            placeholder="Your graduation percentage"
                            value={formData.marksGraduation}
                            onChange={handleChange}
                            min="0"
                            max="100"
                            step="0.01"
                            required
                        />
                    </div>

                    {/* Professional Details Section */}
                    <div className="form-section-header">
                        <h4>Professional Details</h4>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="skills">Skills</label>
                        <textarea
                            id="skills"
                            name="skills"
                            placeholder="List your technical or professional skills (e.g., Java, Digital Marketing, Python, etc.)"
                            value={formData.skills}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="jobRole">Specific Job Role Interested In</label>
                        <input
                            type="text"
                            id="jobRole"
                            name="jobRole"
                            placeholder="e.g., Java Developer, Digital Marketer, etc."
                            value={formData.jobRole}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="workExperience">Work Experience (if any)</label>
                        <textarea
                            id="workExperience"
                            name="workExperience"
                            placeholder="Mention company, role, duration — leave blank if none"
                            value={formData.workExperience}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group file-upload">
                        <label htmlFor="resume">Upload Resume (PDF/DOC – Max 2MB)</label>
                        <div className="file-input-container">
                            <input
                                type="file"
                                id="resume"
                                name="resume"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                className="file-input"
                            />
                            <div className="file-input-button">Choose File</div>
                            <div className="file-name">{resumeFileName || 'No file chosen'}</div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>

                    {submitStatus && (
                        <div className={`submit-status ${submitStatus}`}>
                            {submitStatus === 'sending' && 'Sending your application...'}
                            {submitStatus === 'success' && 'Application submitted successfully! We will contact you soon.'}
                            {submitStatus === 'error' && 'There was an error submitting your application. Please try again.'}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Apply;