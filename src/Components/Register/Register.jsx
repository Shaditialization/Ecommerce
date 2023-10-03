import React, { useState } from 'react';
import Style from './Register.module.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Audio } from  'react-loader-spinner'





export default function Register() {

    let navigate = useNavigate();
    const [error, seterror] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    async function registerSubmit(values) {
        setisLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            .catch(
                
                (err) => {
                    setisLoading(false);
                    seterror(err.response.data.message)
                }
            
                )
        
        if (data.message === 'success') {
            setisLoading(false);
            navigate('/login')
        }
    }

    // function validate(values) {
    //     console.log("validate call");
        
    //     let phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    //     let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
    //     let errors = {};
        
    //     if (!values.name)
    //     {
    //         errors.name = "name is required";
    //     }
    //     else if (values.name.length < 3)
    //     {
    //         errors.name = "name minlenght is 3"
    //     }
    //     else if (values.name.length > 10)
    //     {
    //         errors.name = "name maxlength is 10"
    //     }

    //     if (!values.phone)
    //     {
    //         errors.phone = "phone is required"
    //     }
    //     else if(!phoneRegex.test(values.phone))
    //     {
    //         errors.phone = "phone number invalid";
    //     }


    //     if (!values.email)
    //     {
    //         errors.phone = "email is required"
    //     }
    //     else if (!emailRegex.test(values.email))
    //     {
    //         errors.email = "email number invalid";
    //     }

    //     return errors;
    // }

    let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    let validationSchema = Yup.object({
        name: Yup.string().min(3, 'name minlength is 3').max(10 , 'name max is 10').required('name is required'),
        email: Yup.string().email('email is invalid').required('email is required'),
        phone: Yup.string().matches(phoneRegExp, 'phone is invalid').required('phone is required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password start with uppercase').required('password is required'),
        rePassword:Yup.string().oneOf([Yup.ref("password")] , 'password and repassword dont match').required('rePassword is required')
    })

    let formik = useFormik({
        initialValues:{
            name:'',
            phone: '',
            email: '',
            password: '',
            rePassword:''
        }, validationSchema,
        // onSubmit:submitRegister
        onSubmit:registerSubmit
    })
    return <>
        <div className='w-75 mx-auto py-4'>
            {error !== null ?<div className='alert alert-danger'>{error}</div>:''}
            
            <h2>Register Now</h2>
            <form onSubmit={formik.handleSubmit}>

                <label htmlFor="name">Name :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className='form-control mb-2' type='text' id='name' name='name' />
                {formik.errors.name && formik.touched.name?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.name}</div>:''}

                <label htmlFor="email">Email :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2' type='email' id='email' name='email' />
                {formik.errors.email && formik.touched.email?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.email}</div>:''}


                <label htmlFor="phone">Phone :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='form-control mb-2' type='tel' id='phone' name='phone' />
                {formik.errors.phone && formik.touched.phone?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.phone}</div>:''}
                
                <label htmlFor="password">Passowrd :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-2' type='password' id='password' name='password' />
                {formik.errors.password && formik.touched.password?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.password}</div>:''}


                <label htmlFor="rePassword">Repassword :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className='form-control mb-2' type='password' id='rePassword' name='rePassword' />
                {formik.errors.rePassword && formik.touched.rePassword?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.rePassword}</div>:''}


                
                {isLoading?<button type='button' className='btn bg-main text-white mt-2'>
                    <Audio
    height = "20"
    width = "80"
    radius = "9"
    color = 'white'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  />
                </button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2'>Register</button>}

                
                
                
            </form>
        </div>
        
    </>
}
