import api from "../services/api";

const authService ={
    login: (credentials) => api.post("auth/login",
        credentials
    )
    
}

export default authService