import React from 'react';
import Style from './Products.module.css';
import { Helmet } from 'react-helmet';
import Loading from 'react-loading';
import { Link } from 'react-router-dom';
import useApi from '../../Hooks/useApi';





export default function Products() {
    let { data, isLoading } = useApi('products', 'products')
    if (isLoading)
        return <Loading></Loading>
    return <>
        

        <div className='container'>



            <div className="row">
                {data?.data.data.slice(0,5).sort((a,b)=>b.ratingAverage - a.ratingAverage).slice(0,10).map((product) => <div key={product.id} className='col-md-2'>

                    
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

                        </div>
                    

                </div>)}
            </div>
            <Helmet>
            <meta charSet='utf-8' />
            <title>Products page</title>
            </Helmet>
        </div>
        
    </>
}
