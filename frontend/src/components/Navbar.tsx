import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = AuthService.getCurrentUser();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
        window.location.reload();
    };

    const isActive = (path: string) => location.pathname === path;

    if (location.pathname === '/login' || location.pathname === '/register') return null;

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <Link to={user ? "/dashboard" : "/"} className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center gap-2 hover:opacity-80 transition">
                            <span className="text-3xl">✂️</span> QCut
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {user ? (
                                <>
                                    <NavLink to="/dashboard" active={isActive('/dashboard')}>Dashboard</NavLink>
                                    <NavLink to="/shops" active={isActive('/shops')}>Browse Shops</NavLink>
                                    {user.role !== 'OWNER' && (
                                        <NavLink to="/my-bookings" active={isActive('/my-bookings')}>My Bookings</NavLink>
                                    )}
                                    {user.role === 'OWNER' && (
                                        <NavLink to="/create-shop" active={isActive('/create-shop')}>Create Shop</NavLink>
                                    )}
                                </>
                            ) : (
                                <>
                                    <NavLink to="/" active={isActive('/')}>Home</NavLink>
                                </>
                            )}
                        </div>

                        {/* Auth Buttons / User Profile */}
                        <div className="hidden md:flex items-center gap-4">
                            {user ? (
                                <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                                    <div className="text-right hidden lg:block">
                                        <p className="text-sm font-bold text-gray-900">{user.username}</p>
                                        <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Link to="/login" className="px-5 py-2.5 text-gray-700 font-semibold hover:text-blue-600 transition">
                                        Log In
                                    </Link>
                                    <Link to="/register" className="px-5 py-2.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg">
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
                        >
                            <div className="px-4 py-4 space-y-3">
                                {user ? (
                                    <>
                                        <MobileNavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</MobileNavLink>
                                        <MobileNavLink to="/shops" onClick={() => setIsMobileMenuOpen(false)}>Browse Shops</MobileNavLink>
                                        {user.role !== 'OWNER' && (
                                            <MobileNavLink to="/my-bookings" onClick={() => setIsMobileMenuOpen(false)}>My Bookings</MobileNavLink>
                                        )}
                                        {user.role === 'OWNER' && (
                                            <MobileNavLink to="/create-shop" onClick={() => setIsMobileMenuOpen(false)}>Create Shop</MobileNavLink>
                                        )}
                                        <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-gray-900">{user.username}</p>
                                                <p className="text-sm text-gray-500">{user.role}</p>
                                            </div>
                                            <button onClick={handleLogout} className="text-red-600 font-semibold">Logout</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <MobileNavLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
                                        <div className="grid grid-cols-2 gap-3 pt-4">
                                            <Link to="/login" className="text-center py-3 border border-gray-200 rounded-xl font-semibold text-gray-700">Log In</Link>
                                            <Link to="/register" className="text-center py-3 bg-blue-600 text-white rounded-xl font-semibold">Sign Up</Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
            <div className="h-20" />
        </>
    );
};

const NavLink = ({ to, children, active }: { to: string, children: React.ReactNode, active?: boolean }) => (
    <Link
        to={to}
        className={`font-medium transition-colors duration-200 ${active ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
    >
        {children}
    </Link>
);

const MobileNavLink = ({ to, children, onClick }: { to: string, children: React.ReactNode, onClick: () => void }) => (
    <Link
        to={to}
        onClick={onClick}
        className="block py-2 text-lg font-medium text-gray-700 hover:text-blue-600"
    >
        {children}
    </Link>
);

export default Navbar;
