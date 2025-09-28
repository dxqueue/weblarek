import { IFormActions, TPayment } from "../../../types";
import { ensureAllElements, ensureElement } from "../../../utils/utils";
import { Form } from "./Form";

export interface IFormOrderActions extends IFormActions {
    onPaymentChange?: (payment: TPayment) => void;
    onAddressChange?: (address: string) => void;
};

export interface IFormOrderData {
    payment: TPayment;
    address: string;
};

export class FormOrder extends Form {
    protected paymentButtons: HTMLButtonElement[];
    protected addressInput: HTMLInputElement;

    constructor(container: HTMLElement, actions?: IFormOrderActions) {
        super(container, actions);

        this.paymentButtons = ensureAllElements<HTMLButtonElement>('.button_alt', this.container);
        this.addressInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

        this.paymentButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.selectPayment(button.name as TPayment);
                if (actions?.onPaymentChange) {
                    actions.onPaymentChange(button.name as TPayment);
                };
            });
        });

        this.addressInput.addEventListener('input', () => {
            if (actions?.onAddressChange) {
                actions.onAddressChange(this.addressInput.value);
            };
        });

    };

    set payment(value: TPayment) {
        this.selectPayment(value);
    };

    set address(value: string) {
        this.addressInput.value = value;
    };

    get payment(): TPayment {
        const selectButton = this.paymentButtons.find(button => {
            button.classList.contains('button_alt-active')
        });
        return selectButton?.name as TPayment || 'card';
    };

    get address(): string {
        return this.addressInput.value;
    };

    get formData(): IFormOrderData {
        return {
            payment: this.payment,
            address: this.address,
        };
    };

    selectPayment(payment: TPayment): void {
        this.paymentButtons.forEach(button => {
            button.classList.toggle('button_alt-active', button.name === payment);
        });
    };
};