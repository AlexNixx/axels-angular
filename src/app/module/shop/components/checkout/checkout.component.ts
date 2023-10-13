import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CartState } from '../../state/cart.state';
import { filter, Observable } from 'rxjs';
import { CartModel, CartProduct } from '../../model/cart.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { ShippingAddress } from '../../model/order.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
    @Select(CartState) cart$!: Observable<CartModel>;

    public checkoutForm!: FormGroup;
    public cartProducts: CartProduct[] = [];
    public totalPrice: number = 0;
    public totalQty: number = 0;
    public isSubmitted = false;

    constructor(
        private checkoutService: CheckoutService,
        private router: Router
    ) {}

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
        this.checkoutForm = new FormGroup({
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            code: new FormControl('', [Validators.required])
        });
    }

    checkoutSubmit() {
        const shippingAddress: ShippingAddress = {
            firstName: this.checkoutForm.value.firstName,
            lastName: this.checkoutForm.value.lastName,
            country: this.checkoutForm.value.country,
            city: this.checkoutForm.value.city,
            address: this.checkoutForm.value.address,
            code: this.checkoutForm.value.code
        };
        this.checkoutService
            .createOrder({
                products: this.cartProducts,
                shipping: shippingAddress,
                created_at: new Date()
            })
            .subscribe({
                next: () => {
                    this.isSubmitted = !this.isSubmitted;
                    this.router.navigate(['/']);
                }
            });
    }
}
