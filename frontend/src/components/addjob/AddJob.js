import React, { useState } from 'react'
import '../addjob/AddJob.css'
import { Dropdown } from './Dropdown'
import { JobDropdown } from './JobDropDown'
import bg from '../images/WallpaperDog-20567151 1.svg'


const AddJob = () => {

    const [companyName, setCompanyName] = useState("");
    const [logoUrl, setLogoUrl] = useState("");
    const [jobPosition, setJobPosition] = useState("");
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [jobDescription, setJobDescription] = useState("");
    const [aboutCompany, setAboutCompany] = useState("");
    const [skills, setSkills] = useState([]);
    const [information, setInformation] = useState("");

    return (
        <div className='add-job-div'>
            <form className='add-job-form' onSubmit={(e) => e.preventDefault()}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "700", paddingBottom: "0.5rem" }}>Add job description</h1>

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }} >Company Name</label>
                <input className='add-job-form-input' value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                    type='text' placeholder="Enter your company name here" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  >Add logo URL</label>
                <input className='add-job-form-input' value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)}
                    type='text' placeholder="Enter the link" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  >Job Position </label>
                <input className='add-job-form-input' value={jobPosition} onChange={(e) => setJobPosition(e.target.value)}
                    type='text' placeholder="Enter job position" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > Monthly salary </label>
                <input className='add-job-form-input' value={salary} onChange={(e) => setSalary(e.target.value)}
                    type='text' placeholder="Enter Amount in rupees" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > Job Type </label>
                <JobDropdown /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > Remote/office </label>
                <Dropdown /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > Location </label>
                <input className='add-job-form-input' value={location} onChange={(e) => setLocation(e.target.value)}
                    type='text' placeholder="Enter Location" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > Job Description </label>
                <input className='add-job-form-input0' value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
                    type='text' placeholder="Type the job description" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > About Company </label>
                <input className='add-job-form-input0' value={aboutCompany} onChange={(e) => setAboutCompany(e.target.value)}
                    type='text' placeholder="Type about your company" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > Skills Required </label>
                <input className='add-job-form-input' value={skills} onChange={(e) => setSkills(e.target.value)}
                    type='text' placeholder="Enter the must have skills" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > Information </label>
                <input className='add-job-form-input' value={information} onChange={(e) => setInformation(e.target.value)}
                    type='text' placeholder="Enter the additional information" /> <br />

                <div style={{ paddingTop: "0.75rem", float: "right", paddingRight: "3.7rem", }}>
                    <button style={{
                        backgroundColor: "#fff", border: "1px solid #CECECE", color: "#CECECE", padding: "0.5rem 0.9rem", borderRadius: "0.325rem",
                    }} >Cancel</button>
                    <button style={{
                        backgroundColor: "#ED5353", border: "none", color: "white", padding: "0.5rem 0.9rem", borderRadius: "0.325rem", marginLeft: "0.5rem"
                    }} >+Add Job</button>
                </div>
            </form>
            <div className='add-job-img'>
                <img src={bg} alt='background' />
                <h2 className='add-job-img-h2'>Recruiter add job details here</h2>
            </div>
        </div>
    )
}

export { AddJob }