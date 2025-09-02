export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type ICategory = 'другое' | 'софт-скил' | 'хард-скил' | 'кнопка' | 'дополнительное';

export interface IProduct {
    id: string;
    title: string;
    image: string;
    category: ICategory;
    price: number | null;
    description: string;
}

export type IPayment = 'card' | 'cash' | '';


 export interface IBuyer {
    payment: IPayment;
    address: string;
    email: string;
    phone: string;
 }
