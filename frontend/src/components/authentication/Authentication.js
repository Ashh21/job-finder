import React, { useState } from 'react'
import '../authentication/Authentication.css';
import bg from '../images/image 466.svg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Authentication = () => {
    const [signIn, setSignIn] = useState(false)
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
                const result = await axios.post('http://localhost:4000/api/register', { name, email, mobile, password }, { headers: { "Content-Type": "application/json" } })
                if (result?.data?.message === `${result?.data?.reacruiterName} registered successfully`) {
                    localStorage.setItem("signupToken", result?.data?.jwttoken)
                    localStorage.setItem("userName", result?.data?.reacruiterName)
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
                const result = await axios.post('http://localhost:4000/api/login', { email, password }, {
                    headers: { "Content-Type": "application/json" },
                })

                if (result?.data?.message === "Login successful") {
                    alert('Login successful')
                    localStorage.setItem("loginToken", result?.data?.jwttoken)
                    localStorage.setItem("userName", result?.data?.reacruiterName)
                    navigate('/jobs')
                    setEmail('')
                    setPassword('')
                    setError('')
                }


            }
            catch (err) { setError(err) }

        } else {
            setError(loginErrors)
        }
    }

    const clickHandler = async () => {
        if (!signIn) {
            register()
        } else {
            login()
        }
    }

    const toggle = () => {
        setSignIn(!signIn)
    }

    return (
        <div className='authentication'>
            <form onSubmit={(e) => e.preventDefault()}
                className='authentication-form'>
                <h1>
                    {signIn ? "Already have an account?" : "Create an account"}
                </h1>

                <p>Your personal job finder is here</p>

                {!signIn &&
                    <input className={error.name ? "input-err" : 'input'} onChange={(e) => {
                        setName(e.target.value)
                    }} value={name}
                        type="text" placeholder='Name' />
                }
                {!signIn && <span className='error'>{error.name}</span>}

                <input className={error.email ? "input-err" : 'input'} onChange={(e) => {
                    setEmail(e.target.value)
                }} value={email}
                    type="text" placeholder='Email' />
                <span className='error'>{error.email}</span>

                {!signIn &&
                    <input className={error.mobile ? "input-err" : 'input'} onChange={(e) => {
                        setMobile(e.target.value)
                    }} value={mobile}
                        type="text" placeholder='Mobile' />
                }
                {!signIn && <span className='error'>{error.mobile}</span>}

                <input className={error.password ? "input-err" : 'input'} onChange={(e) => {
                    setPassword(e.target.value)
                }} value={password}
                    type="text" placeholder='Password' />
                <div className='error'>{error.password} </div>

                {!signIn &&
                    <div className='checkbox' >
                        <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                        <label> By creating an account, I agree to our terms of use and privacy policy</label>
                    </div>
                }
                {!signIn && <div className='error'>{error.check}</div>}

                <button onClick={clickHandler}
                    className='auth-btn'> {signIn ? "Sign in" : "Create Account"}
                </button>
                <p className='toggle'>{signIn ? " Don’t have an account?" : "Already have an account? "}
                    <strong onClick={toggle}>
                        {signIn ? " Sign Up" : " Sign In"}
                    </strong>
                </p>

            </form>
            <div className='authentication-img-div'>
                <img src={bg} alt='background' />
                <h2 className='img-div-h2'>Your Personal Job Finder</h2>
            </div>
        </div>
    )
}

export { Authentication }