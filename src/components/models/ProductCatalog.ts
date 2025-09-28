import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ProductCatalog {
    private catalog: IProduct[] = [];
    private cardProduct: IProduct | null = null;

    constructor(protected events: IEvents) {
        this.catalog = [];
        this.cardProduct = null;
    }

    setCatalog(items: IProduct[]):void {
        this.catalog = [...items];
        this.events.emit('catalog:changed');
        console.log('[catalog:changed]', items);
    }

    getCatalog():IProduct[] {
        return this.catalog;
    }

    getProduct(id: string):IProduct | undefined {
        return this.catalog.find(item => item.id === id);
    }

    setCardProduct(product: IProduct | null):void {
        this.cardProduct = product;
    }

    getCardProduct():IProduct | null{
        return this.cardProduct;
    }
}