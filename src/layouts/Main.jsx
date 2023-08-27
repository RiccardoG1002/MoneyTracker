import React from 'react'

// react-router-dom imports
import { Outlet, useLoaderData } from 'react-router-dom';

//assets
import wave from '../assets/wave.svg';

// components
import Navbar from '../components/Navbar';

// helpers
import { fetchData } from '../helpers'

// loader
export function mainLoader() {
    const usernName = fetchData('userName');
    return { usernName };
}

const Main = () => {
    const { usernName } = useLoaderData();
    
    return (
        <div className='layout'>
            <Navbar usernName={usernName}></Navbar>
            <main>
                <Outlet></Outlet>
            </main>
            <img src={wave} alt="" />
        </div>
    )
}

export default Main