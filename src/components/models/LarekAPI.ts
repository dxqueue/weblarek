import { Api } from "../base/Api";
import { IOrderRequest, IProduct, IProductCatalogResponse, IOrderResponse} from "../../types";

export class LarekAPI extends Api {
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProductList(): Promise<IProduct[]> {
        return this.get('/product').then((data: IProductCatalogResponse) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            }))
        )
    };

    getProduct(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then((item: IProduct) => ({
				...item,
				image: this.cdn + item.image,
			})
		);

    };

    orderProducts(order: IOrderRequest): Promise<IOrderResponse> {
        return this.post('/order', order).then((data: IOrderResponse) => data);
    };
}