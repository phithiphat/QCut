import React, { useEffect, useState } from 'react';
import BookingService from '../services/booking.service';
import type { Booking } from '../services/booking.service';

const MyBookings: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        BookingService.getMyBookings().then((res) => {
            setBookings(res.data);
        });
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">My Bookings</h2>

            {bookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                    <p className="text-gray-500 text-lg mb-4">You have no bookings yet.</p>
                    <a href="/shops" className="text-blue-600 font-semibold hover:text-blue-700">Browse Shops</a>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{booking.shop?.name || `Shop #${booking.shopId}`}</h3>
                                        <p className="text-sm text-gray-500">{booking.service?.name || `Service #${booking.serviceId}`}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                                        booking.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {booking.status}
                                    </span>
                                </div>

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

                                {booking.barber && (
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center text-gray-600 text-sm">
                                        <span className="mr-2">✂️</span>
                                        <span>Barber: <span className="font-medium text-gray-900">{booking.barber.name}</span></span>
                                    </div>
                                )}

                                {(booking.status === 'PENDING' || booking.status === 'CONFIRMED') && (
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to cancel this booking?') && booking.id) {
                                                BookingService.updateBookingStatus(booking.id, 'CANCELLED').then(() => {
                                                    setBookings(bookings.map(b => b.id === booking.id ? { ...b, status: 'CANCELLED' } : b));
                                                });
                                            }
                                        }}
                                        className="mt-4 w-full py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-medium transition"
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
