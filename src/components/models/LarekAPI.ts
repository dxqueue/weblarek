import { Api } from "../base/Api";
import { IOrderRequest, IProduct, IProductCatalogResponse, IOrderResponse} from "../../types";

export class LarekAPI {
    protected api: Api;
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        this.api = new Api(baseUrl, options);
        this.cdn = cdn;
    }

    getProductList(): Promise<IProduct[]> {
        return this.api.get('/product').then((data: IProductCatalogResponse) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        )
    };

    orderProducts(order: IOrderRequest): Promise<IOrderResponse> {
        return this.api.post('/order', order).then((data: IOrderResponse) => data);
    };
}