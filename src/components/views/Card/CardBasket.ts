import { ICardBasketActions } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Card, ICard } from "./Card";

export class CardBasket extends Card<ICard> {
    protected cardIndex: HTMLElement;
    protected cardButtonDelete: HTMLButtonElement;

    constructor(containder: HTMLElement, actions?: ICardBasketActions) {
        super(containder);

        this.cardIndex = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.cardButtonDelete = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);

        if (actions?.onRemove) {
            this.cardButtonDelete.addEventListener('click', actions.onRemove);
        };
    };

    set index(value: number) {
        this.cardIndex.textContent = String(value);
    };
};