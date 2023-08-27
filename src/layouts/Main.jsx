import React from 'react'

// react-router-dom imports
import { Outlet, useLoaderData } from 'react-router-dom';

//assets
import wave from '../assets/wave.svg';

// components
import Navbar from '../components/Navbar';

// helpers
import { fetchNonJsonData } from '../helpers'

// loader
export function mainLoader() {
    const userName = fetchNonJsonData('userName');
    console.log('Ciao da main loader');
    return { userName };
}

const Main = () => {
    const { userName } = useLoaderData();
    return (
        <div className='layout'>
            <Navbar usernName={userName}></Navbar>
            <main>
                <Outlet></Outlet>
            </main>
            <img src={wave} alt="" />
        </div>
    )
}

export default Main