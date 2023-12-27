import React from 'react'
import '../header/Header.css'
import { useIsLoggedIn } from '../../utils/useIsLoggedIn'
import { Link, useNavigate } from 'react-router-dom'
import { useLogOut } from '../../utils/useLogOut'


const Header = () => {
    const { isLoggedIn } = useIsLoggedIn()
    const userName = localStorage.getItem('userName')
    const { logout } = useLogOut()
    const navigate = useNavigate()

    const logoutHandler = () => {
        logout()
    }

    return (
        <div className='header'>
            <div onClick={() => navigate('/')}
                style={{ padding: "1.5rem 7.8rem", color: "white", zIndex: "10", fontSize: "1.5rem", cursor: "pointer" }}>Jobfinder</div>

            {isLoggedIn ?
                (<div style={{ display: "flex", alignItems: "center", padding: "1.5rem 7.8rem", zIndex: "10" }}>
                    <p onClick={logoutHandler}
                        style={{ color: "white", }}>Logout</p>
                    <p style={{ color: "white", padding: "0 1rem" }}>Hello! {userName}</p>
                    <img style={{ width: "3rem", height: "3rem", borderRadius: "3rem" }} src='https://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2240,c_limit/phonepicutres-TA.jpghttps://media.wired.com/photos/598e35994ab8482c0d6946e0/master/w_2240,c_limit/phonepicutres-TA.jpg' alt='pic' />
                </div>)
                :
                (<div style={{ padding: "1.5rem 7.8rem", zIndex: "10" }}>
                    <Link to='/login'>
                        <button
                            style={{
                                background: "#ED5353", border: "1px solid #fff", borderRadius: "0.35rem",
                                outline: "none", color: 'white', width: "5rem", height: "2rem", margin: " 0 0.75rem",
                            }}>Login</button>
                    </Link>

                    <Link to='/signup'>
                        <button
                            style={{
                                background: "#fff", border: "none", borderRadius: "0.35rem", width: "5rem",
                                outline: "none", color: '#ED5353', height: "2rem",
                            }}>
                            Register</button>
                    </Link>
                </div>)


            }

            <svg style={{ position: "absolute", objectFit: "cover", top: "-40%", right: "40%" }} xmlns="http://www.w3.org/2000/svg" width="390" height="94" viewBox="0 0 390 94" fill="none">
                <path d="M0 0H390L104.665 87.75L93.015 91.4154C68.2633 99.2033 41.5584 87.5523 30.4315 64.1111L0 0Z" fill="#FF6B6B" />
            </svg>

            <svg style={{ position: "absolute", bottom: "0", left: "0" }} xmlns="http://www.w3.org/2000/svg" width="349" height="63" viewBox="0 0 349 63" fill="none">
                <path d="M0 0L349 63H55C24.6243 63 0 38.3757 0 8V0Z" fill="#FF6B6B" />
            </svg>

            <svg style={{
                position: "absolute", objectFit: "cover", top: "-55%", right: "7.75rem"

            }} xmlns="http://www.w3.org/2000/svg" width="405" height="139" viewBox="0 0 405 139" fill="none">
                <path d="M0 0H381.5L394.5 68.5L404.232 121.28C405.932 130.498 398.855 139 389.481 139H135.734C109.156 139 82.8212 133.928 58.1436 124.057C28.8646 112.346 8.53189 85.3189 5.39409 53.9409L0 0Z" fill="#FF6B6B" />
            </svg>
        </div>
    )
}

export { Header }
