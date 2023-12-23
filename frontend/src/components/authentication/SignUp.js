import React from 'react'
import '../authentication/Authentication.css';
import bg from '../images/image 466.svg'
import { useAuth } from '../../utils/useAuth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const { register, name, setName, email, setEmail, mobile, setMobile, password, setPassword, isChecked, setIsChecked, error, } = useAuth()
    const navigate = useNavigate()

    const clickHandler = async () => {
        await register()
    }

    const toggle = () => {
        navigate('/login')
    }
    
    return (
        <div className='authentication'>
            <form onSubmit={(e) => e.preventDefault()}
                className='authentication-form'>
                <h1> Create an account</h1>
                <p>Your personal job finder is here</p>

                <input className={error.name ? "input-err" : 'input'} onChange={(e) => {
                    setName(e.target.value)
                }} value={name}
                    type="text" placeholder='Name' />
                <span className='error'>{error.name}</span>

                <input className={error.email ? "input-err" : 'input'} onChange={(e) => {
                    setEmail(e.target.value)
                }} value={email}
                    type="text" placeholder='Email' />
                <span className='error'>{error.email}</span>


                <input className={error.mobile ? "input-err" : 'input'} onChange={(e) => {
                    setMobile(e.target.value)
                }} value={mobile}
                    type="text" placeholder='Mobile' />

                <span className='error'>{error.mobile}</span>

                <input className={error.password ? "input-err" : 'input'} onChange={(e) => {
                    setPassword(e.target.value)
                }} value={password}
                    type="text" placeholder='Password' />
                <div className='error'>{error.password} </div>


                <div className='checkbox' >
                    <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                    <label> By creating an account, I agree to our terms of use and privacy policy</label>
                </div>

                <div className='error'>{error.check}</div>

                <button onClick={clickHandler}
                    className='auth-btn'>  Create Account
                </button>
                <p className='toggle'>Already have an account?
                    <strong onClick={toggle} > Sign In</strong>
                </p>

            </form>
            <div className='authentication-img-div'>
                <img src={bg} alt='background' />
                <h2 className='img-div-h2'>Your Personal Job Finder</h2>
            </div>
        </div>
    )
}

export { SignUp }