import { IFormActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

export abstract class Form extends Component<{}> {
    protected errorsElement: HTMLElement;
    protected submitButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IFormActions) {
        super(container);

        this.errorsElement = ensureElement<HTMLElement>('.form__errors', this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);

        if (actions?.onSubmit) {
            this.container.addEventListener('submit', actions.onSubmit)
        };
    };

    set valid(value: boolean) {
        this.submitButton.disabled = !value;
    };

    set errors(value: string) {
        this.errorsElement.textContent = String(value);
    };

    clearErrors(): void {
        this.errorsElement.textContent = '';
    };

    setValidationErrors(errors: {[key: string]: string}): void {
        const errorMessage = Object.values(errors).filter(Boolean);
        if (errorMessage.length > 0) {
            this.errors = errorMessage.join(', ');
            this.valid = false;
        } else {
            this.clearErrors();
            this.valid = true;
        };
    };
};