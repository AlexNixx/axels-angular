import { CartState } from '../model/cart.model';
import { createReducer, on, props } from '@ngrx/store';
import {
    addToCart,
    clearCart,
    decrementQty,
    incrementQty,
    removeFromCart
} from './cart.actions';
import { state } from '@angular/animations';

const initialState: CartState = {
    cart: []
};

export const cartReducer = createReducer(
    initialState,
    on(addToCart, (state, { product, quantity = 1 }) => {
        const cartItemExist = state.cart.find(
            cartItem => cartItem.product.id === product.id
        );

        if (!!cartItemExist) {
            const updatedCart = state.cart.map(cartItem =>
                cartItem.product.id === product.id
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem
            );

            return {
                ...state,
                cart: updatedCart
            };
        }

        return {
            ...state,
            cart: [...state.cart, { product, quantity }]
        };
    }),
    on(removeFromCart, (state, { id }) => ({
        ...state,
        cart: state.cart.filter(cartItem => cartItem.product.id !== id)
    })),
    on(incrementQty, (state, { id }) => {
        const cartItemExist = state.cart.find(
            cartItem => cartItem.product.id === id
        );

        if (!!cartItemExist) {
            const updatedCart = state.cart.map(cartItem =>
                cartItem.product.id === id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );

            return {
                ...state,
                cart: updatedCart
            };
        }

        return {
            ...state,
            cart: [...state.cart]
        };
    }),
    on(decrementQty, (state, { id }) => {
        const cartItemExist = state.cart.find(
            cartItem => cartItem.product.id === id
        );

        if (!!cartItemExist) {
            let updatedCart = [];

            if (cartItemExist.quantity === 1) {
                updatedCart = state.cart.filter(
                    cartItem => cartItem.product.id !== id
                );
            } else {
                updatedCart = state.cart.map(cartItem =>
                    cartItem.product.id === id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                );
            }

            return {
                ...state,
                cart: updatedCart
            };
        }

        return {
            ...state,
            cart: [...state.cart]
        };
    }),
    on(clearCart, (state, {}) => ({
        ...initialState
    }))
);
