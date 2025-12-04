import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingService from '../services/booking.service';
import type { Booking } from '../services/booking.service';

const ShopBookings: React.FC = () => {
    const { shopId } = useParams();
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        if (shopId) {
            loadBookings();
        }
    }, [shopId]);

    const loadBookings = () => {
        if (shopId) {
            BookingService.getShopBookings(shopId).then((res) => {
                setBookings(res.data);
            });
        }
    };

    const handleStatusUpdate = (id: number, status: string) => {
        BookingService.updateBookingStatus(id, status).then(() => {
            alert(`Booking ${status}!`);
            loadBookings();
        }).catch(err => {
            console.error(err);
            alert("Failed to update status");
        });
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Manage Bookings</h2>

            {bookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                    <p className="text-gray-500 text-lg">No bookings found for this shop.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-sm font-mono text-gray-500">#{booking.id}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                            booking.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center text-gray-700 mb-2">
                                        <span className="mr-2">📅</span>
                                        <span className="font-medium">
                                            {new Date(booking.startTime).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <span className="mr-2">⏰</span>
                                        <span className="font-medium">
                                            {new Date(booking.startTime).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>

                                {booking.status === 'PENDING' && (
                                    <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
                                        <button
                                            onClick={() => handleStatusUpdate(booking.id!, 'CONFIRMED')}
                                            className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(booking.id!, 'REJECTED')}
                                            className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ShopBookings;
