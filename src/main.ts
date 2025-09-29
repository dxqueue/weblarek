import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { LarekAPI } from './components/communicate/LarekAPI';
import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { ProductCatalog } from './components/models/ProductCatalog';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Buyer } from './components/models/Buyer';
import { Basket } from './components/models/Basket';
import { Gallery } from './components/views/Gallery';
import { CardCatalog } from './components/views/Card/CardCatalog';
import { Modal } from './components/views/Modal';
import { IOrderRequest, IProduct } from './types';
import { CardView } from './components/views/Card/CardView';
import { BasketView } from './components/views/BasketView';
import { Header } from './components/views/Header';
import { CardBasket } from './components/views/Card/CardBasket';
import { FormOrder } from './components/views/Form/FormOrder';
import { FormContacts } from './components/views/Form/FormContacts';
import { Success } from './components/views/Success';

// Инициализация брокера событий
const events = new EventEmitter();

// Инициализация моделей данных
const catalogModel = new ProductCatalog(events);
const buyerModel = new Buyer(events);
const basketModel = new Basket(events);

// Инициализация API
const baseApi = new Api(API_URL);
const larekAPI = new LarekAPI(CDN_URL, baseApi);

// Инициализация шаблонов
const templates = {
    header: ensureElement<HTMLElement>('.header'),
    gallery: ensureElement<HTMLElement>('.page__wrapper'),
    modal: ensureElement<HTMLElement>('.modal'),
    success: ensureElement<HTMLTemplateElement>('#success'),
    cardCatalog: ensureElement<HTMLTemplateElement>('#card-catalog'),
    cardPreview: ensureElement<HTMLTemplateElement>('#card-preview'),
    cardBasket: ensureElement<HTMLTemplateElement>('#card-basket'),
    basket: ensureElement<HTMLTemplateElement>('#basket'),
    order: ensureElement<HTMLTemplateElement>('#order'),
    contacts: ensureElement<HTMLTemplateElement>('#contacts'),
};

// Инициализация компонентов представления
const gallery = new Gallery(templates.gallery);
const modal = new Modal(templates.modal, events);
const header = new Header(templates.header, events);

// Ссылки на активные формы
let currentFormOrder: FormOrder | null = null;
let currentFormContacts: FormContacts | null = null;

// Обработчик изменения каталога товаров
events.on('catalog:changed', () => {
    const itemCards = catalogModel.getCatalog().map((item) => {
        const card = new CardCatalog(cloneTemplate(templates.cardCatalog), {
            onClick: () => {
                events.emit('card:selected', item);
            },
        });
        return card.render(item);
    });
    gallery.render({ catalog: itemCards });
});

// Обработчик открытия выбранной карточки товара
events.on('card:selected', (item: IProduct) => {
    catalogModel.setCardProduct(item);
    const isInBasket = basketModel.hasInBasket(item.id);
    const card = new CardView(cloneTemplate(templates.cardPreview), {
        onClick: () => {
            if (isInBasket) {
                events.emit('card:remove', item);
            } else {
                events.emit('card:add', item);
            }
        },
    });

    if (item.price === null) { 
        card.buttonText = 'Недоступно'; 
        card.buttonDisabled = true; 
    } else if (isInBasket) { 
        card.buttonText = 'Удалить из корзины'; 
        card.buttonDisabled = false; 
    } else { 
        card.buttonText = 'Купить'; 
        card.buttonDisabled = false; 
    } 

    modal.render({ content: card.render(item) });
    modal.open();
})

// Обработчик добавления товара в корзину
events.on('card:add', (item: IProduct) => {
    basketModel.addInBasket(item);
    modal.close();
});

// Обработчик удаления товара из корзины
events.on('card:remove', (item: IProduct) => {
    basketModel.removeFromBasket(item);
    modal.close();
});

// Обработчик открытия корзины
events.on('basket:open', () => {
    const basket = new BasketView(cloneTemplate(templates.basket), {
        onOrder: () => {
            events.emit('basket:order');
        },
    });

    const cardItems = basketModel.getBasket();
    const basketItems = cardItems.map((item, index) => {
        const card = new CardBasket(cloneTemplate(templates.cardBasket), {
            onRemove: () => events.emit('card:remove', item),
        });
        return card.render({
            title: item.title,
            price: item.price,
            index: index + 1
        });
    });
    basket.items = basketItems;
    basket.total = basketModel.getBasketTotal();
    modal.render({ content: basket.render()});
    modal.open();
});

// Обработчик удаления карточки товара из корзины
events.on('basket:card:remove', (item: IProduct) => {
    basketModel.removeFromBasket(item);
});

// Обработчик изменения корзины
events.on('basket:changed', () => {
    header.counter = basketModel.getBasketCount();
});

// Обработчик оформления заказа
events.on('basket:order', () => {
    currentFormOrder = new FormOrder(cloneTemplate(templates.order), {
        onSubmit: (event: Event) => {
            event.preventDefault();
            const formData = currentFormOrder!.formData;
            buyerModel.setBuyerData({
                payment: formData.payment,
                address: formData.address,
                email: '',
                phone: '',
            });
            events.emit('order:submit', formData);
            console.log('[order:submit]', formData);
        },
        onPaymentChange: (payment) => {
            buyerModel.setDataField('payment', payment);
        },
        onAddressChange: (address) => {
            buyerModel.setDataField('address', address);
        },
    });

    currentFormOrder.payment = buyerModel.getBuyerData().payment || 'card';
    currentFormOrder.address = buyerModel.getBuyerData().address;

    modal.render({ content: currentFormOrder.render() });
    modal.open();
})

// Обработчик изменения данных покупателя
events.on('buyer:changed', () => {
    if (currentFormOrder) {
        const orderValidationErrors = buyerModel.validationOrder();
        currentFormOrder.setValidationErrors(orderValidationErrors);
    };
    if (currentFormContacts) {
        const contactsValidationErrors = buyerModel.validationContacts();
        currentFormContacts.setValidationErrors(contactsValidationErrors);
    };
});

// Обработчик данных покупателя
events.on('order:submit', () => {
    currentFormContacts = new FormContacts(cloneTemplate(templates.contacts), {
            onSubmit: (event: Event) => {
                event.preventDefault();
                const formData = currentFormContacts!.formData;
                buyerModel.setDataField('email', formData.email);
                buyerModel.setDataField('phone', formData.phone);
                events.emit('contacts:submit', formData);
                console.log('[contacts:submit]', formData);
            },
            onEmailChange: (email) => {
                buyerModel.setDataField('email', email);
            },
            onPhoneChange: (phone) => {
                buyerModel.setDataField('phone', phone);
            },
    });

    currentFormContacts.email = buyerModel.getBuyerData().email;
    currentFormContacts.phone = buyerModel.getBuyerData().phone;

    modal.render({ content: currentFormContacts.render() });
    modal.open();
});

// Обработчик закрытия модального окна
events.on('modal:close', () => { 
    currentFormOrder = null;
    currentFormContacts = null;
});

// Обработчик отправки формы
events.on('contacts:submit', async (data: { email: string; phone: string }) => {
    const orderData: IOrderRequest = {
        payment: buyerModel.getBuyerData().payment,
        email: data.email,
        phone: data.phone,
        address: buyerModel.getBuyerData().address,
        total: basketModel.getBasketTotal(),
        items: basketModel.getBasket().map(item => item.id),
    };
    
    console.log('Данные заказа:', orderData);
    larekAPI.orderProducts(orderData)
        .then(res => {
            const orderSuccess = new Success(cloneTemplate(templates.success), {
                onClose: () => {
                    modal.close();
                    basketModel.clearBasket();
                    buyerModel.clearBuyerData();
                    console.log('Заказ:', res);
                },
            });

            orderSuccess.render({ total: res.total});
            modal.render({ content: orderSuccess.render()});
            modal.open();
        })
        .catch(error => console.log('Ошибка оформления заказа:', error));
});

// Загрузка товаров с сервера
larekAPI.getProductList()
    .then(products => {
        catalogModel.setCatalog(products);
    })
    .catch(error => console.log('Ошибка при загрузке каталога', error));