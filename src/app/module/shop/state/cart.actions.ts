import { createAction, props } from '@ngrx/store';
import { CartProduct, CartState } from '../model/cart.model';

export const addToCart = createAction(
    '[Shop Module] Add to Cart',
    props<CartProduct>()
);

export const removeFromCart = createAction(
    '[Shop Module] Remove from Cart',
    props<{ id: number | string }>()
);

export const incrementQty = createAction(
    '[Shop Module] Increment Cart Qty',
    props<{ id: number | string }>()
);

export const decrementQty = createAction(
    '[Shop Module] Decrement Cart Qty',
    props<{ id: number | string }>()
);

export const clearCart = createAction('[Shop Module] Clear Cart');
