import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

interface Barber {
    id: number;
    name: string;
    status: string;
}

const ManageBarbers: React.FC = () => {
    const { shopId } = useParams();
    const [barbers, setBarbers] = useState<Barber[]>([]);
    const [newBarberName, setNewBarberName] = useState('');

    useEffect(() => {
        if (shopId) {
            loadBarbers();
        }
    }, [shopId]);

    const loadBarbers = () => {
        api.get(`/shops/${shopId}/barbers`).then((res) => {
            setBarbers(res.data);
        });
    };

    const handleAddBarber = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newBarberName) return;

        api.post(`/shops/${shopId}/barbers`, { name: newBarberName })
            .then(() => {
                setNewBarberName('');
                loadBarbers();
            })
            .catch(() => alert('Failed to add barber'));
    };

    const handleDeleteBarber = (id: number) => {
        if (window.confirm('Are you sure?')) {
            api.delete(`/barbers/${id}`)
                .then(() => loadBarbers())
                .catch(() => alert('Failed to delete barber'));
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Manage Barbers</h2>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Barber</h3>
                <form onSubmit={handleAddBarber} className="flex gap-4">
                    <input
                        type="text"
                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Enter barber name"
                        value={newBarberName}
                        onChange={(e) => setNewBarberName(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition shadow-sm"
                    >
                        Add Barber
                    </button>
                </form>
            </div>

            {barbers.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                    <p className="text-gray-500 text-lg">No barbers added yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {barbers.map((barber) => (
                        <div key={barber.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 p-6 flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl mb-4">
                                ✂️
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{barber.name}</h3>
                            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold mb-4">
                                {barber.status}
                            </span>
                            <button
                                onClick={() => handleDeleteBarber(barber.id)}
                                className="w-full bg-red-50 text-red-600 py-2 rounded-lg text-sm font-semibold hover:bg-red-100 transition"
                            >
                                Remove Barber
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageBarbers;
