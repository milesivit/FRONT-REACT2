import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

export const ProductContext = createContext();

const BASE_URL = 'http://localhost:3000/productos';

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token"); 

    const getProducts = async () => {
        setLoading(true);
        try {
            const { data: responseData } = await axios.get(BASE_URL, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("TOKEN:", token);
            console.log("Respuesta productos:", responseData);
            setProducts(Array.isArray(responseData.data) ? responseData.data : []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };
    
    const addProduct = async (newProduct) => {
        setLoading(true);
        try {
            const { data: responseData } = await axios.post(BASE_URL, newProduct, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const created = Array.isArray(responseData.data) ? responseData.data[0] : responseData.data || responseData;
            setProducts(prev => Array.isArray(prev) ? [...prev, created] : [created]);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };
    

    const editProduct = async (id, updated) => {
        setLoading(true);
        try {
            const { data: responseData } = await axios.put(`${BASE_URL}/${id}`, updated, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(prev =>
                prev.map(p => (p.id === id ? responseData.data : p))
            );
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };
    
    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await axios.delete(`${BASE_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <ProductContext.Provider
            value={{
                products,
                loading,
                error,
                getProducts,
                addProduct,
                editProduct,
                deleteProduct
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    return useContext(ProductContext);
};
