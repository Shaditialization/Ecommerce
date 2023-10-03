import React, { useContext, useEffect } from 'react';
import Style from './Profile.module.css';
import jwtDecode from 'jwt-decode';
import { UserContext } from '../../Context/UserContext';
export default function Profile() {


    let {userData} = useContext(UserContext);
    console.log(userData);
    
    return <>
        <h1>Hello :{userData?.name}</h1>
        <h1>Hello :{userData?.email}</h1>
    </>
}
