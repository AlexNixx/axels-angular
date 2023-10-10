import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product.model';
import { Store } from '@ngrx/store';
import { addToCart } from '../../state/cart.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartState } from '../../model/cart.model';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    public product!: Product;
    public quantity: number = 1;

    constructor(
        private activatedRoute: ActivatedRoute,
        private store$: Store<CartState>,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ product }) => {
            this.product = product;
        });
    }

    addToCart() {
        this.store$.dispatch(
            addToCart({ product: this.product, quantity: this.quantity })
        );
        this.snackBar.open('Product has been successfully added', 'Close', {
            duration: 1500
        });
    }

    decrement() {
        if (this.quantity > 1) this.quantity--;
    }

    increment() {
        this.quantity++;
    }
}
