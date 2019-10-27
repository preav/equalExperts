import ProductList from "./product-list/product-list";

const productList = new ProductList();
productList.init("../app/assets/data.json");

export default productList;
