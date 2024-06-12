import products from "./products.js";

function getItemProducts() {

    let basket = localStorage.getItem("basket");
    if (!basket) {

        localStorage.setItem("basket", []);
        return [];
    } else {
        return JSON.parse(basket);
    }
};

function setItemProducts(items) {

    localStorage.setItem("basket", JSON.stringify(items))

}

function renderButtons() {
    let buttons = document.getElementsByClassName("buy_sw");
    let basket = getItemProducts();
    for (let item of buttons) {

        if (basket.find((elem) => {
                return item.id == elem.id;
            })) {
            item.textContent = "Убрать";
        } else {
            item.textContent = "В корзину"
        }
    }
};

function deleteFromBasket(e) {
    console.log("delete");
    let item_id = e.target.id;
    let basket = getItemProducts();
    let index = basket.findIndex((elem) => {
        return elem.id == item_id;
    });
    basket.splice(index, 1);
    setItemProducts(basket);
    renderButtons();
}

function addToBasket(e) {

    if (e.target.textContent === "В корзину") {

        console.log("add");
        let item_id = e.target.id;
        //console.log(item_id);
        let basket = getItemProducts();
        if (basket.length === 0) {

            basket.push(products.find((item) => {
                return item.id == item_id;
            }))
        } else {
            if (basket.find((item) => {
                    return item.id == item_id;
                })) {
                return;

            } else {
                basket.push(products.find((item) => {
                    return item.id == item_id;
                }))
            }
        }

        setItemProducts(basket);
        renderButtons();

    } else {
        deleteFromBasket(e);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    let items = document.querySelector(".items");
    for (let element of products) {
        let item = document.createElement("div");
        item.innerHTML = `
        <div class="item" id = "${element.id}">
        <img src="${element.img}" alt="картинка" width="250px" height="250px">
        <span class="name">${element.title}</span>
        <span class="price">Цена: ${element.price} р.</span>
        <button class="buy_sw" id = "${element.id}">В корзину</button>
        </div>`;
        items.appendChild(item);
    }
    renderButtons();

    let buttons = document.getElementsByClassName("buy_sw");
    for (let item of buttons) {

        item.onclick = addToBasket;
    }
    const openModalButton = document.getElementById("modal_up");
    openModalButton.addEventListener("click", openModal);


});

function deleteBasket() {
    let modal = document.getElementById("modal");
    modal.remove();
}

const openModal = () => {
    renderBasket();
    console.log("1");
};

const closeModal = () => {
    deleteBasket();
    renderButtons();
};

function renderBasket() {
    let modal = document.createElement("div");
    modal.innerHTML = `<div id="modal" class="modal">
    <div>
        <div class="modal_window">
            <div></div>
            <div class="modal-content">
                <div class="head_modal">
                    <h3>Корзина</h3>
                    <span class="close-button" id="modal_down">&times;</span>
                </div>
                <div class="main_modal">
                </div>
            </div>
            <div class="footer_modal"></div>
        </div>
        <div></div>
        </div>
        </div>
    </div>`;

    document.body.appendChild(modal);
    let basket = getItemProducts();
    let items = document.querySelector(".main_modal");
    for (let element of basket) {
        let item = document.createElement("div");
        item.innerHTML = `<div class="item_modal" id = "${element.id}">
            <span class="num_modal"><li></li></span>
            <img src="${element.img}" alt="картинка" width="60px" height="50px">
            <span class="name_modal">${element.title}</span>
            <span class="price_modal">${element.price} р.</span>
            <button class="button_modal">Удалить</button>
        </div>`;
        items.appendChild(item);
    }

    const closeModalButton = document.getElementById("modal_down");
    const modalblock = document.getElementById("modal");
    closeModalButton.addEventListener("click", closeModal);

    modalblock.onclick = () => {
        deleteBasket();
    }

    let modal_con = document.querySelector(".modal-content") //закрытие модального окна вне области окна корзинв
    modal_con.onclick = (e) => {
        e.stopPropagation();
    }

    let deleteButtons = document.getElementsByClassName("button_modal");
    for (let item of deleteButtons) {
        item.onclick = (e) => {
            console.log(e.target.parentElement);
            let item_id = e.target.parentElement.id;
            let basket = getItemProducts();
            let index = basket.findIndex((elem) => {
                return elem.id == item_id;
            });
            basket.splice(index, 1);
            setItemProducts(basket);
            renderButtons();
            deleteBasket();
            renderBasket();
        }
    }
}
// При нажатии кнопки событие -получение id товара далее вызывать в какую нибудь 
//переменную getItemProducts, находить в массиве products по id обьект и потом пушить его в 
//массив и отправлять его в аргумент setItemProducts 
//при повторном нажатии - проверить есть ли в basket такой же обьект(если да то его удалить)