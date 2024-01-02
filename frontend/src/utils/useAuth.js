import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from './utils'

const useAuth = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const isNameValid = /^[A-Za-z\s]+$/.test(name);
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
    const isMobileValid = /^[6-9]\d{9}$/.test(mobile);
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

    const loginNotify = () => toast('Login successful ✅ ', {
        position: "top-center",
        theme: "light",
    });

    const signUpNotify = () => toast('User created successfully ✅ ', {
        position: "top-center",
        theme: "light",
    });

    const register = async () => {
        const signUpErrors = {
            name: !isNameValid ? "Enter a valid name" : "",
            email: !isEmailValid ? "Email address is invalid" : "",
            mobile: !isMobileValid ? "Enter a valid mobile number" : "",
            password: !isPasswordValid ? "Enter a valid password" : "",
            check: !isChecked ? "Check this box if you want to proceed" : "",
        }

        if (Object.values(signUpErrors).every(err => err === "")) {
            try {
                const result = await axios.post(`${API_URL}/api/register`, { name, email, mobile, password }, { headers: { "Content-Type": "application/json" } })
                if (result?.data?.message === `${result?.data?.reacruiterName} registered successfully`) {
                    localStorage.setItem("token", result?.data?.jwttoken)
                    localStorage.setItem("userName", result?.data?.reacruiterName)
                    signUpNotify()
                    navigate('/jobs')
                    setName('')
                    setEmail('')
                    setMobile('')
                    setPassword('')
                    setIsChecked(false)
                    setError('')
                }

            }
            catch (err) { setError(err) }

        } else {
            setError(signUpErrors)
        }
    }

    const login = async () => {
        const loginErrors = {
            email: !isEmailValid ? "Email address is invalid" : "",
            password: !password ? "Enter a valid password" : ""
        }

        if (Object.values(loginErrors).every(err => err === "")) {
            try {
                const result = await axios.post(`${API_URL}/api/login`, { email, password }, {
                    headers: { "Content-Type": "application/json" },
                })

                if (result?.data?.message === "Login successful") {
                    loginNotify()
                    localStorage.setItem("token", result?.data?.jwttoken)
                    localStorage.setItem("userName", result?.data?.reacruiterName)
                    navigate('/jobs')
                    setEmail('')
                    setPassword('')
                    setError('')
                }
            }
            catch (err) {
                setError(err)
                console.log(err)
            }

        } else {
            setError(loginErrors)
        }
    }

    return { register, login, name, setName, email, setEmail, mobile, setMobile, password, setPassword, isChecked, setIsChecked, error, setError }
}

export { useAuth }