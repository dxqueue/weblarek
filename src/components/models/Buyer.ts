import { IBuyer, TPayment} from "../../types";
import { IEvents } from "../base/Events";

export class Buyer {
    private payment: TPayment = 'card';
    private email: string = '';
    private phone: string = '';
    private address: string = '';

    constructor (protected events: IEvents) {}

    setBuyerData(data: IBuyer):void {
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

        this.events.emit('buyer:changed')
    }

    getBuyerData():IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        };
    }

    validateData(): {[key: string]: string} {
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

        if(!this.payment) {
            errors.payment = 'Необходимо указать способ оплаты';
        }

        return errors;
    }

    clearBuyerData():void {
        this.payment = 'card';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    validationOrder(): {[key: string]: string} {
        const errors: {[key: string]: string} = {};

        if(!this.address) {
            errors.address = 'Введите адрес доставки';
        };

        if(!this.payment) {
            errors.payment = 'Необходимо указать способ оплаты';
        }

        return errors;
    }

    validationContacts(): {[key: string]: string} {
        const errors: {[key: string]: string} = {};

        if(!this.email) {
            errors.email = 'Введите адрес электронной почты';
        };

        if(!this.phone) {
            errors.phone = 'Введите номер телефона';
        };

        return errors;
    }

    setDataField<K extends keyof IBuyer>(field: K, value: IBuyer[K]): void {
        switch (field) {
            case 'payment':
                this.payment = value as TPayment;
                break;
            case 'email':
                this.email = value as TPayment;
                break;
            case 'phone':
                this.phone = value as TPayment;
                break;
            case 'address':
                this.address = value as TPayment;
                break;
        }
        this.events.emit('buyer:changed');
    }
}