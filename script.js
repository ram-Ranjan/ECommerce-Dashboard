let crudCrudUrl =
  "https://crudcrud.com/api/11e2dbb22fbe47a49f6361278b0fa749/products";
let total = 0;

function addProduct(event) {
  event.preventDefault();

  const sellingPrice = event.target.price.value;
  const productName = event.target.product.value;

  const product = {
    productName: productName,
    sellingPrice: sellingPrice,
  };

  if (!product.productName || !product.sellingPrice) {
    alert("Please add Product name and Selling Price Properly");
    return;
  }

  axios
    .post(crudCrudUrl, product)
    .then(() => {
      document.querySelector("#formData").reset();
      fetchData();
    })
    .catch((err) => console.log(err));
}

function fetchData() {
  axios
    .get(crudCrudUrl)
    .then((res) => {
      const products = res.data;
      const productList = document.querySelector("#productsList");
      productList.innerHTML = "";

      products.forEach((product) => displayProducts(product));
      updateTotal();
    })
    .catch((err) => console.log(err));
}

function updateTotal() {
  let worth = document.querySelector("#total");
  worth.value = total;
}

function displayProducts(product) {
  const productList = document.querySelector("#productsList");
  const listItem = document.createElement("li");

  let itemContent = document.createElement("div");

  listItem.innerHTML = `<span>${product.productName}</span>    <span>Rs ${product.sellingPrice}</span> `;

  listItem.appendChild(itemContent);
  createDeleteBtn(listItem, product);

  productList.appendChild(listItem);
  total += Number(product.sellingPrice);
}

function createDeleteBtn(listItem, product) {
  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    axios
      .delete(`${crudCrudUrl}/${product._id}`)
      .then(() => fetchData())
      .catch((err) => console.log(err));
  });

  listItem.appendChild(deleteBtn);
}

document.addEventListener("DOMContentLoaded", fetchData);
