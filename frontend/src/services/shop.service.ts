import api from './api';

export interface Shop {
    id?: number;
    name: string;
    address: string;
    phoneNumber: string;
    openingTime: string;
    closingTime: string;
    imageUrl?: string;
    owner?: any;
}

const getAllShops = () => {
    return api.get<Shop[]>('/shops');
};

const getMyShops = () => {
    return api.get<Shop[]>('/shops/my-shops');
};

const createShop = (shop: Shop) => {
    return api.post<Shop>('/shops', shop);
};

const getShopById = (id: string) => {
    return api.get<Shop>(`/shops/${id}`);
};

const updateShop = (id: number, shop: Shop) => {
    return api.put<Shop>(`/shops/${id}`, shop);
};

const ShopService = {
    getAllShops,
    getMyShops,
    createShop,
    getShopById,
    updateShop
};

export default ShopService;
