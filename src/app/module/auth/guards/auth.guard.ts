import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
    route,
    state,
    authService: AuthService = inject(AuthService),
    router: Router = inject(Router)
) => {
    let isAuth = false;
    authService.isLoggedIn$
        .asObservable()
        .subscribe({ next: data => (isAuth = data) });
    if (!isAuth) router.navigate(['/auth/login']);

    return isAuth;
};
