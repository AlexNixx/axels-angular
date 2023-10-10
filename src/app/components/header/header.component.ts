import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../module/auth/services/auth.service';
import { map, reduce, scan, Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public isAuth = false;
    public authSubscription!: Subscription;
    public totalQty$ = this.store
        .select(state => state.cart.cart)
        .pipe(
            map(cart => cart.map(item => item.quantity)),
            map(quantityArray =>
                quantityArray.reduce((acc, quantity) => acc + quantity, 0)
            )
        );

    constructor(
        private authService: AuthService,
        private store: Store<AppState>
    ) {}

    ngOnInit(): void {
        this.authSubscription = this.authService.isLoggedIn$
            .asObservable()
            .subscribe({
                next: isAuth => (this.isAuth = isAuth)
            });
    }

    ngOnDestroy() {
        if (this.authSubscription) this.authSubscription.unsubscribe();
    }
}
