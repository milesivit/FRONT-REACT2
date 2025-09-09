import api from "./api";

const usersService = {
    list: () => api.get('usuarios'),
    get: (id) => api.get(`usuarios/${id}`),
    create: (payload) => api.post('usuarios', payload),
    update: (id, payload) => api.put(`usuarios/${id}`, payload),
    //que es payload
    remove: (id) => api.detele(`usuarios/${id}`),
}

export default usersService