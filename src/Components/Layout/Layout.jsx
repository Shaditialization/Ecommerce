import React, { useContext, useEffect } from 'react';
import Style from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { Offline, Online } from "react-detect-offline";



export default function Layout() {
    
    return <>
        <Navbar />
        <div className="container">
            <Outlet></Outlet>
        </div>

        <div>
            {/* <Offline>
                <div className='network'>
                  <i className='fas fa-wifi'></i>  you are offline (surprise!)
                </div>
            </Offline> */}
        </div>
        
        <Footer/>
    </>
}
