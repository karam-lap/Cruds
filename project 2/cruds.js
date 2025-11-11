let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;

// get total
function getTotal() {
  if (price.value !== "") {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// get localStorage data
let dataPro = localStorage.products ? JSON.parse(localStorage.products) : [];

// create or update product
submit.onclick = function () {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (title.value !== "" && price.value !== "" && category.value !== "") {
    if (mood === "create") {
      if (product.count > 1) {
        for (let i = 0; i < +product.count; i++) {
          dataPro.push(product);
        }
      } else {
        dataPro.push(product);
      }
    } else {
      dataPro[tmp] = product;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }

    localStorage.setItem("products", JSON.stringify(dataPro));
    clearData();
    readData();
  }
};

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read data
function readData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateProduct(${i})">Update</button></td>
        <td><button onclick="deleteProduct(${i})">Delete</button></td>
      </tr>
    `;
  }

  document.getElementById("tbody").innerHTML = table;

  let btndelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btndelete.innerHTML = `<button onclick="deleteAllProducts()">Delete All (${dataPro.length})</button>`;
  } else {
    btndelete.innerHTML = "";
  }
}

// delete single product
function deleteProduct(i) {
  dataPro.splice(i, 1);
  localStorage.products = JSON.stringify(dataPro);
  readData();
}

// delete all products
function deleteAllProducts() {
  localStorage.clear();
  dataPro.splice(0);
  readData();
}

// first load
readData();

// update product
function updateProduct(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  category.value = dataPro[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({ top: 0, behavior: "smooth" });
}

// search product
let search = document.getElementById("search");
let searchMood = "title";

function getSearchMood(id) {
  if (id === "searchtitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  readData();
}

function searchData(value) {
  let table = "";
  value = value.toLowerCase();
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood === "title") {
      if (dataPro[i].title.includes(value)) {
        table += createRow(i);
      }
    } else {
      if (dataPro[i].category.includes(value)) {
        table += createRow(i);
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

function createRow(i) {
  return `
    <tr>
      <td>${i + 1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].category}</td>
      <td><button onclick="updateProduct(${i})">Update</button></td>
      <td><button onclick="deleteProduct(${i})">Delete</button></td>
    </tr>
  `;
}
















