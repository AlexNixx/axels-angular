import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { productResolver } from './services/product.resolver';
import { authGuard } from '../auth/guards/auth.guard';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { checkoutGuard } from './guars/checkout.guard';

const routes: Routes = [
    {
        path: 'catalog',
        component: CatalogComponent
    },
    {
        path: 'product/:id',
        component: ProductDetailsComponent,
        resolve: { product: productResolver }
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [authGuard],
        canDeactivate: [checkoutGuard]
    },
    { path: '**', redirectTo: 'catalog', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule {}
