/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/cart/cart.js":
/*!**************************!*\
  !*** ./app/cart/cart.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Cart {\r\n  constructor() {\r\n    this.cartContainer = document.getElementsByClassName(\"ee__cart\")[0];\r\n    this.initialiseCart();\r\n  }\r\n\r\n  initialiseCart() {\r\n    this.cartListItems =\r\n      localStorage.getItem(\"equalExpertsCart\") &&\r\n      JSON.parse(localStorage.getItem(\"equalExpertsCart\")).length > 0\r\n        ? JSON.parse(localStorage.getItem(\"equalExpertsCart\"))\r\n        : [];\r\n    this.cartTotalPrice =\r\n      localStorage.getItem(\"equalExpertsTotal\") &&\r\n      JSON.parse(localStorage.getItem(\"equalExpertsTotal\")).length > 0\r\n        ? JSON.parse(localStorage.getItem(\"equalExpertsTotal\"))\r\n        : {\r\n            cartTotal: 0.0,\r\n            cartTaxes: 0.0,\r\n            cartFinalPrice: 0.0\r\n          };\r\n    this.populateItemOnDOM();\r\n    this.totalCartValue();\r\n  }\r\n\r\n  handleAddToCart(productObj, quantity) {\r\n    const addToCart = { ...productObj };\r\n    addToCart.quantity = quantity;\r\n    this.updateItemsInCart(addToCart, quantity);\r\n    this.populateItemOnDOM();\r\n    this.totalCartValue();\r\n  }\r\n\r\n  populateItemOnDOM() {\r\n    const cartContainer = document.getElementsByClassName(\r\n      \"ee__cart-products\"\r\n    )[0];\r\n    const productsInCart = `${this.cartListItems\r\n      .map(\r\n        item =>\r\n          `<li id=\"ee__cart-${item.id}\" data-id=${item.id}>\r\n            <div class=\"cart-item-wrapper\">\r\n                <img class=\"item-image\" src=${item.image} alt=\"ee product image\" />\r\n                <span class=\"item-name\">${item.name} |</span>\r\n                <span class=\"item-quantity\"> Quantity - ${item.quantity} </span>\r\n                <span class=\"item-price\">| Price - ${item.price}</span>\r\n            </div>\r\n            <button class=\"ee__remove-item btn-danger\">Delete</button>\r\n            </li>`\r\n      )\r\n      .join(\"\")}`;\r\n    cartContainer.innerHTML = productsInCart;\r\n    const removeBtn = document.getElementsByClassName(\"ee__remove-item\");\r\n    if (removeBtn) {\r\n      Array.from(removeBtn).map(deleteBtn =>\r\n        deleteBtn.addEventListener(\"click\", event =>\r\n          this.handleProductDelete(event)\r\n        )\r\n      );\r\n    }\r\n  }\r\n\r\n  updateItemsInCart(addToCart, quantity) {\r\n    const toAddItem = this.cartListItems.filter(\r\n      cartItem => cartItem.id === addToCart.id\r\n    );\r\n\r\n    if (toAddItem.length > 0) {\r\n      const existingItems = this.cartListItems.filter(\r\n        cartItem => cartItem.id !== addToCart.id\r\n      );\r\n      toAddItem[0].quantity += quantity;\r\n      this.cartListItems = [...existingItems, ...toAddItem];\r\n    } else {\r\n      this.cartListItems.push(addToCart);\r\n    }\r\n    this.addTolocalStorage();\r\n  }\r\n\r\n  handleProductDelete(event) {\r\n    const cartContainer = document.getElementsByClassName(\r\n      \"ee__cart-products\"\r\n    )[0];\r\n    const eventTarget = event && event.target;\r\n    const deleteItem = eventTarget.parentElement;\r\n    const deletedId = deleteItem.getAttribute(\"id\");\r\n    cartContainer.removeChild(deleteItem);\r\n    this.cartListItems = this.cartListItems.filter(\r\n      cartProd => cartProd.id !== parseInt(deletedId.split(\"-\")[1])\r\n    );\r\n    this.totalCartValue();\r\n  }\r\n\r\n  totalCartValue() {\r\n    let cartTotal = this.cartListItems.reduce((total, products) => {\r\n      return (total += products.price * products.quantity);\r\n    }, 0);\r\n    cartTotal = this.arithmeticRound(cartTotal);\r\n    let cartTaxes = this.arithmeticRound((125 / 1000) * cartTotal);\r\n    const finalPrice = this.arithmeticRound(cartTotal + cartTaxes);\r\n    this.cartTotalPrice.cartTotal = cartTotal;\r\n    this.cartTotalPrice.cartTaxes = cartTaxes;\r\n    this.cartTotalPrice.cartFinalPrice = finalPrice;\r\n    const totalValueElement = document.getElementsByClassName(\r\n      \"ee__cart-total\"\r\n    )[0];\r\n    totalValueElement.getElementsByClassName(\r\n      \"ee__cart-value\"\r\n    )[0].innerHTML = this.cartTotalPrice.cartTotal;\r\n    totalValueElement.getElementsByClassName(\r\n      \"ee__cart-taxes\"\r\n    )[0].innerHTML = this.cartTotalPrice.cartTaxes;\r\n    totalValueElement.getElementsByClassName(\r\n      \"ee__cart-final-price\"\r\n    )[0].innerHTML = this.cartTotalPrice.cartFinalPrice;\r\n    this.addTolocalStorage();\r\n  }\r\n\r\n  arithmeticRound(price) {\r\n    return +(Math.round(price + \"e+2\") + \"e-2\");\r\n  }\r\n\r\n  addTolocalStorage() {\r\n    localStorage.setItem(\r\n      \"equalExpertsCart\",\r\n      JSON.stringify(this.cartListItems)\r\n    );\r\n    localStorage.setItem(\r\n      \"equalExpertsTotal\",\r\n      JSON.stringify(this.cartTotalPrice)\r\n    );\r\n  }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cart);\r\n\n\n//# sourceURL=webpack:///./app/cart/cart.js?");

/***/ }),

/***/ "./app/main.js":
/*!*********************!*\
  !*** ./app/main.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _product_list_product_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./product-list/product-list */ \"./app/product-list/product-list.js\");\n\r\n\r\nconst productList = new _product_list_product_list__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\nproductList.init(\"../../data.json\");\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (productList);\r\n\n\n//# sourceURL=webpack:///./app/main.js?");

/***/ }),

/***/ "./app/product-list/product-list.js":
/*!******************************************!*\
  !*** ./app/product-list/product-list.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cart_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../cart/cart */ \"./app/cart/cart.js\");\n\r\n\r\nclass ProductList {\r\n  constructor() {\r\n    this.cart = new _cart_cart__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    this.productsListLocal = [];\r\n  }\r\n\r\n  init(filePath) {\r\n    this.getAllProducts(filePath);\r\n    this.initialiseEvents();\r\n  }\r\n  getAllProducts(filePath) {\r\n    fetch(filePath)\r\n      .then(resp => resp.json())\r\n      .then(data => {\r\n        this.productsListLocal = [...data.products];\r\n        this.displayProductList(this.productsListLocal);\r\n      })\r\n      .catch(rej =>\r\n        console.log(\r\n          \"Something went wrong, unable to get products. Please try again later\",\r\n          rej\r\n        )\r\n      );\r\n  }\r\n\r\n  displayProductList(products) {\r\n    const productList = products;\r\n    const productElement = document.getElementsByClassName(\"ee__products\")[0];\r\n    productList.map(product => {\r\n      products = `\r\n      <div class=\"ee__product\" id=${product.id}>\r\n        <div class=\"ee__product-image\">\r\n            <img src=${product.image} alt=\"ee product image\" />\r\n        </div>\r\n        <div class=\"ee__product-name\">${product.name}</div>\r\n        <div class=\"ee__product-price\">Rs ${product.price}</div>\r\n        <div class=\"ee__quantity\">\r\n          <button class=\"ee__change-value ee__quantity-decr\">-</button>\r\n          <span class=\"ee__quantity-value\">0</span>\r\n          <button class=\"ee__change-value ee__quantity-incr\">+</button>\r\n          <div class=\"ee__operations\">\r\n              <button class=\"ee__add-to-cart btn-primary disabled\"> Add to Cart </button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      `;\r\n      productElement.innerHTML += products;\r\n    });\r\n  }\r\n\r\n  initialiseEvents() {\r\n    const productsEvent = document.getElementsByClassName(\"ee__products\")[0];\r\n    productsEvent.addEventListener(\"click\", event =>\r\n      this.handleProductEvents(event)\r\n    );\r\n    const cartEvent = document.getElementsByClassName(\"ee__cart-products\")[0];\r\n    cartEvent.addEventListener(\"click\", event => this.handleCartEvents(event));\r\n  }\r\n\r\n  handleCartEvents(event) {\r\n    if (\r\n      event &&\r\n      event.target &&\r\n      event.target.className.includes(\"ee__remove-item\")\r\n    ) {\r\n      const eventTarget = event.target;\r\n      const quantity = eventTarget.parentElement\r\n        .getElementsByClassName(\"item-quantity\")[0]\r\n        .innerText.split(\"-\")[1];\r\n      const id = parseInt(eventTarget.parentElement.getAttribute(\"data-id\"));\r\n      const matchedProduct = this.productsListLocal.filter(\r\n        product => product.id === id\r\n      );\r\n      this.updateProductQuantity(matchedProduct[0], quantity, \"sub\");\r\n    }\r\n  }\r\n\r\n  handleProductEvents(event) {\r\n    if (event && event.target) {\r\n      const targetElement = event.target;\r\n      if (\r\n        targetElement.className.includes(\"ee__quantity-decr\") ||\r\n        targetElement.className.includes(\"ee__quantity-incr\")\r\n      ) {\r\n        this.handleQuantityChange(targetElement);\r\n      } else if (targetElement.className.includes(\"ee__add-to-cart\")) {\r\n        this.handleAddToCart(targetElement);\r\n      }\r\n    }\r\n  }\r\n\r\n  handleAddToCart(target) {\r\n    let productQuantity = target.parentElement.parentElement.getElementsByClassName(\r\n      \"ee__quantity-value\"\r\n    )[0];\r\n    let productQuantityCur = parseInt(productQuantity.innerText);\r\n    const productId = parseInt(\r\n      productQuantity.parentElement.parentElement.getAttribute(\"id\")\r\n    );\r\n    const productToAdd = this.productsListLocal.filter(\r\n      product => product.id === productId\r\n    );\r\n    const matchedProduct = productToAdd[0];\r\n    if (\r\n      matchedProduct.quantity >= productQuantityCur &&\r\n      productQuantityCur > 0\r\n    ) {\r\n      this.cart.handleAddToCart(matchedProduct, productQuantityCur);\r\n      this.updateProductQuantity(matchedProduct, productQuantityCur, \"add\");\r\n    } else {\r\n      console.log(\"Inadequate quantity\");\r\n    }\r\n  }\r\n\r\n  updateProductQuantity(matchedProduct, productQuantityCur, operation) {\r\n    productQuantityCur = parseInt(productQuantityCur);\r\n    const updatedProduct = this.productsListLocal.filter(\r\n      product => product.id === matchedProduct.id\r\n    );\r\n    const remainingProduct = this.productsListLocal.filter(\r\n      product => product.id !== matchedProduct.id\r\n    );\r\n    if (operation.toLowerCase() === \"add\") {\r\n      updatedProduct[0].quantity -= productQuantityCur;\r\n    } else if (operation.toLowerCase() === \"sub\") {\r\n      updatedProduct[0].quantity += productQuantityCur;\r\n    }\r\n    this.productsListLocal = [...remainingProduct, ...updatedProduct];\r\n  }\r\n\r\n  handleQuantityChange(target) {\r\n    let productQuantity = target.parentElement.getElementsByClassName(\r\n      \"ee__quantity-value\"\r\n    )[0];\r\n    let productQuantityCur = parseInt(productQuantity.innerText);\r\n    if (target.className.includes(\"ee__quantity-incr\")) {\r\n      productQuantityCur += 1;\r\n    } else if (\r\n      target.className.includes(\"ee__quantity-decr\") &&\r\n      productQuantityCur > 0\r\n    ) {\r\n      productQuantityCur -= 1;\r\n    }\r\n    if (productQuantityCur > 0) {\r\n      productQuantity.parentElement\r\n        .getElementsByClassName(\"ee__add-to-cart\")[0]\r\n        .classList.remove(\"disabled\");\r\n    } else if (productQuantityCur <= 0) {\r\n      productQuantity.parentElement\r\n        .getElementsByClassName(\"ee__add-to-cart\")[0]\r\n        .classList.add(\"disabled\");\r\n    }\r\n    productQuantity.innerText = productQuantityCur;\r\n  }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProductList);\r\n\n\n//# sourceURL=webpack:///./app/product-list/product-list.js?");

/***/ })

/******/ });