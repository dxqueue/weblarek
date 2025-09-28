import { ISuccessActions } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

interface SuccessData {
    total: number;
};

export class Success extends Component<SuccessData> {
    protected successDescription: HTMLElement;
    protected successButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ISuccessActions) {
        super(container);

        this.successDescription = ensureElement<HTMLElement>('.order-success__description', this.container);
        this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        if (actions?.onClose) {
            this.successButton.addEventListener('click', actions.onClose);
        };
    };

    set total(value: number) {
        this.successDescription.textContent = `Списано ${value} синапсов`;
    };
};