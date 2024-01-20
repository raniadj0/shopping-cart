// Selecting elements from the DOM
let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

// Event listener for opening the shopping cart
openShopping.addEventListener('click', () => {
    body.classList.add('active');
});

// Event listener for closing the shopping cart
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

// Array of product objects
let products = [
    {
        id: 1,
        name: 'intel core i9-11900k processor',
        image: 'product1.jpg',
        price: 120.99
    },
    {
        id: 2,
        name: 'Nvidia Geforce rtx 3080 Graphics Card',
        image: 'product2.jpg',
        price: 699
    },
    {
        id: 3,
        name: 'Master Hyper 212 RGB CPU Cooler',
        image: 'product3.jpg',
        price: 89.99
    },
    {
        id: 4,
        name: 'Hard Drive',
        image: 'product4.jpg',
        price: 300
    },
    {
        id: 5,
        name: 'Dell UltraSharp U2720Q Monitor',
        image: 'product5.jpg',
        price: 350
    },
    {
        id: 6,
        name: 'Keyboard-Wireless-Mouse',
        image: 'product6.jpg',
        price: 70.99
    }
];

// Array to store items in the shopping cart
let listCards = [];

// Function to initialize the application, displaying products on the page
function initApp() {
    products.forEach((value, key) => {
        // Creating a new product element
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="images/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${formatPrice(value.price)}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    });
}

// Initializing the application
initApp();

// Function to add a product to the shopping cart
function addToCard(key) {
    // If the product is not in the cart, add it
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    // Reload the shopping cart
    reloadCard();
}

// Function to reload and display the shopping cart
function reloadCard() {
    // Clear the existing cart
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    // Loop through items in the cart
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        // Create a new cart item element
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="images/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });

    // Update total price and quantity
    total.innerText = formatPrice(totalPrice);
    quantity.innerText = count;

    // Update the cart's total price
    updateCartPrice();
}

// Function to format the price as currency
function formatPrice(price) {
    return `$${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Function to change the quantity of a product in the cart
function changeQuantity(key, quantity) {
    // If quantity is reduced to 0, remove the item from the cart
    if (quantity == 0) {
        delete listCards[key];
    } else {
        // Update quantity and price if changed
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    // Reload the shopping cart
    reloadCard();
}
