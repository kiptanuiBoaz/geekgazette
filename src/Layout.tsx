import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from "./pages/index"

export const Layout = () => {
    return (
        <>
            <Navbar />
            <main style={{minHeight:"650px"}}>
                {/* represents all the children */}
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
