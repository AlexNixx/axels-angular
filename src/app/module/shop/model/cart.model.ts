import { Product } from './product.model';

export type CartProduct = {
    product: Product;
    quantity: number;
};

export interface CartModel {
    cart: CartProduct[];
}
