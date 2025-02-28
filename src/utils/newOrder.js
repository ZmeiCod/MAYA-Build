// артикулы товаров
const products = [
    "9751", // Медовик
];

// количество товаров
const productQuantities = [
    "1",
];

// модификаторы (если используются)
const productModifiers = {
};

// детали заказа
const params = {
    secret: "hbyiYhytkr9iQttbt87dzERYes7SRYd2ZA8FGs2YHZ6ieknAhhEGNhrTBiAe6E5S43iAf9fRYa44ndrAnT644iHsy8zrBr7rdfQkeZ44ZTSa27BaRy4GFA24zifZBdbFiSSsDGfnr3nbYRbB967EsTyQ6DBtFD2SfF8HbdZs6atQRydQn9fGTDiN6N6BbTeikdTnhFGbF3SiiY3BT78BAfbsT8TZR3755RfbhQdREY4QFRdkNaQ9fRs4N9", // ключ api
    street: encodeURIComponent("Мира"), // улица
    home: "1", // дом
    apart: "1", // квартира
    phone: "79000000001", // телефон
    descr: encodeURIComponent("ИГНОРИРУЙТЕ, ЭТО ТЕСТОВЫЙ ЗАКАЗ С НОВОГО САЙТА!"), // комментарий
    name: encodeURIComponent("Владислав") // имя клиента
};

// формируем данные для отправки
const formData = new URLSearchParams();

for (const key in params) {
    formData.append(key, params[key]);
}

// содержимое заказа
products.forEach((product, index) => {
    formData.append(`product[${index}]`, product);
    formData.append(`product_kol[${index}]`, productQuantities[index]);

    // Добавление модификаторов, если они существуют
    if (productModifiers[index] !== undefined) {
        formData.append(`product_mod[${index}]`, productModifiers[index]);
    }
});

// отправка данных
fetch("https://app.frontpad.ru/api/index.php?new_order", {
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
})
.then(response => {
    // Проверка статуса ответа
    if (!response.ok) {
        throw new Error('Сетевая ошибка');
    }
    return response.text();
})
.then(result => {
    console.log(result);
})
.catch(error => {
    console.error('Ошибка:', error);
});
