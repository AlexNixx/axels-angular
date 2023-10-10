import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { cartReducer } from '../module/shop/state/cart.reducer';

export const reducers: ActionReducerMap<AppState> = { cart: cartReducer };
