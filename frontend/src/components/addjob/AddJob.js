import React, { useState } from 'react'
import '../addjob/AddJob.css'
import { Dropdown } from './Dropdown'
import { JobDropdown } from './JobDropDown'
import bg from '../images/WallpaperDog-20567151 1.svg'
import axios from 'axios'


const AddJob = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        logoUrl: '',
        jobPosition: '',
        salary: '',
        location: '',
        jobDescription: '',
        aboutCompany: '',
        skillsRequired: '',
        information: '',
        jobType: '',
        jobPref: '',
    });
    const signupToken = localStorage.getItem('signupToken')
    const loginToken = localStorage.getItem('loginToken')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const Post = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/job', formData, {
                headers: {
                    body: JSON.stringify(formData),
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${loginToken || signupToken}`,
                }
            })

            if (response?.data?.message === "Job created successfully") {
                alert("jop post created successfully")
                setFormData({
                    companyName: '',
                    logoUrl: '',
                    jobPosition: '',
                    salary: '',
                    location: '',
                    jobDescription: '',
                    aboutCompany: '',
                    skillsRequired: '',
                    information: '',
                    jobType: '',
                    jobPref: '',
                })
            }

        }
        catch (err) { console.log('something went wrong: ', err) }

    }

    const addJobHandler = async () => {
        await Post()
    }

    return (
        <div className='add-job-div'>
            <form className='add-job-form' onSubmit={(e) => e.preventDefault()}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "700", paddingBottom: "0.5rem" }}>Add job description</h1>

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }} >Company Name</label>
                <input className='add-job-form-input' name='companyName' value={formData.companyName} onChange={(e) => handleChange(e)}
                    type='text' placeholder="Enter your company name here" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  >Add logo URL</label>
                <input className='add-job-form-input' name='logoUrl' value={formData.logoUrl} onChange={(e) => handleChange(e)}
                    type='text' placeholder="Enter the link" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  >Job Position </label>
                <input className='add-job-form-input' name='jobPosition' value={formData.jobPosition} onChange={(e) => handleChange(e)}
                    type='text' placeholder="Enter job position" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > Monthly salary </label>
                <input className='add-job-form-input' name='salary' value={formData.salary} onChange={(e) => handleChange(e)}
                    type='text' placeholder="Enter Amount in rupees" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > Job Type </label>
                <JobDropdown jobType={formData.jobType}
                    handleChange={handleChange} /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > Remote/office </label>
                <Dropdown jobPref={formData.jobPref} handleChange={handleChange} /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > Location </label>
                <input className='add-job-form-input' name='location' value={formData.location} onChange={(e) => handleChange(e)}
                    type='text' placeholder="Enter Location" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > Job Description </label>
                <input className='add-job-form-input0' name='jobDescription' value={formData.jobDescription} onChange={(e) => handleChange(e)}
                    type='text' placeholder="Type the job description" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > About Company </label>
                <input className='add-job-form-input0' name='aboutCompany' value={formData.aboutCompany} onChange={(e) => handleChange(e)}
                    type='text' placeholder="Type about your company" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > Skills Required </label>
                <input className='add-job-form-input' name='skillsRequired' value={formData.skillsRequired}
                    onChange={(e) => handleChange(e)}
                    type='text'
                    placeholder="Enter the must-have skills" /> <br />

                <label style={{ display: "inline-block", width: "9.5rem", fontWeight: "500" }}  > Information </label>
                <input className='add-job-form-input' name='information' value={formData.information} onChange={(e) => handleChange(e)}
                    type='text' placeholder="Enter the additional information" /> <br />

                <div style={{ paddingTop: "0.75rem", float: "right", paddingRight: "3.7rem", }}>
                    <button style={{
                        backgroundColor: "#fff", border: "1px solid #CECECE", color: "#CECECE", padding: "0.5rem 0.9rem", borderRadius: "0.325rem",
                    }}  >Cancel</button>
                    <button onClick={addJobHandler}
                        style={{
                            backgroundColor: "#ED5353", border: "none", color: "white", padding: "0.5rem 0.9rem", borderRadius: "0.325rem", marginLeft: "0.5rem"
                        }}  >+ Add Job</button>
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