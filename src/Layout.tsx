import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from "./pages/index"

export const Layout = () => {
    return (
        <>
            <Navbar />
            <main className='app'>
                {/* represents all the children */}
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
