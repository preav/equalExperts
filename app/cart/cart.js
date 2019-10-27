class Cart {
  constructor() {
    this.cartContainer = document.getElementsByClassName("ee__cart")[0];
    this.initialiseCart();
  }

  initialiseCart() {
    this.cartListItems =
      localStorage.getItem("equalExpertsCart") &&
      JSON.parse(localStorage.getItem("equalExpertsCart")).length > 0
        ? JSON.parse(localStorage.getItem("equalExpertsCart"))
        : [];
    this.cartTotalPrice =
      localStorage.getItem("equalExpertsTotal") &&
      JSON.parse(localStorage.getItem("equalExpertsTotal")).length > 0
        ? JSON.parse(localStorage.getItem("equalExpertsTotal"))
        : {
            cartTotal: 0.0,
            cartTaxes: 0.0,
            cartFinalPrice: 0.0
          };
    this.populateItemOnDOM();
    this.totalCartValue();
  }

  handleAddToCart(productObj, quantity) {
    const addToCart = { ...productObj };
    addToCart.quantity = quantity;
    this.updateItemsInCart(addToCart, quantity);
    this.populateItemOnDOM();
    this.totalCartValue();
  }

  populateItemOnDOM() {
    const cartContainer = document.getElementsByClassName(
      "ee__cart-products"
    )[0];
    const productsInCart = `${this.cartListItems
      .map(
        item =>
          `<li id="ee__cart-${item.id}" data-id=${item.id}>
            <div class="cart-item-wrapper">
                <img class="item-image" src=${item.image} alt="ee product image" />
                <span class="item-name">${item.name} |</span>
                <span class="item-quantity"> Quantity - ${item.quantity} </span>
                <span class="item-price">| Price - ${item.price}</span>
            </div>
            <button class="ee__remove-item btn-danger">Delete</button>
            </li>`
      )
      .join("")}`;
    cartContainer.innerHTML = productsInCart;
    const removeBtn = document.getElementsByClassName("ee__remove-item");
    if (removeBtn) {
      Array.from(removeBtn).map(deleteBtn =>
        deleteBtn.addEventListener("click", event =>
          this.handleProductDelete(event)
        )
      );
    }
  }

  updateItemsInCart(addToCart, quantity) {
    const toAddItem = this.cartListItems.filter(
      cartItem => cartItem.id === addToCart.id
    );

    if (toAddItem.length > 0) {
      const existingItems = this.cartListItems.filter(
        cartItem => cartItem.id !== addToCart.id
      );
      toAddItem[0].quantity += quantity;
      this.cartListItems = [...existingItems, ...toAddItem];
    } else {
      this.cartListItems.push(addToCart);
    }
    this.addTolocalStorage();
  }

  handleProductDelete(event) {
    const cartContainer = document.getElementsByClassName(
      "ee__cart-products"
    )[0];
    const eventTarget = event && event.target;
    const deleteItem = eventTarget.parentElement;
    const deletedId = deleteItem.getAttribute("id");
    cartContainer.removeChild(deleteItem);
    this.cartListItems = this.cartListItems.filter(
      cartProd => cartProd.id !== parseInt(deletedId.split("-")[1])
    );
    this.totalCartValue();
  }

  totalCartValue() {
    let cartTotal = this.cartListItems.reduce((total, products) => {
      return (total += products.price * products.quantity);
    }, 0);
    cartTotal = this.arithmeticRound(cartTotal);
    let cartTaxes = this.arithmeticRound((125 / 1000) * cartTotal);
    const finalPrice = this.arithmeticRound(cartTotal + cartTaxes);
    this.cartTotalPrice.cartTotal = cartTotal;
    this.cartTotalPrice.cartTaxes = cartTaxes;
    this.cartTotalPrice.cartFinalPrice = finalPrice;
    const totalValueElement = document.getElementsByClassName(
      "ee__cart-total"
    )[0];
    totalValueElement.getElementsByClassName(
      "ee__cart-value"
    )[0].innerHTML = this.cartTotalPrice.cartTotal;
    totalValueElement.getElementsByClassName(
      "ee__cart-taxes"
    )[0].innerHTML = this.cartTotalPrice.cartTaxes;
    totalValueElement.getElementsByClassName(
      "ee__cart-final-price"
    )[0].innerHTML = this.cartTotalPrice.cartFinalPrice;
    this.addTolocalStorage();
  }

  arithmeticRound(price) {
    return +(Math.round(price + "e+2") + "e-2");
  }

  addTolocalStorage() {
    localStorage.setItem(
      "equalExpertsCart",
      JSON.stringify(this.cartListItems)
    );
    localStorage.setItem(
      "equalExpertsTotal",
      JSON.stringify(this.cartTotalPrice)
    );
  }
}

export default Cart;
