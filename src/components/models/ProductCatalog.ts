import { IProduct } from "../../types";

export class ProductCatalog {
    catalog: IProduct[] = [];
    cardProduct: IProduct | null = null;

    constructor() {
        this.catalog = [];
        this.cardProduct = null;
    }

    setCatalog(items: IProduct[]):void {
        this.catalog = [...items];
    }

    getCatalog():IProduct[] {
        return this.catalog;
    }

    getProduct(id: string):IProduct | null {
        return this.catalog.find(item => item.id === id) || null;
    }

    setCardProduct(product: IProduct):void {
        this.cardProduct = product;
    }

    getCardProduct():IProduct | null{
        return this.cardProduct;
    }
}