import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export class Modal extends Component<{content: HTMLElement}> {
    protected modalButton: HTMLButtonElement;
    protected modalElement: HTMLElement;
    protected page: HTMLElement;
    protected isOpen = false;

    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);

        this.modalButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
        this.modalElement= ensureElement<HTMLElement>('.modal__content', this.container);
        this.page = ensureElement<HTMLElement>('.page__wrapper');

        this.modalButton.addEventListener('click', (event) => {
            event.preventDefault();
            this.close();
        });

        this.container.addEventListener('click', (event) => {
            if (event.target === this.container) {
                this.close();
            };
        });

        document.addEventListener('keydown', (event) => {
            if (this.isOpen && event.key === "Escape") {
                this.close();
            };
        });
    };

    set content(value: HTMLElement) {
        this.modalElement.replaceChildren(value);
    };

    open(): void {
        this.page.classList.add('page__wrapper_locked');
        this.container.classList.add('modal_active');
        this.isOpen = true;
    };

    close(): void {
        this.page.classList.remove('page__wrapper_locked');
        this.container.classList.remove('modal_active');
        this.isOpen = false;
        this.events.emit('modal:close');
    };

    render(data?: Partial<{content: HTMLElement}>): HTMLElement {
        if (data?.content) {
            this.content = data.content;
        };
        return this.container;
    };
};