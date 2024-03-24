let listProductsHome = document.querySelector(".listProduct");
let listCardHome = document.querySelector(".listCart");
let iconCart = document.querySelector(".icon-cart");
let shoppingCountList = document.querySelector(".icon-cart span");
let body = document.querySelector("body");
let closeCart = document.querySelector(".close");
let products = [];
let cart = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});
closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const addDataToHTML = () => {
  // remove datas default from HTML

  // add new datas
  if (products.length > 0) {
    // if has data
    products.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.dataset.id = product.id;
      newProduct.classList.add("item");
      newProduct.innerHTML = `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
      listProductsHome.appendChild(newProduct);
    });
  }
};
listProductsHome.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addCart")) {
    let id_product = positionClick.parentElement.dataset.id;
    addToCart(id_product);
  }
});
const addToCart = (product_id) => {
  let positionThisProductInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (cart.length <= 0) {
    cart = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    cart.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    cart[positionThisProductInCart].quantity =
      cart[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};
const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
const addCartToHTML = () => {
  listCardHome.innerHTML = "";
  let totalQuantity = 0;
  if (cart.length > 0) {
    cart.forEach((item) => {
      totalQuantity = totalQuantity + item.quantity;
      let newItem = document.createElement("div");
      newItem.classList.add("item");
      newItem.dataset.id = item.product_id;

      let positionProduct = products.findIndex(
        (value) => value.id == item.product_id
      );
      let info = products[positionProduct];
      listCardHome.appendChild(newItem);
      newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
    });
  }
  shoppingCountList.innerText = totalQuantity;
};

listCardHome.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantityCart(product_id, type);
  }
});
const changeQuantityCart = (product_id, type) => {
  let positionItemInCart = cart.findIndex(
    (value) => value.product_id == product_id
  );
  if (positionItemInCart >= 0) {
    let info = cart[positionItemInCart];
    switch (type) {
      case "plus":
        cart[positionItemInCart].quantity =
          cart[positionItemInCart].quantity + 1;
        break;

      default:
        let changeQuantity = cart[positionItemInCart].quantity - 1;
        if (changeQuantity > 0) {
          cart[positionItemInCart].quantity = changeQuantity;
        } else {
          cart.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToHTML();
  addCartToMemory();
};

const initApp = () => {
  // get data product
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      products = data;
      addDataToHTML();

      // get data cart from memory
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    });
};
initApp();

/* 
This code appears to be a JavaScript implementation for a basic e-commerce website. Let's break down the code step by step:

1. **DOM Element Selection**: The code starts by selecting various elements from the DOM using `document.querySelector()` and assigns them to variables for later use. These elements include the product list, cart list, cart icon, shopping count, body, and close button for the cart.

2. **Event Listeners**: Event listeners are added to the cart icon and the close button. When the cart icon is clicked, it toggles a CSS class on the body to show or hide the cart. Similarly, clicking the close button also toggles the visibility of the cart.

3. **Functions for Adding Data to HTML**: `addDataToHTML()` function is defined to populate the product list on the webpage. It creates HTML elements dynamically for each product in the `products` array and appends them to the product list container.

4. **Event Listener for Adding to Cart**: An event listener is added to the product list container to handle clicks on the "Add to Cart" button. When the button is clicked, it calls the `addToCart()` function.

5. **Function for Adding to Cart**: The `addToCart()` function manages adding products to the cart. It takes the product ID as a parameter, checks if the product is already in the cart, increments the quantity if it is, or adds it as a new item if not.

6. **Functions for Updating Cart in Memory and HTML**: `addCartToMemory()` function updates the cart data in the browser's local storage, while `addCartToHTML()` function updates the cart display on the webpage.

7. **Event Listener for Modifying Cart Quantity**: An event listener is added to the cart list container to handle clicks on the plus and minus buttons for modifying the quantity of items in the cart.

8. **Function for Modifying Cart Quantity**: The `changeQuantityCart()` function is responsible for updating the quantity of items in the cart when the plus or minus buttons are clicked. It adjusts the quantity and updates the cart accordingly.

9. **Initialization Function**: The `initApp()` function is called to initialize the application. It fetches product data from a JSON file, populates the product list, and retrieves cart data from local storage if available.

Overall, this code sets up an e-commerce interface allowing users to view products, add them to a cart, and modify the quantity of items in the cart, with cart data persisting across page reloads using browser local storage.
*/
