import React, { useContext, useEffect, useState } from 'react';
import Style from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from "react-slick"; 
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';






export default function ProductDetails() {



    // rz
    let { addToCart , setCartNums } = useContext(CartContext);
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
    // rz






    var settings = { //D
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

    let params = useParams();
    function getProductDetails(id){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    let {isLoading , isError , data} = useQuery('productDetails', () => getProductDetails(params.id));
    console.log(data?.data.data);
    
    
    return <>
        
        {data?.data.data ? <div className='row py-2 align-items-center'>

            <Helmet>
                <meta name='description' content='' />
                <title>{data?.data.data.title}</title>
            </Helmet>
            
            <div className="col-md-4">
                {/* <img className='w-100' src={data?.data.data.imageCover} alt={data?.data.data.title} /> */}
                <Slider {...settings}>
                    {data?.data.data.images.map((img) => <img alt={data?.data.data.title} src={img} className='w-100' />)}
                </Slider>
            </div>
            <div className="col-md-8">
                <h2 className='h5'>{data?.data.data.title}</h2>
                <p>{data?.data.data.description}</p>

                <h6 className='text-main'>{data?.data.data.category?.name}</h6>
                <h6 className='text-main'>Price : {data?.data.data.price} EGP</h6>

                <div className='d-flex justify-content-between'>
                    <span>ratingsQuantity : {data?.data.data.ratingsQuantity}</span>
                    <span><i className='fas fa-star rating-color'></i> {data?.data.data.ratingsAverage} </span>
                </div>

                <button onClick={()=> addProductToCart(data?.data.data._id)}  className='btn bg-main text-white w-100 mt-2'>+ Add to cart</button>

                    {/* onClick={()=>{addProductToCart(product._id)}} */}
            </div>
        
        </div> : ''}
    </>
}
