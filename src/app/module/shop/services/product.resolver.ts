import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';

import { ProductService } from './product.service';

export const productResolver: ResolveFn<any> = (
    route,
    state,
    productService: ProductService = inject(ProductService),
    router: Router = inject(Router)
) => {
    return productService
        .getProduct(route.paramMap.get('id')!)
        .pipe(catchError(() => router.navigate(['/'])));
};
