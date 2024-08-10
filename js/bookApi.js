const new_books = document.getElementById("new_books");
const search_books = document.getElementById("search_books");
const search_input = document.getElementById("search_inp");
const search_btn = document.getElementById("search_btn");

const mainURL_API = "https://api.itbook.store/1.0/";

if (location.href.includes("index.html")) {
  // kiem tra link trang web co phai index khong, neu co thi load danh sach sach moi nhat
  // load len danh sach ngay khi mo trang web
  document.addEventListener("DOMContentLoaded", async function () {
    // goi den API => tra ve 1 list
    await getNewList();
  });
} else if (location.href.includes("search.html")) {
  // kiem tra link trang web co phai search khong, neu co thi bat su kien tim kiem theo tu khoa
  // bat su kien cho thanh search
  search_btn.onclick = async function (e) {
    search_books.innerHTML=""
    e.preventDefault();
    if (search_input.value) {
      // neu co keyword thi moi tim
      await searchBooksByKeyword(search_input.value);
      search_input.value = "";
    } else {
      alert("Can nhap du lieu de search");
    }
  };
}

async function searchBooksByKeyword(keyword) {
  await fetch(mainURL_API + `search/${keyword}`)
    .then((data) => data.json())
    .then((data) => {
      data.books.forEach((book) => {
        renderBook(book, search_books);
      });
    })
    .catch((err) => console.log(err));
}

async function getNewList() {
  await fetch(mainURL_API + "new")
    .then((data) => data.json())
    .then((data) => {
      data.books.forEach((book) => {
        renderBook(book, new_books);
      });
    })
    .catch((err) => console.log(err));
}

function renderBook(book_data, container) {
  // Create the main container
  const itemDiv = document.createElement("div");
  itemDiv.className = "item";

  // Create the product container
  const productDiv = document.createElement("div");
  productDiv.className = "product";
  itemDiv.appendChild(productDiv);

  // Create the product thumb container
  const productThumbDiv = document.createElement("div");
  productThumbDiv.className = "product-thumb";
  productDiv.appendChild(productThumbDiv);

  // Create and append the product image
  const productImage = document.createElement("img");
  productImage.src = book_data.image;
  productImage.className = "pro-thumb-img";
  productThumbDiv.appendChild(productImage);

  // Create the product button container
  const productButtonDiv = document.createElement("div");
  productButtonDiv.className = "product-button";
  productThumbDiv.appendChild(productButtonDiv);

  // Create and append the "Quick View" button
  const quickViewLink = document.createElement("a");
  quickViewLink.href = "#";
  quickViewLink.title = "Quick View";
  const quickViewIcon = document.createElement("i");
  quickViewIcon.className = "fas fa-eye";
  quickViewLink.appendChild(quickViewIcon);
  productButtonDiv.appendChild(quickViewLink);

  // Create and append the "Add To Cart" button
  const addToCartLink = document.createElement("a");
  addToCartLink.href = "#";
  addToCartLink.title = "Add To Cart";
  const addToCartIcon = document.createElement("i");
  addToCartIcon.className = "fas fa-shopping-cart";
  addToCartLink.appendChild(addToCartIcon);
  productButtonDiv.appendChild(addToCartLink);

  // Create and append the "Wishlist" button
  const wishlistLink = document.createElement("a");
  wishlistLink.href = "#";
  wishlistLink.title = "Wishlist";
  const wishlistIcon = document.createElement("i");
  wishlistIcon.className = "far fa-heart";
  wishlistLink.appendChild(wishlistIcon);
  productButtonDiv.appendChild(wishlistLink);

  // Create the product info container
  const productInfoDiv = document.createElement("div");
  productInfoDiv.className = "product-info";
  productDiv.appendChild(productInfoDiv);

  // Create and append the rating container
  const ratingDiv = document.createElement("div");
  ratingDiv.className = "rating";
  productInfoDiv.appendChild(ratingDiv);

  // Append the star ratings - random star (0 => 5)
  const random_star = Math.floor(Math.random() * 6);
  for (let i = 0; i < random_star; i++) {
    const starIcon = document.createElement("i");
    starIcon.className = "fas fa-star";
    ratingDiv.appendChild(starIcon);
  }
  for (let i = 0; i < 5 - random_star; i++) {
    const halfStarIcon = document.createElement("i");
    halfStarIcon.className = "far fa-star";
    ratingDiv.appendChild(halfStarIcon);
  }

  // Create and append the product name
  const productName = document.createElement("h3");
  productName.className = "product-name";
  productName.textContent = book_data.title;
  productInfoDiv.appendChild(productName);

  // Create and append the original price
  const originalPrice = document.createElement("p");
  originalPrice.className = "product-price";
  originalPrice.textContent = book_data.price;
  productInfoDiv.appendChild(originalPrice);

  // Append the entire item to the desired location in your document
  container.appendChild(itemDiv); // or append to a specific container instead of body
}
