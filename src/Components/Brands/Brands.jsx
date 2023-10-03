import React from 'react';
import Style from './Brands.module.css';
import Loading from 'react-loading';
import useApi from '../../Hooks/useApi';



export default function Brands() {
    let { data, isLoading } = useApi('brands', 'brands')
    if (isLoading)
        return <Loading></Loading>
    return (
        <div className="container">
            <div className="row">
                {data?.data.data.map((brand) => <div key={brand._id} className='card p-3 m-3 text-center col-md-2'>
                    <img src={brand.image} className='w-100' alt="brand" />
                    <p className='fw-bolder'>{brand.name}</p>
                </div>)}
            </div>
        </div>
    )

}
