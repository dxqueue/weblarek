export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'cash' | 'card' | '';

export type TCategory = 'софт-скил' | 'хард-скил' | 'дополнительное' | 'кнопка' | 'другое';

export interface IBuyer {
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    price: number | null;
    category: TCategory;
}

export interface IOrderResponse {
    id: string;
    total: number;
}

export interface IProductCatalogResponse {
    total: number;
    items: IProduct[];
}

export interface IOrderRequest extends IBuyer {
    total: number;
    items: string[];
}

export interface ICardActions {
    onClick?: (event: MouseEvent) => void;
}

export interface ICardBasketActions {
    onRemove?: (event: MouseEvent) => void;
}

export interface IBasketActions {
    onOrder?: () => void;
}

export interface IFormActions {
    onSubmit?: (event: Event) => void;
}

export interface ISuccessActions {
    onClose?: () => void;
}