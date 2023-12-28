import React, { useContext, useEffect, useState } from 'react'
import '../home/Home.css'
import { Header } from '../header/Header'
import { JobCard } from './JobCard'
import { useNavigate } from 'react-router-dom'
import { StateContext } from '../../utils/useContext'
import { useIsLoggedIn } from '../../utils/useIsLoggedIn'
import { useSearch } from '../../utils/useSearch'
import { jwtDecode } from "jwt-decode";
import { useLogOut } from '../../utils/useLogOut'

const Home = () => {
    const [skillsFilter, setSkillsFilter] = useState([])
    const [positionFilter, setPositionFilter] = useState('')
    const options = ['Select', 'javascript', 'html', 'css', 'reactjs', 'nodejs', 'express', 'mongodb', 'mongoose', 'python']
    const { searchJobs, fetchData } = useSearch(skillsFilter, positionFilter)
    const navigate = useNavigate()
    const { isLoggedIn } = useIsLoggedIn()
    const { setEditId, setEditing } = useContext(StateContext)
    const { logout } = useLogOut()

    const handleClearFilter = () => {
        setPositionFilter('')
        setSkillsFilter('')
        fetchData()
    };

    const handleSearch = async () => {
        await fetchData()
    }

    const handleAddJob = () => {
        if (!isLoggedIn) {
            navigate('/login')
        } else {
            setEditing(false)
            setEditId('')
            navigate('/addJob')
        }
    }

    const checkTokenExpiry = () => {
        const token = localStorage.getItem('token')
        if (token) {
            const decodedToken = jwtDecode(token)
            const currentTime = Date.now() / 1000
            console.log("expiry : ", decodedToken.exp)

            if (decodedToken.exp < currentTime) {
                logout()
            }
            else {
                const timeRemaining = (decodedToken.exp - currentTime) * 1000
                setTimeout(logout, timeRemaining)
                console.log("timeRemaining : ", timeRemaining)
            }
        }
    }

    useEffect(() => {
        checkTokenExpiry()
    }, [])


    return (
        <div className='home'>
            <Header />
            <div className='filter-div'>
                <input className='filter-input' value={positionFilter}
                    onChange={(e) => setPositionFilter(e.target.value)
                    }
                    type='text' placeholder='Type any job title' />
                <svg onClick={handleSearch}
                    style={{ position: "absolute", top: "18.5%", left: "18%", height: '1rem', margin: "0 0.5rem" }} xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                    <path d="M21.3073 19.4279L27 25.1193L25.1193 27L19.4279 21.3073C17.3103 23.0049 14.6763 23.9282 11.9622 23.9244C5.35906 23.9244 0 18.5653 0 11.9622C0 5.35906 5.35906 0 11.9622 0C18.5653 0 23.9244 5.35906 23.9244 11.9622C23.9282 14.6763 23.0049 17.3103 21.3073 19.4279ZM18.6411 18.4417C20.3279 16.707 21.2699 14.3818 21.2661 11.9622C21.2661 6.82111 17.1019 2.65827 11.9622 2.65827C6.82111 2.65827 2.65827 6.82111 2.65827 11.9622C2.65827 17.1019 6.82111 21.2661 11.9622 21.2661C14.3818 21.2699 16.707 20.3279 18.4417 18.6411L18.6411 18.4417Z" fill="#9C9C9C" />
                </svg>


                <select className="dropdown-button" value={skillsFilter} onChange={(e) => setSkillsFilter(e.target.value)}>
                    {options.map((option, index) => (
                        <option className='dropdown-list' key={index} value={option}>{option}</option>
                    ))}
                </select>

                <button onClick={handleClearFilter}>clear</button>

                <button onClick={handleAddJob}
                    className='job-btn '>+ Add job</button>
            </div>

            <>
                {
                    searchJobs?.map(job => (
                        <JobCard key={job._id} job={job} />
                    ))
                }
            </>
        </div>
    )
}

export { Home }