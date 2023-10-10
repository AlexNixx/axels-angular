import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { CatalogComponent } from './components/catalog/catalog.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        CatalogComponent,
        ProductComponent,
        ProductDetailsComponent,
        CartComponent
    ],
    imports: [
        CommonModule,
        ShopRoutingModule,
        MatButtonModule,
        MatCardModule,
        NgOptimizedImage,
        MatSnackBarModule,
        MatDividerModule,
        MatIconModule
    ]
})
export class ShopModule {}
