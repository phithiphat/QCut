import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ShopService from '../services/shop.service';
import type { Shop } from '../services/shop.service';

const EditShop: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [openingTime, setOpeningTime] = useState('09:00');
    const [closingTime, setClosingTime] = useState('20:00');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            ShopService.getShopById(id).then((response) => {
                const shop = response.data;
                setName(shop.name);
                setAddress(shop.address);
                setPhoneNumber(shop.phoneNumber);
                setOpeningTime(shop.openingTime);
                setClosingTime(shop.closingTime);
                setImageUrl(shop.imageUrl || '');
                setLoading(false);
            }).catch((error) => {
                console.error('Error fetching shop:', error);
                alert('Failed to load shop data');
                navigate('/shops');
            });
        }
    }, [id, navigate]);

    const handleUpdateShop = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        try {
            const updatedShop: Shop = {
                name,
                address,
                phoneNumber,
                openingTime,
                closingTime,
                imageUrl,
            };
            await ShopService.updateShop(parseInt(id), updatedShop);
            alert('Shop updated successfully!');
            navigate('/shops');
        } catch (error) {
            console.error('Error updating shop:', error);
            alert('Failed to update shop');
        }
    };

    const handleDeleteShop = async () => {
        if (!id) return;

        const confirmed = window.confirm(
            'Are you sure you want to delete this shop? This action cannot be undone.'
        );

        if (!confirmed) return;

        try {
            await ShopService.deleteShop(parseInt(id));
            alert('Shop deleted successfully!');
            navigate('/shops');
        } catch (error) {
            console.error('Error deleting shop:', error);
            alert('Failed to delete shop');
        }
    };

    if (loading) {
        return <div className="container mx-auto px-4 py-8 text-center">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">Edit Shop</h2>
                <form onSubmit={handleUpdateShop} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Shop Image URL (Optional)</label>
                        <input
                            type="url"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="e.g. https://example.com/shop-image.jpg"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                        >
                            Update Shop
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/shops')}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                            Cancel
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={handleDeleteShop}
                        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition shadow-md hover:shadow-lg mt-4"
                    >
                        Delete Shop
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditShop;
