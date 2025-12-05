import React, { useEffect, useState } from 'react';
import ShopService from '../services/shop.service';
import type { Shop } from '../services/shop.service';
import { Link } from 'react-router-dom';
import AuthService from '../services/auth.service';

const ShopList: React.FC = () => {
    const [shops, setShops] = useState<Shop[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }

        if (user && user.role === 'OWNER') {
            ShopService.getMyShops().then(
                (response) => {
                    setShops(response.data);
                },
                (error) => {
                    console.error('Error fetching my shops:', error);
                }
            );
        } else {
            ShopService.getAllShops().then(
                (response) => {
                    setShops(response.data);
                },
                (error) => {
                    console.error('Error fetching shops:', error);
                }
            );
        }
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Browse Shops</h2>

            {shops.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                    <p className="text-gray-500 text-lg">No shops available at the moment.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {shops.map((shop) => (
                        <div key={shop.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
                            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                                {shop.imageUrl ? (
                                    <img src={shop.imageUrl} alt={shop.name} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-6xl">💈</span>
                                )}
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{shop.name}</h3>
                                <p className="text-gray-600 mb-4 flex-grow">{shop.address}</p>

                                <div className="space-y-2 text-sm text-gray-500 mb-6">
                                    <div className="flex items-center">
                                        <span className="mr-2">📞</span>
                                        <span>{shop.phoneNumber}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-2">🕒</span>
                                        <span>{shop.openingTime} - {shop.closingTime}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mt-auto">
                                    <Link
                                        to={`/book/${shop.id}`}
                                        className="block w-full text-center bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                                    >
                                        Book Appointment
                                    </Link>

                                    {currentUser && currentUser.role === 'OWNER' && (
                                        <div className="grid grid-cols-3 gap-2">
                                            <Link
                                                to={`/shop/${shop.id}/edit`}
                                                className="block w-full text-center bg-green-100 text-green-700 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                to={`/shop/${shop.id}/bookings`}
                                                className="block w-full text-center bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                                            >
                                                Bookings
                                            </Link>
                                            <Link
                                                to={`/shop/${shop.id}/barbers`}
                                                className="block w-full text-center bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                                            >
                                                Barbers
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShopList;
