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
        }else{
            localStorage.removeItem('token')
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
            const { status, message } = await authService.register(userData) 
            if(status === 201){
                alert("Usuario creado exitosamente")
                navigate('/inicio-sesion')
            }else{
                throw new Error(message)
            }
        } catch (error) {
            throw error
        }
    }

    const logout = () =>{
        setUser(null)
        localStorage.removeItem('token')
        navigate('/inicio-sesion')
    }

    const forgotPassword = async (email) =>{
        try {
            await authService.forgot(email)            
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
            await authService.reset(bodyResetPassword)
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