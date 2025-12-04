import React from 'react';
import AuthService from '../services/auth.service';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const user = AuthService.getCurrentUser();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome back, <span className="text-blue-600">{user?.username}</span>!
                    </h1>
                    <p className="text-gray-500">
                        You are logged in as a <span className="font-semibold text-gray-700">{user?.role}</span>
                    </p>
                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Customer Actions */}
                <Link to="/shops" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                        ✂️
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Browse Shops</h3>
                    <p className="text-gray-500">Find the best barbershops near you and book your next cut.</p>
                </Link>

                {user?.role !== 'OWNER' && (
                    <Link to="/my-bookings" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                            📅
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">My Bookings</h3>
                        <p className="text-gray-500">View your upcoming appointments and booking history.</p>
                    </Link>
                )}

                {/* Owner Actions */}
                {user?.role === 'OWNER' && (
                    <Link to="/create-shop" className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                            🏪
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Create Shop</h3>
                        <p className="text-gray-500">Open a new barbershop and start managing your business.</p>
                    </Link>
                )}
            </div>
        </div >
    );
};

export default Dashboard;
