import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import authService from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{
    const [user,setUser] = useState(null)
    const navigate = useNavigate()
    const [justLoggedIn, setJustLoggedIn] = useState(false)

    const decodeUser = (token)=>{
        try {
            const decoded = jwtDecode(token)
            if(!decoded.exp || decoded.exp * 1000 < Date.now()){
                return null;
            }  
            console.log("decoded", decoded);
            
            return{
                id: decoded.user.id,
                nombre:decoded.user.nombre,
                email: decoded.user.email,
                edad: decoded.user.edad,
                role: decoded.user.role
            }
        } catch {
            return null
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(!token)return

        const userLogued = decodeUser(token)
        if(userLogued){
        setUser(userLogued)
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        }else{
            localStorage.removeItem('token')
            delete axios.defaults.headers.common["Authorization"]
            setUser(null)
        }
    },[])
    

    const login = async (credentials)=>{
        try {
            const {data, status} = await authService.login(credentials)
            if(status===200){
                const token = data?.token
                localStorage.setItem('token', token)

                const userLogued = decodeUser(token)
                console.log("userLogued", userLogued);
                if(!userLogued){
                    localStorage.removeItem('token')
                    throw new Error("Token inválido o expirado")  
                }
                setUser(userLogued)
                navigate('/')
            } else{
                alert('las credenciales son erroneas')
            }
        } catch (error) {
            console.log(error);
            throw error
        }
    }
    
    const register = async (userData) =>{
        try {
            const response = await axios.post('http://localhost:3000/auth/register', userData)
            if(response.status === 201){
                alert("Usuario creado exitosamente")
                navigate('/inicio-sesion')
            }else{
                throw new Error("Hubo un error al registrar el usuario")
            }
        } catch (error) {
            throw error
        }
    }

    const logout = () =>{
        setUser(null)
        localStorage.removeItem('token')
        delete axios.defaults.headers.common["Authorization"]
        navigate('/inicio-sesion')
    }

    const forgotPassword = async (email) =>{
        try {
            await axios.post('http://localhost:3000/auth/forgotPassword', {email})
            alert('revisa tu correo electronico')
            return true
        } catch (error) {
            console.error(error.response.data || error)
            return false
        }
    }

    const ResetPassword = async ({id, token, password}) =>{
        try {

            const bodyResetPassword={
                id: Number(id),
                token,
                password
            }
            const { data } = await axios.post('http://localhost:3000/auth/resetPassword', bodyResetPassword)
            console.log("Reset backend response:", data)

            alert('contraseña actualizada con exito')
            return true
        } catch (error) {
            console.error("hubo un error al actualizar la contraseña", error)
            return false
        }
    }

    return(
        <AuthContext.Provider value={{user, setUser, register, login, logout, justLoggedIn, setJustLoggedIn, forgotPassword, ResetPassword}}>
            {children}
        </AuthContext.Provider>
    )
}