import './scss/styles.scss';
import { ProductCatalog } from './components/models/ProductCatalog';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { apiProducts } from './utils/data';
import { IBuyer } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { LarekAPI } from './components/models/LarekAPI';
import { Api } from './components/base/Api';

// проверка методов класса ProductCatalog

const catalog = new ProductCatalog();
catalog.setCatalog(apiProducts.items)
console.log('Массив товаров из каталога: ', catalog.getCatalog());
const productOne = catalog.getProduct('c101ab44-ed99-4a54-990d-47aa2bb4e7d9');
const productTwo = catalog.getProduct('412bcf81-7e75-4e70-bdb9-d3c73c9803b7');
catalog.setCardProduct(productOne);
console.log('Выбранные товары для отображения: ', catalog.getCardProduct());

// проверка методов класса Basket

const basket = new Basket();
basket.addInBasket(productOne);
basket.addInBasket(productTwo);
console.log('Товары в корзине: ', basket.getBasket());
console.log('Проверка есть ли данный товар в корзине по ID (c101ab44-ed99-4a54-990d-47aa2bb4e7d9): ', basket.hasInBasket('c101ab44-ed99-4a54-990d-47aa2bb4e7d9'));
console.log('Проверка есть ли данный товар в корзине по ID (854cef69-976d-4c2a-a18c-2aa45046c390): ', basket.hasInBasket('854cef69-976d-4c2a-a18c-2aa45046c390'));
console.log('Количество товаров в корзине: ', basket.getBasketCount());
console.log('Общая стоимость товаров в корзине: ', basket.getBasketTotal());
basket.removeFromBasket(productOne);
console.log('Проверка наличия товара в корзине полсе удаления (c101ab44-ed99-4a54-990d-47aa2bb4e7d9): ', basket.hasInBasket('c101ab44-ed99-4a54-990d-47aa2bb4e7d9'));
basket.clearBasket();
console.log('Удаление всех товаров из корзины');
console.log('Товары в корзине: ', basket.getBasket());

// проверка методов класса Buyer

const buyer = new Buyer();
console.log('Получение данных о покупателе: ', buyer.getBuyerData());
console.log('Валидация данных: ', buyer.validatiobBuyerData());
const newUser: IBuyer = {
    "payment": "",
    "email": "example@gmail.com",
    "phone": "123456789",
    "address": 'Sanya',
};
buyer.setBuyerData(newUser);
console.log('Валидация данных: ', buyer.validatiobBuyerData());
console.log('Получение данных о покупателе: ', buyer.getBuyerData());
buyer.clearBuyerData();
console.log('Получение данных о покупателе: ', buyer.getBuyerData());

// Работа с сервером

const baseApi = new Api(API_URL);
const larekAPI = new LarekAPI(CDN_URL, baseApi);

larekAPI.getProductList()
    .then(products => {
        catalog.setCatalog(products);
        console.log('Товары загруженные с сервера в каталог:');
        console.log(catalog.getCatalog());
    })
    .catch(error => console.log('Ошибка при загрузке каталога', error));