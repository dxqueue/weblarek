import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Basket {
    private items: IProduct[] = [];

    constructor(protected events: IEvents) {
        this.items = [];
    }

    addInBasket(product: IProduct):void {
        if (product.price === null) {
            return;
        }

        if(!this.hasInBasket(product.id)) {
            this.items = [...this.items, product];
            this.events.emit('basket:changed', product);
            console.log('[basket:changed]', this.getBasket());
        };
    }

    removeFromBasket(product: IProduct):void {
        this.items = this.items.filter(item => item.id !== product.id);
        this.events.emit('basket:changed', product);
        console.log('[basket:changed]', this.getBasket());
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
        return [...this.items];
    }

    clearBasket():void {
        this.items = [];
        this.events.emit('basket:changed');
        console.log('[basket:changed]', this.getBasket());
    }
}