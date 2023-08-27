import React from 'react'

// helpers
import { fetchData } from '../helpers'

// react-router-dom imports
import { useLoaderData } from 'react-router-dom';

// loader
export function dashboardLoader() {
    const usernName = fetchData('userName');
    return { usernName };
}

const Dashboard = () => {
    const { usernName } = useLoaderData();
    return (
        <div>
            <h1>{usernName}</h1>
        </div>
    )
}

export default Dashboard