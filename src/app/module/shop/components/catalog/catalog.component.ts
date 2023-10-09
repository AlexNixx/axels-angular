import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { Product } from '../../model/product';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-catalog',
    templateUrl: './catalog.component.html',
    styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
    public products: Product[] = [];
    private productsSubscription!: Subscription;

    constructor(private shopService: ShopService) {}

    ngOnInit(): void {
        this.productsSubscription = this.shopService
            .getProducts()
            .subscribe(products => (this.products = products));
    }

    ngOnDestroy(): void {
        if (this.productsSubscription) this.productsSubscription.unsubscribe();
    }
}
