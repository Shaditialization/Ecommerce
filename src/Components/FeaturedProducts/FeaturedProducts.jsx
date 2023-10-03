import React, { useContext, useEffect, useState } from 'react';
import Style from './FeaturedProducts.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';




export default function FeaturedProducts() {






    let { addToCart , setCartNums} = useContext(CartContext);
    async function addProductToCart(id)
    {
        let response = await addToCart(id);
        if (response.data.status === 'success')
        {
            toast.success('product successfully added', {
                duration: 4000,
                position: 'top-center',
            })
        }
        else
        {
            toast.error('Error adding product')
        }
        setCartNums(response?.data.numOfCartItems); 
 
    }







    function getFeaturedProducts()
    {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }
    
    let { isLoading, isError, data, isFetching } = useQuery('featuredProducts', getFeaturedProducts, {
        // cacheTime:3000,  
        // refetchOnMount: false,
        // staleTime: 30000,
        // refetchInterval:5000,
        // enabled:true
    });

    
    return <>
        {isLoading? <div className='w-100 py-5 d-flex justify-content-center'>
                <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
        </div> : <div className='container py-2'>
            <h2 className='my-3'>FeaturedProducts</h2>  
            <div className="row">
                {data?.data.data.map((product) => <div key={product.id} className='col-md-2'>

                    
                    <div className="product cursor-pointer py-3 px-2 ">
                        <Link to={`/productdetails/${product.id}`}>
                            <img className='w-100' src={product.imageCover}  alt={product.title} />
                            <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
                            <h3 className='h6'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                            <div className="product-box d-flex justify-content-between mt-3">
                                <span>{product.price} EGP</span>
                                <span> <i className='fas fa-star rating-color'></i> {product.ratingAverage}</span>
                            </div>
                            </Link>
                                <button onClick={()=> addProductToCart(product.id)} className='btn bg-main text-white w-100 btn-sm mt-2'>Add to Cart</button>

                        </div>
                    

                </div>)}
            </div>
            
        </div>}
        
        
    </>
}
