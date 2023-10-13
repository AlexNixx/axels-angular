import { Product } from './product.model';
import { CartProduct } from './cart.model';

export type ShippingAddress = {
    firstName: string;
    lastName: string;
    country: string;
    city: string;
    address: string;
    code: string;
};

export type Order = {
    id?: number;
    products: CartProduct[];
    shipping: ShippingAddress;
    created_at: Date;
};
