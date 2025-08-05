import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            const payload = JSON.parse(token.split('.')[1])
            setUser({...payload, token})
        }
    },[])

    const login = async (credentials)=>{
        try {
            const response = await axios.post('http://localhost:3000/auth/login',credentials)

            const token = response.token
            localStorage.setItem('token', token)
            const payload = JSON.parse(token.split('.')[1])
            setUser({...payload, token})
            navigate('/')
        } catch (error) {
            alert("Hubo error al iniciar sesion")
        }
    }

    const register = async (userData) =>{
        try {
            const response = await axios.post('http://localhost:3000/auth/register', userData)
            if(response.status === 201){
                alert("Usuario creado exitosamente")
                navigate('/inicio-sesion')
            }else{
                alert(response.message)
            }
        } catch (error) {
            alert("Hubo un error al registrar el usuario")
        }
    }

    const logout = () =>{
        setUser(null)
        localStorage.removeItem('token')
        navigate('/inicio-sesion')
    }

    return(
        <AuthContext.Provider value={{user, setUser, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}