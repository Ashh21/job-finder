
import { useNavigate } from 'react-router-dom';

const useLogOut = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        navigate('/')
    }

    return {logout}
}

export {useLogOut}