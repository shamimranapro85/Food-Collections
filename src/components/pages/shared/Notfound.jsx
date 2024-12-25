import React from 'react';
import { NavLink } from 'react-router';
import Navbar from './Navbar';

const Notfound = () => {
    return (
       <>
       <Navbar/>
        <div className='h-[90vh] flex text-center text-red-500 font-bold gap-3 flex-col-reverse justify-center items-center'>
                Not found This page 
                Please Go to Home
                <NavLink className={"btn bg-green-500 rounded-lg"} to={"/"}>Home</NavLink>
        </div></>
    );
};

export default Notfound;