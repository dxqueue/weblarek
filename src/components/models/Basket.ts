import { IProduct } from "../../types";

export class Basket {
    private items: IProduct[] = [];

    constructor() {
        this.items = [];
    }

    addInBasket(product: IProduct):void {
        if(!this.hasInBasket(product.id)) {
            this.items.push(product);
        };
    }

    removeFromBasket(product: IProduct):void {
        this.items = this.items.filter(item => item.id !== product.id);
    }

    getBasketCount():number {
        return this.items.length;
    }

    getBasketTotal():number {
        return this.items.reduce((total, item) => {
            if(item.price !== null) {
                return total +  item.price;
            }

            return total;
        }, 0);
    }

    hasInBasket(id: string):boolean {
        return this.items.some(item => item.id === id);
    }

    getBasket():IProduct[] {
        return this.items;
    }

    clearBasket():void {
        this.items = [];
    }
}