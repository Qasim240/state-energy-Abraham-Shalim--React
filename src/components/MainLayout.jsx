import React from 'react'
import Navbar from './ui/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="container" >
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout