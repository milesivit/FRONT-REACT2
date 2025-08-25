import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({childen}) => {
    const {user} = useContext(AuthContext)
    return user ? children : <Navigate to='/inicio-sesion'/>
}

export default PrivateRoute