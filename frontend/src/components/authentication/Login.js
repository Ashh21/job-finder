import React from 'react'
import '../authentication/Authentication.css';
import bg from '../images/image 466.svg'
import { useAuth } from '../../utils/useAuth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login, email, setEmail, password, setPassword, error, } = useAuth()
    const navigate = useNavigate()

    const clickHandler = async () => {
        await login()
    }

    const toggle = () => {
        navigate('/signup')
    }

    return (
        <div className='authentication'>
            <form onSubmit={(e) => e.preventDefault()}
                className='authentication-form'>
                <h1> Already have an account?</h1>
                <p>Your personal job finder is here</p>


                <input className={error.email ? "input-err" : 'input'} onChange={(e) => {
                    setEmail(e.target.value)
                }} value={email}
                    type="text" placeholder='Email' />
                <span className='error'>{error.email}</span>


                <input className={error.password ? "input-err" : 'input'} onChange={(e) => {
                    setPassword(e.target.value)
                }} value={password}
                    type="text" placeholder='Password' />
                <div className='error'>{error.password} </div>


                <button onClick={clickHandler}
                    className='auth-btn'>  Sign in
                </button>
                <p className='toggle'>Don’t have an account?
                    <strong onClick={toggle} > Sign Up</strong>
                </p>

            </form>
            <div className='authentication-img-div'>
                <img src={bg} alt='background' />
                <h2 className='img-div-h2'>Your Personal Job Finder</h2>
            </div>
        </div>
    )
}

export { Login }