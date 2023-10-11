import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
    public products: Product[] = [];
    private productsSubscription!: Subscription;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {
        this.productsSubscription = this.productService
            .getProducts()
            .subscribe(products => (this.products = products));
    }

    ngOnDestroy(): void {
        if (this.productsSubscription) this.productsSubscription.unsubscribe();
    }
}
