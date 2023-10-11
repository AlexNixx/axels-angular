import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../module/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isAuth = false;
    authSubscription!: Subscription;

    constructor(private authService: AuthService) {}

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
