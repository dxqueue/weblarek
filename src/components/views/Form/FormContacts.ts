import { IFormActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Form } from "./Form";

export interface IFormContactsActions extends IFormActions {
    onEmailChange?: (email: string) => void;
    onPhoneChange?: (phone: string) => void;
};

export interface IFormContactsData {
    email: string;
    phone: string;
};

export class FormContacts extends Form {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(container: HTMLElement, actions?: IFormContactsActions) {
        super(container, actions);

        this.emailInput = ensureElement<HTMLInputElement>('input[name="email"]', this. container);
        this.phoneInput = ensureElement<HTMLInputElement>('input[name="phone"]', this. container);

        this.emailInput.addEventListener('input', () => {
            if (actions?.onEmailChange) {
                actions.onEmailChange(this.emailInput.value);
            };
        });

        this.phoneInput.addEventListener('input', () => {
            if (actions?.onPhoneChange) {
                actions.onPhoneChange(this.phoneInput.value);
            };
        });
    };

    set email(value: string) {
        this.emailInput.value = value;
    };

    set phone(value: string) {
        this.phoneInput.value = value;
    };

    get email(): string {
        return this.emailInput.value;
    };

    get phone(): string {
        return this.phoneInput.value;
    };

    get formData(): IFormContactsData {
        return {
            email: this.email,
            phone: this.phone,
        };
    };
};