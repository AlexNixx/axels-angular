import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../model/order.model';

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {
    private API_URL: string = 'http://localhost:3000/orders';

    constructor(private http: HttpClient) {}

    createOrder(order: Order) {
        return this.http.post<Order>(this.API_URL, order);
    }
}
