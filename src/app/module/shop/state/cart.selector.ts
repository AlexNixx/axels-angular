import { CartState } from '../model/cart.model';
import { AppState } from '../../../state/app.state';
import { createSelector } from '@ngrx/store';

export const selectCartState = (state: AppState) => state.cart;
export const selectCart = createSelector(
    selectCartState,
    (state: CartState) => state.cart
);
