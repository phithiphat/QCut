import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopService from '../services/shop.service';
import type { Shop } from '../services/shop.service';

const CreateShop: React.FC = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [openingTime, setOpeningTime] = useState('09:00');
    const [closingTime, setClosingTime] = useState('20:00');

    const handleCreateShop = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newShop: Shop = {
                name,
                address,
                phoneNumber,
                openingTime,
                closingTime,
            };
            await ShopService.createShop(newShop);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error creating shop:', error);
            alert('Failed to create shop');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">Create New Shop</h2>
                <form onSubmit={handleCreateShop} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="e.g. Gentleman's Cut"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder="e.g. 123 Main St, Bangkok"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Opening Time</label>
                            <input
                                type="time"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                value={openingTime}
                                onChange={(e) => setOpeningTime(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Closing Time</label>
                            <input
                                type="time"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                value={closingTime}
                                onChange={(e) => setClosingTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            placeholder="e.g. 081-234-5678"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                    >
                        Create Shop
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateShop;
