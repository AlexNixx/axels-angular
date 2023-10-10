import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CartState } from '../../state/cart.state';
import { filter, Observable } from 'rxjs';
import { CartModel, CartProduct } from '../../model/cart.model';
import {
    AddToCart,
    ClearCart,
    DecrementQty,
    IncrementQty,
    RemoveFromCart
} from '../../state/cart.actions';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    @Select(CartState) cart$!: Observable<CartModel>;
    public cartProducts: CartProduct[] = [];
    public totalPrice: number = 0;
    public totalQty: number = 0;

    ngOnInit(): void {
        this.cart$.pipe(filter(state => !!state)).subscribe(cartState => {
            this.cartProducts = cartState.cart;
            this.totalPrice = cartState.cart.reduce(
                (total, cartItem) =>
                    (total += cartItem.product.price * cartItem.quantity),
                0
            );
            this.totalQty = cartState.cart.reduce(
                (acc, cartItem) => (acc += cartItem.quantity),
                0
            );
        });
    }

    constructor(private store: Store) {}

    decrement(id: number | string) {
        this.store.dispatch(new DecrementQty(id));
    }

    increment(id: number | string) {
        this.store.dispatch(new IncrementQty(id));
    }

    remove(id: number | string) {
        this.store.dispatch(new RemoveFromCart(id));
    }

    removeAllItem() {
        this.store.dispatch(new ClearCart());
    }

    purchase() {}
}
