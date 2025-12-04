import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingService from '../services/booking.service';
import api from '../services/api';

const CreateBooking: React.FC = () => {
    const { shopId } = useParams();
    const navigate = useNavigate();
    const [services, setServices] = useState<any[]>([]);
    const [barbers, setBarbers] = useState<any[]>([]);
    const [selectedService, setSelectedService] = useState<number | null>(null);
    const [selectedBarber, setSelectedBarber] = useState<number | null>(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        if (shopId) {
            api.get(`/shops/${shopId}/services`).then((res) => {
                setServices(res.data);
            });
            api.get(`/shops/${shopId}/barbers`).then((res) => {
                setBarbers(res.data);
            });
        }
    }, [shopId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedService || !date || !time) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const startTime = `${date}T${time}:00`;
            await BookingService.createBooking(Number(shopId), selectedService, startTime, selectedBarber);
            alert('Booking created successfully!');
            navigate('/my-bookings');
        } catch (error: any) {
            alert(error.response?.data || 'Booking failed');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Book Appointment</h2>

                {services.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-red-500 text-lg mb-4">This shop has no services available yet.</p>
                        <button onClick={() => navigate('/shops')} className="text-blue-600 hover:underline">Go back to shops</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Service</label>
                            <div className="grid grid-cols-1 gap-3">
                                {services.map((service) => (
                                    <div
                                        key={service.id}
                                        onClick={() => setSelectedService(service.id)}
                                        className={`p-4 border rounded-xl cursor-pointer transition-all ${selectedService === service.id
                                                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-gray-900">{service.name}</span>
                                            <span className="text-blue-600 font-bold">${service.price}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">⏱ {service.durationMinutes} mins</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Barber (Optional)</label>
                            <select
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                value={selectedBarber || ''}
                                onChange={(e) => setSelectedBarber(Number(e.target.value) || null)}
                            >
                                <option value="">Any Barber</option>
                                {barbers.map((barber) => (
                                    <option key={barber.id} value={barber.id}>
                                        {barber.name} ({barber.status})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                <input
                                    type="time"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                    value={time}
                                    onChange={(e) => setTime(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                        >
                            Confirm Booking
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CreateBooking;
