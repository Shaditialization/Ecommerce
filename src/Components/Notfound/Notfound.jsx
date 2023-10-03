import React from 'react';
import Style from './Notfound.module.css';
import img from '../../Assets/images/error.svg';

export default function Notfound() {
    return <>
        <div className='w-50 mx-auto my-3 text-center'>
            <h2 className='my-3'>Not Found</h2>
            <img src={img} alt="" className='my-4' />
       </div>
    </>
}
