import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    private isAuth = false;
    private authSubscription!: Subscription;
    loginForm!: FormGroup;

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', [
                Validators.required,
                Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
            ])
        });
        this.authSubscription = this.authService.isLoggedIn$
            .asObservable()
            .subscribe(data => (this.isAuth = data));
        if (this.isAuth) this.router.navigate(['/']);
    }

    ngOnDestroy() {
        if (this.authSubscription) this.authSubscription.unsubscribe();
    }

    loginSubmit() {
        this.authService.login(this.loginForm.value).subscribe({
            next: () => this.router.navigate(['/']),
            error: err => alert(err.message)
        });
    }
}
