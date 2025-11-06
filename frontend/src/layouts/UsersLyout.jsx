
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const LayoutUser = () => {
    return (
        <>
            <Navbar />
            <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
            <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default LayoutUser