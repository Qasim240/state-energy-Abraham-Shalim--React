import React, { useState, useRef, useEffect } from 'react';
import { logo, logoutIcon, orderIcon, profile, shoppingBag } from '../../../imagesPath';
import VerticalSeparator from '../utils/VerticalSeparator';
import Image from '../utils/Image';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../features/slices/userSlice.js';

const Navbar = () => {
    const cartCount = useSelector((state) => state.user.cartCount);
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [openDropdown, setOpenDropdown] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const userLogoutHanlder = () => {
        dispatch(clearUser());
        navigate('/');
    };


    useEffect(() => {
        setOpenDropdown(false);
    }, [location.pathname]);




    // Define breadcrumb labels
    const breadcrumbLabels = {
        collection: 'All Categories',
        roof: 'Roof',
        solar: 'Solar Panel',
        battery: 'Battery',
        "cart-details": 'Your Cart Details',
        "user-info": 'User Information',
        "loan-finance": 'Loan & Finance',
        "customer-signature": 'Customer Signature',
        "all-orders": 'My Orders'
    };

    // Paths where breadcrumbs should be shown
    const breadcrumbPages = [
        '/cart-details',
        '/collection',
        '/user-info',
        '/loan-finance',
        '/customer-signature',
        '/all-orders'
    ];

    // Pages that require the "Your Cart" heading
    const cartSubPages = [
        '/user-info',
        '/loan-finance',
        '/customer-signature',
        '/cart-details',

    ];

    const generateBreadcrumbs = () => {
        const segments = location.pathname.split('/').filter(Boolean);
        const crumbs = [];

        segments.forEach((seg, idx) => {
            const path = '/' + segments.slice(0, idx + 1).join('/');
            const label = breadcrumbLabels[seg] || seg;
            crumbs.push({
                label,
                path,
                isLast: idx === segments.length - 1
            });
        });

        return (
            <nav className="flex py-3 text-gray-700" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link to="/home" className="font-medium font-Avenir text-sm text-base-50">
                            Home
                        </Link>
                    </li>
                    {crumbs.map((crumb, i) => (
                        <li key={i} aria-current={crumb.isLast ? 'page' : undefined}>
                            <div className="flex items-center">
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="4" cy="4" r="4" fill="#D9D9D9" />
                                </svg>
                                <Link
                                    to={crumb.path}
                                    className={`ms-1 text-sm font-medium font-Avenir md:ms-2 ${crumb.isLast ? 'text-base' : 'text-base-50'}`}
                                >
                                    {crumb.label}
                                </Link>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
        );
    };

    return (
        <nav className="container lg:py-10 md:pt-5 md:pb-4 py-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center lg:gap-5 gap-0">
                    <a href="/home">
                        <img className="w-24 md:w-30" src={logo} alt="logo" />
                    </a>
                    <VerticalSeparator height="h-7" color="bg-grey-light" className="mx-2" />

                    {breadcrumbPages.some(path => location.pathname.startsWith(path)) ? (
                        <div>
                            {cartSubPages.includes(location.pathname) && (
                                <h2 className="text-lg font-semibold font-Avenir text-gray-800 mb-1">Your Cart</h2>
                            )}
                            {generateBreadcrumbs()}
                        </div>
                    ) : (
                        <span className="text-gray-700 font-Avenir font-normal lg:text-[20px] text-[14px]">
                            Welcome, <span className="font-medium">{user?.first_name}!</span>
                        </span>
                    )}

                </div>

                <div className="flex items-center lg:gap-4 gap-2 relative" ref={dropdownRef}>
                    <Link to="/cart-details">
                        <span className='relative'>
                            {cartCount > 0 && (
                                <p className='bg-base-red p-2 h-[24px] w-[24px] flex justify-center items-center rounded-full font-Avenir font-extrabold text-white absolute top-[9px] left-[-10px] text-[12px]'>
                                    {cartCount}
                                </p>
                            )}




                            <Image img={shoppingBag} className="w-5 h-5" />
                        </span>
                    </Link>

                    <button onClick={() => setOpenDropdown(!openDropdown)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-900 font-semibold text-sm">
                        EO
                    </button>

                    <div className={`absolute top-[120%] rounded-large right-0 mt-2 w-64 bg-white border border-gray-200 shadow-xl large p-3 z-50 overflow-hidden transition-all duration-100 transform ${openDropdown
                        ? 'opacity-100 scale-100 visible'
                        : 'opacity-0 scale-95 invisible pointer-events-none'}`}>
                        <div className="px-4 py-3">
                            <p className="text-[20px] font-Avenir font-medium text-blue-900 mb-1">
                                <p>{user?.full_name}</p>
                            </p>
                            <p className="text-xs text-gray-500 font-Avenir font-medium">Sales Representative</p>
                        </div>
                        <hr />
                        <ul className="py-2 text-[16px] text-gray-700">
                            <Link to='/profile'>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 font-Avenir font-medium">
                                    <img src={profile} alt="profile" /> Profile
                                </li>
                            </Link>
                            <Link to='/all-orders'>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 font-Avenir font-medium">
                                    <img src={orderIcon} alt="order" /> My Orders
                                </li>
                            </Link>
                        </ul>
                        <hr />
                        <div className="px-4 py-2 hover:bg-red-50 cursor-pointer text-red-600 text-sm font-Avenir font-medium flex items-center gap-2" onClick={userLogoutHanlder}>
                            <img src={logoutIcon} alt="logout" /> Logout
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
