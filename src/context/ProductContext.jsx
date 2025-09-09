import { createContext, useState, useEffect, useContext } from "react";
import productService from "../services/productService";
export const ProductContext = createContext();


export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token"); 

    const getProducts = async () => {
        setLoading(true);
        try {
            const { data: response } = await productService.list()
            console.log("Respuesta productos:", response);
            setProducts(Array.isArray(response.data) ? response.data : []);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };
    
    const addProduct = async (newProduct) => {
        setLoading(true);
        try {
            const { data: response } = await productService.create(newProduct)
            const created = Array.isArray(response.data) ? response.data[0] : response.data || response;
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
            const { data: response } = await productService.update(id, updated);
            setProducts(prev =>
                prev.map(p => (p.id === id ? response.data : p))
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
            await productService.remove(id);
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
