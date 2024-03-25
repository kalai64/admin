import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import edit_icon from '../../assets/edit_icon.png'
import { Link } from 'react-router-dom'

const ListProduct = () => {

  const [allproducts,setAllProducts] = useState([])

  const fetchInfo = async()=>{
    await fetch('https://backend-knm3.onrender.com/allproducts')
    .then((resp)=>resp.json())
    .then((data)=>{setAllProducts(data)})
    
  }

  useEffect(()=>{
    fetchInfo()
  },[])

  const remove_product=async(id)=>{
    await fetch('https://backend-knm3.onrender.com/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo()
  }

  return <>
  <div className="list-product">
    <h1>All Products List</h1>
    <div className="listproduct-format-main">
      <p>Products</p>
      <p>Title</p>
      <p>Old Price</p>
      <p>New Price</p>
      <p>category</p>
      <p>Remove</p>
      <p>Edit</p>
    </div>
    <div className="listproduct-allproducts">
      <hr />
      {allproducts.map((product,index)=>{
          return <><div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon' src={cross_icon} alt="" />
            <Link to={`/editproduct/${product.id}`}><img  className='listproduct-edit-icon' src={edit_icon} alt="" /></Link>
          </div>
          <hr />
          </>
      })}
    </div>
  </div>
  </>
}

export default ListProduct