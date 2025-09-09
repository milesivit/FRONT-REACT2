import api from "./api";


const productService = {
    list: () => api.get('productos'),
    get: (id) => api.get(`productos/${id}`),
    create: (payload) => api.post('productos', payload),
    update: (id, payload) => api.put(`productos/${id}`, payload),
    //que es payload
    remove: (id) => api.delete(`productos/${id}`)
}

export default productService