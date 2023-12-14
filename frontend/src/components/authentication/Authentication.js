import React, { useState } from 'react'
import '../authentication/Authentication.css';
import bg from '../images/image 466.svg'


const Authentication = () => {
    const [signIn, setSignIn] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setPassword] = useState('')


    const clickHandler = () => {

    }

    const toggle = () => {
        setSignIn(!signIn)
    }

    return (
        <div className='authentication'>
            <form onSubmit={(e) => e.preventDefault()}
                className='authentication-input-div'>
                <h1>
                    {signIn ? "Already have an account?" : "Create an account"}
                </h1>

                <p>Your personal job finder is here</p>

                {!signIn &&
                    <input className='input' onChange={(e) => {
                        setName(e.target.value)
                    }} value={name}
                        type="text" placeholder='Name' />
                }

                <input className='input' onChange={(e) => {
                    setEmail(e.target.value)
                }} value={email}
                    type="text" placeholder='Email' />

                {!signIn &&
                    <input className='input' onChange={(e) => {
                        setMobile(e.target.value)
                    }} value={mobile}
                        type="text" placeholder='Mobile' />
                }
                <input className='input' onChange={(e) => {
                    setPassword(e.target.value)
                }} value={password}
                    type="text" placeholder='Password' />

                {!signIn &&
                    <div className='checkbox' >
                        <input type="checkbox" />
                        <label> By creating an account, I agree to our terms of use and privacy policy</label>
                    </div>
                }

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