import React from 'react'
import Navbar from './ui/Navbar'

const MainLayout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="container" >
                {children}
            </main>
        </>
    )
}

export default MainLayout