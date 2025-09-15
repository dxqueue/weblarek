import { IBuyer, TPayment} from "../../types";

export class Buyer {
    payment: TPayment = 'card';
    email: string = '';
    phone: string = '';
    address: string = '';

    constructor () {
        this.payment = 'card';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    setBuyerData(data: Partial<IBuyer>):void {
        if(data.payment !== undefined) {
            this.payment = data.payment;
        };

        if(data.email !== undefined) {
            this.email = data.email;
        };

        if(data.phone !== undefined) {
            this.phone = data.phone;
        };

        if(data.address !== undefined) {
            this.address = data.address;
        };
    }

    getBuyerData():IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        };
    }

    validatiobBuyerData(): {[key: string]: string} {
        const errors: {[key: string]: string} = {};

        if(!this.email) {
            errors.email = 'Введите адрес электронной почты';
        };

        if(!this.phone) {
            errors.phone = 'Введите номер телефона';
        };

        if(!this.address) {
            errors.address = 'Введите адрес доставки';
        };

        return errors;
    }

    clearBuyerData():void {
        this.payment = 'card';
        this.email = '';
        this.phone = '';
        this.address = '';
    }
}