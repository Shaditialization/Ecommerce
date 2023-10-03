import React, { useContext, useState } from 'react';
import Style from './Login.module.css';
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { BallTriangle } from  'react-loader-spinner'
import { UserContext } from '../../Context/UserContext';





export default function Login() {
    let {setUserToken , setUserData} = useContext(UserContext);
    let navigate = useNavigate();
    const [error, seterror] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    async function loginSubmit(values) {
        setisLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            .catch(
                
                (err) => {
                    setisLoading(false);
                    seterror(err.response.data.message)
                }
            
                )
        
        if (data.message === 'success') {
            setisLoading(false);
            localStorage.setItem('userToken', data.token);
            setUserToken(data.token);
            setUserData(data.user);
            navigate('/');
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

    // let phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    let validationSchema = Yup.object({
        email: Yup.string().email('email is invalid').required('email is required'),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password start with uppercase').required('password is required'),
    })

    let formik = useFormik({
        initialValues:{
            email: '',
            password: '',
        }, validationSchema,
        // onSubmit:submitRegister
        onSubmit: loginSubmit
    })
    return <>
        <div className='w-75 mx-auto py-4'>
            {error !== null ?<div className='alert alert-danger'>{error}</div>:''}
            
            <h2>Login Now</h2>
            <form onSubmit={formik.handleSubmit}>



                <label htmlFor="email">Email :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control mb-2' type='email' id='email' name='email' />
                {formik.errors.email && formik.touched.email?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.email}</div>:''}

                
                <label htmlFor="password">Passowrd :</label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control mb-2' type='password' id='password' name='password' />
                {formik.errors.password && formik.touched.password?<div className='alert mt-2 p-2 alert-danger'>{formik.errors.password}</div>:''}



                
                {isLoading?<button type='button' className='btn bg-main text-white mt-2'>
                    <BallTriangle
  height={20}
  width={100}
  radius={5}
  color="#fff"
  ariaLabel="ball-triangle-loading"
  wrapperClass={{}}
  wrapperStyle=""
  visible={true}
/>
                </button> :
                    <>
                        <div className='d-flex align-items-center'>
                            <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white mt-2 mx-2'>Login</button>
                            <Link className='btn' to={'/register'}>Register Now</Link>
                        </div>
                        
                    </>
                }

                
                
                
            </form>
        </div>
        
    </>
}
