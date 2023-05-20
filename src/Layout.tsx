import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from "./pages/index"

export const Layout = () => {
    return (
        <>
            <Navbar />
            <main>
                {/* represents all the children */}
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
