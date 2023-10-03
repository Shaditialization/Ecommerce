import React from 'react';
import Style from './Footer.module.css';

export default function Footer() {
    return <>
        <footer className='py-5 bg-main-light'>
            <div className="container">
            <h1>Get the freshCart App</h1>
            <p>We share this link Lorem ipsum dolor sit.</p>
                <div className="row">
                    <div className="col-md-9">
                        <input type="text" className='form-control' placeholder='share Link'/>
                    </div>
                    <div className="col-md-3">
                        <button className='btn btn-success form-control'>shareLink</button>
                    </div>
                </div>
            </div>
            </footer>
    </>
}
