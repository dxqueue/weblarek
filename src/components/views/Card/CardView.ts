import { ICardActions } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card, ICard } from "./Card";

export class CardView extends Card<ICard> {
    protected cardImage: HTMLImageElement;
    protected cardCategory: HTMLElement;
    protected cardDescription: HTMLElement;
    protected cardButton: HTMLButtonElement;
    protected inBasket: boolean = false;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container); 

        this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
        this.cardDescription = ensureElement<HTMLElement>('.card__text', this.container);
        this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

        if (actions?.onClick) {
            this.cardButton.addEventListener('click', actions.onClick);
        };
    };

    set image(value: string) {
        this.setImage(this.cardImage, `${value}`, this.title);
    };

    set category(value: string) {
        this.cardCategory.textContent = String(value);

        for (const key in categoryMap) {
            this.cardCategory.classList.toggle(categoryMap[key as keyof typeof categoryMap], key === value);
        };
    };

    set description(value: string) {
        this.cardDescription.textContent = String(value);
    };

    set buttonText(value: string) {
        this.cardButton.textContent = String(value);
    };

    set buttonDisabled(value: boolean) {
        this.cardButton.disabled = value;
    };
};