import api from './api';

export interface Booking {
    id: number;
    shopId: number;
    serviceId: number;
    startTime: string; // ISO String
    status?: string;
    shop?: { name: string };
    service?: { name: string };
    barber?: { name: string };
}

const createBooking = (shopId: number, serviceId: number, startTime: string, barberId?: number | null) => {
    return api.post('/bookings', {
        shopId,
        serviceId,
        startTime,
        barberId
    });
};

const getMyBookings = () => {
    return api.get<Booking[]>('/bookings/my-bookings');
};

const getShopBookings = (shopId: string) => {
    return api.get<Booking[]>(`/bookings/shop/${shopId}`);
};

const updateBookingStatus = (bookingId: number, status: string) => {
    return api.put(`/bookings/${bookingId}/status`, null, {
        params: { status }
    });
};

const BookingService = {
    createBooking,
    getMyBookings,
    getShopBookings,
    updateBookingStatus
};

export default BookingService;
