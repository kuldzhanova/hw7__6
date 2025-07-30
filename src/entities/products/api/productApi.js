import { API } from "../../../../axiosInstance";


export const fetchProducts = () => API.get('/products');
export const addProduct = (data) => API.post('/products', data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const fetchCategories = () => API.get('/categories');
