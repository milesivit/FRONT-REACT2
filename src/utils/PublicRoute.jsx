import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    return user ? children : <Navigate to='/inicio-sesion'/>
}

export default PublicRoute