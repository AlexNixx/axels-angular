import { CartProduct } from '../model/cart.model';

export class AddToCart {
    static readonly type = '[Shop Module] Add to Cart';
    constructor(public cartProduct: CartProduct) {}
}

export class RemoveFromCart {
    static readonly type = '[Shop Module] Remove from Cart';
    constructor(public id: number | string) {}
}

export class IncrementQty {
    static readonly type = '[Shop Module] Increment Cart Qty';
    constructor(public id: number | string) {}
}

export class DecrementQty {
    static readonly type = '[Shop Module] Decrement Cart Qty';
    constructor(public id: number | string) {}
}

export class ClearCart {
    static readonly type = '[Shop Module] Clear Cart';
}
