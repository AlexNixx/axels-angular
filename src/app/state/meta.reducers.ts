import { ActionReducer, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { AppState } from './app.state';

export function localStorageSyncReducer(
    reducer: ActionReducer<AppState>
): ActionReducer<any> {
    return localStorageSync({ keys: ['cart'], rehydrate: true })(reducer);
}
export const metaReducers: Array<MetaReducer<any, any>> = [
    localStorageSyncReducer
];
