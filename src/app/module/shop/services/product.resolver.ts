import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';

import { ShopService } from './shop.service';

export const productResolver: ResolveFn<any> = (
    route,
    state,
    shopServices: ShopService = inject(ShopService),
    router: Router = inject(Router)
) => {
    return shopServices
        .getProduct(route.paramMap.get('id')!)
        .pipe(catchError(() => router.navigate(['/'])));
};
