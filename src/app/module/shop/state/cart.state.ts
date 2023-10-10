import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { CartModel, CartProduct } from '../model/cart.model';
import {
    AddToCart,
    ClearCart,
    DecrementQty,
    IncrementQty,
    RemoveFromCart
} from './cart.actions';

const initialState: CartModel = {
    cart: []
};

@State<CartModel>({
    name: 'cart',
    defaults: initialState
})
@Injectable()
export class CartState {
    @Action(AddToCart)
    addToCart(ctx: StateContext<CartModel>, action: AddToCart) {
        const state = ctx.getState();

        if (!!foundCartItem(state, action.cartProduct.product.id)) {
            const updatedCart = state.cart.map(cartItem =>
                cartItem.product.id === action.cartProduct.product.id
                    ? {
                          ...cartItem,
                          quantity:
                              cartItem.quantity + action.cartProduct.quantity
                      }
                    : cartItem
            );

            ctx.setState({
                ...state,
                cart: updatedCart
            });
        } else {
            ctx.setState({
                ...state,
                cart: [...state.cart, action.cartProduct]
            });
        }
    }

    @Action(RemoveFromCart)
    removeFromCart(ctx: StateContext<CartModel>, action: RemoveFromCart) {
        const state = ctx.getState();

        ctx.setState({
            ...state,
            cart: state.cart.filter(
                cartItem => cartItem.product.id !== action.id
            )
        });
    }

    @Action(IncrementQty)
    incrementQty(ctx: StateContext<CartModel>, action: IncrementQty) {
        const state = ctx.getState();

        if (!!foundCartItem(state, action.id)) {
            const updatedCart = state.cart.map(cartItem =>
                cartItem.product.id === action.id
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );

            ctx.setState({
                ...state,
                cart: updatedCart
            });
        }
    }

    @Action(DecrementQty)
    decrementQty(ctx: StateContext<CartModel>, action: DecrementQty) {
        const state = ctx.getState();

        const cartItemExist = foundCartItem(state, action.id);

        if (!!cartItemExist) {
            let updatedCart: CartProduct[] = [];

            if (cartItemExist.quantity === 1) {
                updatedCart = state.cart.filter(
                    cartItem => cartItem.product.id !== action.id
                );
            } else {
                updatedCart = state.cart.map(cartItem =>
                    cartItem.product.id === action.id
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                );
            }

            ctx.setState({
                ...state,
                cart: updatedCart
            });
        }
    }

    @Action(ClearCart)
    clearCart(ctx: StateContext<CartModel>) {
        ctx.setState(initialState);
    }
}

function foundCartItem(state: CartModel, productId: number | string) {
    return state.cart.find(cartItem => cartItem.product.id === productId);
}
