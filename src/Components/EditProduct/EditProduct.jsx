import React, { useEffect, useState } from 'react'
import './EditProduct.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditProduct = () => {
    const {id} = useParams()
    const [values,setValues] = useState({
        id:id,
        name:'',
        new_price:'',
        old_price:''
    })

    useEffect(()=>{
      axios.get('http://localhost:8000/product/'+id)
      .then(res=>{
        setValues({...values,
                name: res.data.name,
                new_price: res.data.new_price,
                old_price: res.data.old_price})
      })
      .catch(err=>console.log(err))
    },[id])
    const navigate = useNavigate()

   const handleSubmit =(e)=>{
        e.preventDefault()
        axios.put('http://localhost:8000/product/'+id, values)
        .then(res=>{
          navigate('/')
        })
        .catch(err=>console.log(err))
   }

    return (
        <div className="edit-product">
            <h1>Edit Product</h1>
            <form  onSubmit={handleSubmit}>
            <div className="editproduct-itemfield">
                <p>Product Name</p>
                <input value={values.name} onChange={e=>setValues({...values, name: e.target.value})} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="editproduct-price">
                <div className="editproduct-itemfield">
                    <p>Price</p>
                    <input value={values.new_price} onChange={e=>setValues({...values, new_price: e.target.value})} type="text" name='old_price' placeholder='Type here' />
                </div>
                <div className="editproduct-itemfield">
                    <p>Offer Price</p>
                    <input value={values.old_price} onChange={e=>setValues({...values, old_price: e.target.value})} type="text" name='new_price' placeholder='Type here' />
                </div>
            </div>
            </form>
            <button className="editproduct-btn">Update</button>
        </div>
    );
};

export default EditProduct;
