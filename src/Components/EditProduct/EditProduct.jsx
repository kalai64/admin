import React, { useEffect, useState } from 'react'
import './EditProduct.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditProduct = () => {
    const {id} = useParams()
    const [product,setProduct] = useState({})
    const [formData,setFormData] = useState({
        name: '',
        new_price: '',
        old_price: ''
    })

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://backend-knm3.onrender.com/product/${id}`);
                setProduct(response.data);
                setFormData({
                    name: response.data.name,
                    new_price: response.data.new_price.toString(), // Convert to string for input field
                    old_price: response.data.old_price.toString() // Convert to string for input field
                });
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id])
    
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`https://backend-knm3.onrender.com/updateproduct/${id}`, {
                name: formData.name,
                new_price: parseFloat(formData.new_price), // Ensure it's converted to number
                old_price: parseFloat(formData.old_price) // Ensure it's converted to number
            });
            // Handle success, redirect user or show a success message
        } catch (error) {
            console.error('Error updating product:', error);
            // Handle error
        }
    };

    return (
        <div className="edit-product">
            <h1>Edit Product</h1>
            <form onSubmit={handleSubmit}>
            <div className="editproduct-itemfield">
                <p>Product Name</p>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Product Name" />
            </div>
            <div className="editproduct-price">
                <div className="editproduct-itemfield">
                    <p>New Price</p>
                    <input type="number" name="new_price" value={formData.new_price} onChange={handleInputChange} placeholder="New Price" />
                </div>
                <div className="editproduct-itemfield">
                    <p>Old Price</p>
                    <input type="number" name="old_price" value={formData.old_price} onChange={handleInputChange} placeholder="Old Price" />
                </div>
            </div>
            </form>
            <button className="editproduct-btn">Update</button>
        </div>
    );
};

export default EditProduct;
