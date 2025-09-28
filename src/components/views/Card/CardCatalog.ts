import { ICardActions } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { Card, ICard } from "./Card";

export class CardCatalog extends Card<ICard> {
    protected cardImage: HTMLImageElement;
    protected cardCategory: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);

        if (actions?.onClick) {
            this.container.addEventListener('click', actions.onClick);
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
};