import { useEffect, useState } from 'react'

const useIsLoggedIn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const token = localStorage ? localStorage.getItem('token') : null

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [token])


    return isLoggedIn;
}

export { useIsLoggedIn }