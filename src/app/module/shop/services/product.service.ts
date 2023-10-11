import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private API_URL: string = 'http://localhost:3000/products';

    constructor(private http: HttpClient) {}

    getProducts() {
        return this.http.get<Product[]>(this.API_URL);
    }

    getProduct(id: string | number) {
        return this.http.get<Product>(`${this.API_URL}/${id}`);
    }
}
