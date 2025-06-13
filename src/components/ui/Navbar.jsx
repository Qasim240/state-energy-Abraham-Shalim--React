import React, { useState, useRef, useEffect } from 'react'
import { logo, logoutIcon, orderIcon, profile, shoppingBag } from '../../../imagesPath'
import VerticalSeparator from '../utils/VerticalSeparator'
import Image from '../utils/Image'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [openDropdown, setOpenDropdown] = useState(false)
    const dropdownRef = useRef()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <nav className="container lg:py-10 md:pt-5 md:pb-4 py-3">
            <div className="flex justify-between items-center">
                <div className="flex items-center lg:gap-5 gap-0">
                    <a href="/home">
                        <img className="w-24 md:w-30" src={logo} alt="logo" />

                    </a>
                    <VerticalSeparator height="h-7" color="bg-grey-light" className="mx-2" />

                    <span className="text-gray-700 font-Avenir font-normal lg:text-[20px] text-[14px]">
                        Welcome, <span className="font-medium">Ben!</span>
                    </span>
                </div>

                <div className="flex items-center lg:gap-4 gap-2 relative" ref={dropdownRef}>

                    <Link to="/cart-details">
                        <span className='relative'>
                            <p className='bg-base-red p-2 h-[24px] w-[24px] flex justify-center items-center rounded-full font-Avenir font-extrabold text-white absolute top-[9px] left-[-10px] text-[12px]'>
                                1
                            </p>


                            <Image img={shoppingBag} className="w-5 h-5" />
                        </span>

                    </Link>


                    <button onClick={() => setOpenDropdown(!openDropdown)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-900 font-semibold text-sm"
                    >
                        EO
                    </button>

                    {/* Dropdown */}
                    <div
                        className={`absolute top-[120%] rounded-large right-0 mt-2 w-64 bg-white border border-gray-200 shadow-xl large p-3 z-50 overflow-hidden transition-all duration-100 transform ${openDropdown
                            ? 'opacity-100 scale-100 visible'
                            : 'opacity-0 scale-95 invisible pointer-events-none'
                            }`}
                    >
                        {/* User Info */}
                        <div className="px-4 py-3">
                            <p className="text-[20px] font-Avenir font-medium text-blue-900 mb-1">Eytan Ohayon</p>
                            <p className="text-xs text-gray-500 font-Avenir font-medium">Sales Representative</p>
                        </div>
                        <hr />
                        {/* Menu Options */}
                        <ul className="py-2 text-[16px] text-gray-700">
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 font-Avenir font-medium">
                                <img src={profile} alt="profile" /> Profile
                            </li>
                            <Link to='/all-orders'>

                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2 font-Avenir font-medium">
                                    <img src={orderIcon} alt="order" /> My Orders
                                </li>
                            </Link>
                        </ul>
                        <hr />
                        {/* Logout */}
                        <div className="px-4 py-2 hover:bg-red-50 cursor-pointer text-red-600 text-sm font-Avenir font-medium flex items-center gap-2">
                            <img src={logoutIcon} alt="logout" /> Logout
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
