import { menuArray } from "./data.js";

const menuSection = document.getElementById('menu');
const orderSection = document.getElementById('order');
const paymentModal = document.getElementById('payment-modal');
const confirmationSection = document.getElementById('order-confirmation');
let orderItems = [];

document.addEventListener('click', function (e) {
    if (e.target.dataset.add) {
        orderItems.push(changeOrder(parseInt(e.target.dataset.add)));
        renderOrderSummary();
    } 
    else if (e.target.dataset.remove) {
        orderItems.splice(orderItems.indexOf(changeOrder(parseInt(e.target.dataset.remove))),1);
        renderOrderSummary();
    }
    else if (e.target.id == 'comlete-order-btn' && orderItems.length > 0) {
        paymentModal.style.display = 'inline';
    }
})

paymentModal.addEventListener('submit', function(e) {
    e.preventDefault();

    const paymentDetails = new FormData(payment);
    const customerName = paymentDetails.get('customerName');
    paymentModal.style.display = 'none';
    orderSection.style.display = 'none';

    confirmationSection.innerHTML = `
    <div class="order-confirmation">
        Thanks, ${customerName}! Your order is on its way!
    </div>`
})


function getMenuHtml() {
    let menuHtml = ``;

    menuArray.forEach(function (menuItem) {
        menuHtml += `<div class='menu-item'>
        <div class='item-emoji'>${menuItem.emoji}</div>
        <div class='menu-item-info'>
            <p class='menu-item-name'>${menuItem.name}</p>
            <p class='menu-item-ingredients'>${menuItem.ingredients}</p>
            <p class='menu-item-price'>$${menuItem.price}</p>
        </div>
        <div>
            <button class='add-item-btn' data-add='${menuItem.id}-btn'>+</button>
        </div>
        </div>`
    });

    return menuHtml;
}

function renderMenu() {
    menuSection.innerHTML = getMenuHtml();
}

function renderOrderSummary() {
    orderSection.innerHTML = getOrderSummary();
}

function changeOrder(itemId) {
    const targetItem = menuArray.filter(function (menuItem) {
        return menuItem.id === itemId;
    })[0]

    return targetItem;
}

function getOrderSummary() {
    

    const orderTemplateHtml = `<div id='order-summary'>
        <h3 class='order-summary-weight'>Your order<h3>
        <div class='order-summary' id='order-summary-items'>
           ${getOrderSummaryItems()}
        </div>
        <div  class='order-summary-item'>
            <div class='order-summary-weight'>Total price:</div>
            <div class='menu-item-price menu-item-price-summary order-summary-weight'>$${getWholePrice()}</div>
        </div>
        <button class='submit-btn' id='comlete-order-btn'>Complete order</button>
    </div>`;

    return orderTemplateHtml;
}

function getOrderSummaryItems() {
    let orderItemsHtml = ``;

    orderItems.forEach(function(item) {
        orderItemsHtml += `
        <div class='order-summary-item'>
            <div class='menu-item-name'>${item.name}</div>
            <div class='remove-btn' data-remove='${item.id}'>remove</div>
            <div  class='menu-item-price menu-item-price-summary'>$${item.price}</div>
        </div>`
    });

    return orderItemsHtml;
}

function getWholePrice() {
    let price = 0;

    orderItems.forEach(function(item) {
        price += item.price;
    });

    return price;
}

renderMenu();