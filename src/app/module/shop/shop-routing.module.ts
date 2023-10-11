import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { productResolver } from './services/product.resolver';
import { authGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
    {
        path: 'catalog',
        component: CatalogComponent
    },
    {
        path: 'product/:id',
        component: ProductDetailsComponent,
        resolve: { product: productResolver },
        canActivate: [authGuard]
    },
    { path: 'cart', component: CartComponent },
    { path: '**', redirectTo: 'catalog', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShopRoutingModule {}
