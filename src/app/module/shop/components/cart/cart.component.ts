import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCart } from '../../state/cart.selector';
import { AppState } from '../../../../state/app.state';
import {
    clearCart,
    decrementQty,
    incrementQty,
    removeFromCart
} from '../../state/cart.actions';
import { filter } from 'rxjs';
import { CartProduct } from '../../model/cart.model';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    private cart$ = this.store$.select(selectCart);
    public cartProducts: CartProduct[] = [];
    public totalPrice: number = 0;
    public totalQty: number = 0;

    constructor(private store$: Store<AppState>) {}

    ngOnInit(): void {
        this.cart$.pipe(filter(state => !!state)).subscribe(cartProducts => {
            this.cartProducts = cartProducts;
            this.totalPrice = cartProducts.reduce(
                (total, cartItem) =>
                    (total += cartItem.product.price * cartItem.quantity),
                0
            );
            this.totalQty = cartProducts.reduce(
                (acc, cartItem) => (acc += cartItem.quantity),
                0
            );
        });
    }

    increment(id: number | string) {
        this.store$.dispatch(incrementQty({ id }));
    }

    decrement(id: number | string) {
        this.store$.dispatch(decrementQty({ id }));
    }

    remove(id: number | string) {
        this.store$.dispatch(removeFromCart({ id }));
    }

    removeAllItem() {
        this.store$.dispatch(clearCart());
    }

    purchase() {}
}
