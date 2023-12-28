import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "./useContext";
import { API_URL } from "./utils";

const useAddJob = () => {

    const [companyName, setCompanyName] = useState('')
    const [logoUrl, setLogoUrl] = useState('')
    const [jobPosition, setJobPosition] = useState('')
    const [salary, setSalary] = useState('')
    const [location, setLocation] = useState('')
    const [jobDescription, setJobDescription] = useState('')
    const [aboutCompany, setAboutCompany] = useState('')
    const [skillsRequired, setSkillsRequired] = useState('')
    const [information, setInformation] = useState('')
    const [jobType, setJobType] = useState('')
    const [jobPref, setJobPref] = useState('')
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const formData = { companyName, logoUrl, jobPosition, salary, location, jobDescription, aboutCompany, skillsRequired, information, jobType, jobPref }
    const newFormData = {
        setCompanyName,
        setLogoUrl,
        setJobPosition,
        setSalary,
        setLocation,
        setJobDescription,
        setAboutCompany,
        setSkillsRequired,
        setInformation,
        setJobType,
        setJobPref,
    }

    const { editId, editing } = useContext(StateContext)

    const addJob = async () => {
        try {
            const response = await axios.post(`${API_URL}/api/job`, formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,
                    }
                })

            if (response?.data?.message === "Job created successfully") {
                alert("jop post created successfully")
                setCompanyName("")
                setLogoUrl("")
                setJobPosition("")
                setSalary("")
                setLocation("")
                setJobDescription("")
                setAboutCompany("")
                setSkillsRequired("")
                setInformation("")
                setJobType("")
                setJobPref("")
                navigate('/jobs')
            }
            if (response?.data?.error?.message === "jwt expired") {
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                navigate('/login')
            }

        }
        catch (err) { console.log('something went wrong: ', err) }
    }

    const fetchDataById = async () => {
        try {
            const data = await fetch(`${API_URL}/api/job/${editId}`)
            const json = await data.json()

            setCompanyName(json?.job?.companyName)
            setLogoUrl(json?.job?.logoUrl)
            setJobPosition(json?.job?.jobPosition)
            setSalary(json?.job?.salary)
            setLocation(json?.job?.location)
            setJobDescription(json?.job?.jobDescription)
            setAboutCompany(json?.job?.aboutCompany)
            setSkillsRequired(json?.job?.skillsRequired)
            setInformation(json?.job?.information)
            setJobType(json?.job?.jobType)
            setJobPref(json?.job?.jobPref)
        }
        catch (err) { console.log('fetched error: ', err) }
    }


    const updateJob = async () => {
        try {
            const response = await axios.patch(`${API_URL}/api/job/${editId}`, formData, {
                headers: {
                    body: JSON.stringify(formData),
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                }
            })
            if (response?.data?.message === "success") {
                navigate('/jobs')
            }
            if (response?.data?.error?.message === "jwt expired") {
                localStorage.removeItem('token');
                localStorage.removeItem('userName');
                navigate('/login')
            }

        } catch (err) {
            console.log("Error while updating : ", err)
        }
    }

    useEffect(() => {
        if (editing) {
            fetchDataById()
        }
    }, [editId, editing])

    return { formData, newFormData, addJob, updateJob, }
}

export { useAddJob }