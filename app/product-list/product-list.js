import Cart from "./../cart/cart";

class ProductList {
  constructor() {
    this.cart = new Cart();
    this.productsListLocal = [];
  }

  init(filePath) {
    this.getAllProducts(filePath);
    this.initialiseEvents();
  }
  getAllProducts(filePath) {
    fetch(filePath)
      .then(resp => resp.json())
      .then(data => {
        this.productsListLocal = [...data.products];
        this.displayProductList(this.productsListLocal);
      })
      .catch(rej =>
        console.log(
          "Something went wrong, unable to get products. Please try again later",
          rej
        )
      );
  }

  displayProductList(products) {
    const productList = products;
    const productElement = document.getElementsByClassName("ee__products")[0];
    productList.map(product => {
      products = `
      <div class="ee__product" id=${product.id}>
        <div class="ee__product-image">
            <img src=${product.image} alt="ee product image" />
        </div>
        <div class="ee__product-name">${product.name}</div>
        <div class="ee__product-price">Rs ${product.price}</div>
        <div class="ee__quantity">
          <button class="ee__change-value ee__quantity-decr">-</button>
          <span class="ee__quantity-value">0</span>
          <button class="ee__change-value ee__quantity-incr">+</button>
          <div class="ee__operations">
              <button class="ee__add-to-cart btn-primary disabled"> Add to Cart </button>
          </div>
        </div>
      </div>
      `;
      productElement.innerHTML += products;
    });
  }

  initialiseEvents() {
    const productsEvent = document.getElementsByClassName("ee__products")[0];
    productsEvent.addEventListener("click", event =>
      this.handleProductEvents(event)
    );
    const cartEvent = document.getElementsByClassName("ee__cart-products")[0];
    cartEvent.addEventListener("click", event => this.handleCartEvents(event));
  }

  handleCartEvents(event) {
    if (
      event &&
      event.target &&
      event.target.className.includes("ee__remove-item")
    ) {
      const eventTarget = event.target;
      const quantity = eventTarget.parentElement
        .getElementsByClassName("item-quantity")[0]
        .innerText.split("-")[1];
      const id = parseInt(eventTarget.parentElement.getAttribute("data-id"));
      const matchedProduct = this.productsListLocal.filter(
        product => product.id === id
      );
      this.updateProductQuantity(matchedProduct[0], quantity, "sub");
    }
  }

  handleProductEvents(event) {
    if (event && event.target) {
      const targetElement = event.target;
      if (
        targetElement.className.includes("ee__quantity-decr") ||
        targetElement.className.includes("ee__quantity-incr")
      ) {
        this.handleQuantityChange(targetElement);
      } else if (targetElement.className.includes("ee__add-to-cart")) {
        this.handleAddToCart(targetElement);
      }
    }
  }

  handleAddToCart(target) {
    let productQuantity = target.parentElement.parentElement.getElementsByClassName(
      "ee__quantity-value"
    )[0];
    let productQuantityCur = parseInt(productQuantity.innerText);
    const productId = parseInt(
      productQuantity.parentElement.parentElement.getAttribute("id")
    );
    const productToAdd = this.productsListLocal.filter(
      product => product.id === productId
    );
    const matchedProduct = productToAdd[0];
    if (
      matchedProduct.quantity >= productQuantityCur &&
      productQuantityCur > 0
    ) {
      this.cart.handleAddToCart(matchedProduct, productQuantityCur);
      this.updateProductQuantity(matchedProduct, productQuantityCur, "add");
    } else {
      console.log("Inadequate quantity");
    }
  }

  updateProductQuantity(matchedProduct, productQuantityCur, operation) {
    productQuantityCur = parseInt(productQuantityCur);
    const updatedProduct = this.productsListLocal.filter(
      product => product.id === matchedProduct.id
    );
    const remainingProduct = this.productsListLocal.filter(
      product => product.id !== matchedProduct.id
    );
    if (operation.toLowerCase() === "add") {
      updatedProduct[0].quantity -= productQuantityCur;
    } else if (operation.toLowerCase() === "sub") {
      updatedProduct[0].quantity += productQuantityCur;
    }
    this.productsListLocal = [...remainingProduct, ...updatedProduct];
  }

  handleQuantityChange(target) {
    let productQuantity = target.parentElement.getElementsByClassName(
      "ee__quantity-value"
    )[0];
    let productQuantityCur = parseInt(productQuantity.innerText);
    if (target.className.includes("ee__quantity-incr")) {
      productQuantityCur += 1;
    } else if (
      target.className.includes("ee__quantity-decr") &&
      productQuantityCur > 0
    ) {
      productQuantityCur -= 1;
    }
    if (productQuantityCur > 0) {
      productQuantity.parentElement
        .getElementsByClassName("ee__add-to-cart")[0]
        .classList.remove("disabled");
    } else if (productQuantityCur <= 0) {
      productQuantity.parentElement
        .getElementsByClassName("ee__add-to-cart")[0]
        .classList.add("disabled");
    }
    productQuantity.innerText = productQuantityCur;
  }
}

export default ProductList;
