import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../module/auth/services/auth.service';
import { map, Observable, Subscription } from 'rxjs';
import { Select } from '@ngxs/store';
import { CartState } from '../../module/shop/state/cart.state';
import { CartModel } from '../../module/shop/model/cart.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuth = false;
    authSubscription!: Subscription;
    @Select(CartState) cart$!: Observable<CartModel>;
    totalQty: number = 0;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authSubscription = this.authService.isLoggedIn$
            .asObservable()
            .subscribe({
                next: isAuth => (this.isAuth = isAuth)
            });
        this.cart$
            .pipe(
                map(({ cart }) => cart.map(item => item.quantity)),
                map(quantityArray =>
                    quantityArray.reduce((acc, quantity) => acc + quantity, 0)
                )
            )
            .subscribe(total => (this.totalQty = total));
    }

    ngOnDestroy() {
        if (this.authSubscription) this.authSubscription.unsubscribe();
    }
}
