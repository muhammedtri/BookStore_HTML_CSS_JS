let createBook = document.getElementById("createBook");
let fields = document.querySelector(".bookFields");
let title = document.getElementById("title");
let author = document.getElementById("author");
let publisher = document.getElementById("publisher");
let genre = document.getElementById("genre");
let price = document.getElementById("price");
let submit = document.querySelector(".submit");
let searchByCategory = document.querySelector(".searchByCategory");
let searchByTitle = document.querySelector(".searchByTitle");
let searchField = document.querySelector("#searchField");
console.log(searchField);
let mood = "create";
let tmp;
createBook.onclick = function () {
  fields.classList.toggle("show");
};
let dataCollection;
if (localStorage.books != null) {
  dataCollection = JSON.parse(localStorage.getItem("books"));
} else {
  dataCollection = [];
}
showData();
submit.onclick = function () {
  let dataBooks = {
    title: title.value,
    author: author.value,
    publisher: publisher.value,
    genre: genre.value,
    price: price.value,
  };
  if (mood === "create") {
    dataCollection.push(dataBooks);
  } else if (mood === "update") {
    dataCollection[tmp] = dataBooks;
    mood = "create";
    submit.innerHTML = "Create";
  }

  localStorage.setItem("books", JSON.stringify(dataCollection));
  clearFields();
  showData();
};

function clearFields() {
  title.value = "";
  author.value = "";
  publisher.value = "";
  genre.value = "";
  price.value = "";
}

function showData() {
  let table = "";
  if (dataCollection.length != 0) {
    for (let i = 0; i < dataCollection.length; i++) {
      table += `
      <tr>
      <td>${dataCollection[i].title}</td>
      <td>${dataCollection[i].author}</td>
      <td>${dataCollection[i].publisher}</td>
      <td>${dataCollection[i].genre}</td>
      <td>${dataCollection[i].price}</td>
      <td><button onclick="editBook(${i})" class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="deleteBook(${i})" class="delete"><i class="fa-solid fa-trash"></i></button>
      </td>
       </tr>
      `;
      document.querySelector("tbody").innerHTML = table;
    }
  } else {
    document.querySelector("tbody").innerHTML = "";
  }
  let cls = document.querySelector(".clearAll");
  if (dataCollection.length > 0) {
    cls.style.display = "block";
  } else {
    cls.style.display = "none";
  }
  document.querySelector("tfoot td span").innerHTML = dataCollection.length;
}

function deleteBook(i) {
  dataCollection.splice(i, 1);
  localStorage.books = JSON.stringify(dataCollection);
  showData();
}
function editBook(i) {
  mood = "update";
  submit.innerHTML = "Update";
  if (!fields.classList.contains("show")) {
    fields.classList.toggle("show");
  }
  title.value = dataCollection[i].title;
  author.value = dataCollection[i].author;
  publisher.value = dataCollection[i].publisher;
  genre.value = dataCollection[i].genre;
  price.value = dataCollection[i].price;

  tmp = i;

  showData();
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

function deleteAll() {
  localStorage.clear();
  dataCollection.splice(0);
  showData();
}

searchByCategory.onclick = function () {
  document.querySelector("tfoot").remove();
  let search = "";
  for (let i = 0; i < dataCollection.length; i++) {
    if (
      dataCollection[i].genre
        .toLowerCase()
        .includes(searchField.value.toLowerCase())
    ) {
      search += `
      <tr>
      <td>${dataCollection[i].title}</td>
      <td>${dataCollection[i].author}</td>
      <td>${dataCollection[i].publisher}</td>
      <td>${dataCollection[i].genre}</td>
      <td>${dataCollection[i].price}</td>
      <td><button onclick="editBook(${i})" class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
          <button onclick="deleteBook(${i})" class="delete"><i class="fa-solid fa-trash"></i></button>
      </td>
       </tr>
      `;
    } else {
      search = "No result";
    }
  }
  document.querySelector("tbody").innerHTML = search;
  searchField.value = "";
};
