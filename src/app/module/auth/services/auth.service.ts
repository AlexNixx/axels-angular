import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private LOCAL_STORAGE_KEY = 'token';
    public isLoggedIn$ = new BehaviorSubject<boolean>(this.getToken() !== null);

    constructor(private router: Router) {}

    setToken(token: string): void {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, token);
        this.isLoggedIn$.next(this.getToken() !== null);
    }

    removeToken(): void {
        localStorage.removeItem(this.LOCAL_STORAGE_KEY);
        this.isLoggedIn$.next(this.getToken() !== null);
    }

    getToken(): string | null {
        return localStorage.getItem(this.LOCAL_STORAGE_KEY);
    }

    login(userData: {
        email: string;
        password: string;
    }): Observable<string | boolean> {
        if (
            userData.email === 'alexnix.mail@gmail.com' &&
            userData.password === 'password123'
        ) {
            this.setToken(String(new Date()));
            return of(true);
        }
        return throwError(() => new Error('invalid credentials'));
    }

    logout = () => {
        this.removeToken();
        this.router.navigate(['auth/login']);
    };
}
