"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Activity, LogOut, User, ChevronDown, ActivitySquare } from 'lucide-react';
import { useRouter } from "next/navigation";

const Navbar = (props) => {
    const { userData } = props;
    const dropdownRef = useRef(null);
    // const { isLogin, setIsLogin, userData } = useContext(AuthContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    // useEffect(() => {
    //     if (userData) {
    //         router.push("/products");
    //     }
    // }, [userData])

    const handleLogout = () => {
        // Clear token from localStorage
        // localStorage.removeItem("token");
        // localStorage.removeItem("userData");

        router.push("/api/logout?message=You have been successfully logged out.");
        router.refresh()

        // Reset user state
        // setIsLogin(false);

        // Close dropdown
        setIsDropdownOpen(false);

        // Redirect to login page with success message
        // router.push("/login?message=You have been successfully logged out");
    };

    return (
        <>
            <header className="flex justify-between items-center px-6 py-4 mb-4 bg-black rounded-lg text-white">
                <h1>Product Store</h1>

                {
                    userData && <nav className="flex gap-8">
                        <Link href="/">Home</Link>
                        <Link href="/dashboard/products">Products</Link>
                        <Link href="/dashboard/categories">Categories</Link>
                        <Link href="/TailwindClass">Tailwind</Link>
                        <Link href="/my-tasks">My Tasks</Link>
                    </nav>
                }

                {
                    !userData && <nav className="flex gap-8">
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                    </nav>
                }

                {userData &&
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-800 transition-colors focus:outline-none"
                        >
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                                {userData?.name ? userData.name.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                            </div>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-2xl border border-slate-700 py-1 animate-fade-in-up origin-top-right">
                                <div className="px-4 py-3 border-b border-slate-700/50">
                                    <p className="text-sm text-white font-medium truncate">{userData?.name || 'User'}</p>
                                    <p className="text-xs text-slate-400 truncate">{userData?.email || 'user@example.com'}</p>
                                </div>
                                <div className="px-4 py-3 border-b border-slate-700/50 hover:bg-slate-700/50">
                                    <Link href={`/dashboard/edit-profile`} className="w-full text-left text-sm text-white  hover:text-white flex items-center gap-2 transition-colors">
                                        <p className="text-sm text-white font-medium truncate">Edit Profile</p>
                                    </Link>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700/50 hover:text-red-300 flex items-center gap-2 transition-colors mt-1"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                }
            </header>
        </>
    )
}

export default Navbar;