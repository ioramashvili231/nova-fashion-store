
const $ = (id) => document.getElementById(id);

const products = [
  {
    id: 1, name: "Oversized Hoodie", category: "ტანსაცმელი",
    price: 120, oldPrice: 150, sizes: ["S", "M", "L", "XL"],
    color: "შავი", badge: "SALE",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=85"
  },
  {
    id: 2, name: "Classic Sneakers", category: "ფეხსაცმელი",
    price: 190, oldPrice: null, sizes: ["39", "40", "41", "42", "43"],
    color: "თეთრი", badge: "NEW",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=85"
  },
  {
    id: 3, name: "Minimal T-Shirt", category: "ტანსაცმელი",
    price: 65, oldPrice: null, sizes: ["S", "M", "L", "XL"],
    color: "თეთრი", badge: "",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=85"
  },
  {
    id: 4, name: "Everyday Bag", category: "აქსესუარები",
    price: 145, oldPrice: 175, sizes: ["ONE"],
    color: "კრემისფერი", badge: "SALE",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=85"
  },
  {
    id: 5, name: "Urban Jacket", category: "ტანსაცმელი",
    price: 220, oldPrice: null, sizes: ["M", "L", "XL"],
    color: "შავი", badge: "NEW",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=85"
  },
  {
    id: 6, name: "Street Cap", category: "აქსესუარები",
    price: 55, oldPrice: null, sizes: ["ONE"],
    color: "მწვანე", badge: "",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=85"
  },
  {
    id: 7, name: "Classic Denim", category: "ტანსაცმელი",
    price: 155, oldPrice: 180, sizes: ["S", "M", "L", "XL"],
    color: "ლურჯი", badge: "SALE",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=85"
  },
  {
    id: 8, name: "Leather Boots", category: "ფეხსაცმელი",
    price: 260, oldPrice: null, sizes: ["39", "40", "41", "42"],
    color: "შავი", badge: "",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=600&q=85"
  },
  {
    id: 9, name: "Modern Sunglasses", category: "აქსესუარები",
    price: 85, oldPrice: null, sizes: ["ONE"],
    color: "შავი", badge: "NEW",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=85"
  },
  {
    id: 10, name: "Soft Knit Sweater", category: "ტანსაცმელი",
    price: 135, oldPrice: null, sizes: ["S", "M", "L"],
    color: "კრემისფერი", badge: "",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=85"
  },
  {
    id: 11, name: "Daily Trainers", category: "ფეხსაცმელი",
    price: 175, oldPrice: 200, sizes: ["39", "40", "41", "42", "43"],
    color: "თეთრი", badge: "SALE",
    image: "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=600&q=85"
  },
  {
    id: 12, name: "Minimal Watch", category: "აქსესუარები",
    price: 210, oldPrice: null, sizes: ["ONE"],
    color: "შავი", badge: "",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=85"
  }
];

let cart = [];
let favorites = new Set();
let selectedCategory = "ყველა";
let selectedSize = "";
let selectedColor = "";
let maxPrice = 500;
let showingFavorites = false;
let activeProduct = null;
let detailSize = "";

/* შეტყობინება */

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* პროდუქტების ჩვენება */

function renderProducts() {
  const search = $("searchInput").value.toLowerCase().trim();
  const sort = $("sortSelect").value;

  let filtered = products.filter(product => {
    const matchesCategory =
      selectedCategory === "ყველა" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search);

    const matchesPrice = product.price <= maxPrice;
    const matchesSize =
      !selectedSize || product.sizes.includes(selectedSize);

    const matchesColor =
      !selectedColor || product.color === selectedColor;

    const matchesFavorite =
      !showingFavorites || favorites.has(product.id);

    return matchesCategory &&
      matchesSearch &&
      matchesPrice &&
      matchesSize &&
      matchesColor &&
      matchesFavorite;
  });

  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  if (sort === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  $("resultsCount").textContent = `${filtered.length} პროდუქტი`;

  $("productGrid").innerHTML = filtered.map(product => `
    <article class="product-card">
      <div class="product-photo" data-open="${product.id}">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
        <button class="product-fav ${favorites.has(product.id) ? "active" : ""}"
          data-fav="${product.id}" aria-label="Favorite">
          ${favorites.has(product.id) ? "♥" : "♡"}
        </button>
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <span class="product-price">${product.price}₾</span>
        ${product.oldPrice ? `<span class="product-old-price">${product.oldPrice}₾</span>` : ""}
      </div>
    </article>
  `).join("");

  $("emptyState").hidden = filtered.length !== 0;
  $("productGrid").style.display = filtered.length ? "grid" : "none";
}

/* ფავორიტები */

function updateFavorites() {
  $("favCount").textContent = favorites.size;
}

$("productGrid").addEventListener("click", (event) => {
  const favoriteButton = event.target.closest("[data-fav]");

  if (favoriteButton) {
    const id = Number(favoriteButton.dataset.fav);

    if (favorites.has(id)) {
      favorites.delete(id);
      showToast("ფავორიტებიდან წაიშალა");
    } else {
      favorites.add(id);
      showToast("დაემატა ფავორიტებში");
    }

    updateFavorites();
    renderProducts();
    return;
  }

  const productCard = event.target.closest("[data-open]");

  if (productCard) {
    openProduct(Number(productCard.dataset.open));
  }
});

$("favoritesBtn").addEventListener("click", () => {
  showingFavorites = !showingFavorites;

  if (showingFavorites) {
    selectedCategory = "ყველა";
    document.querySelectorAll("#categoryTabs button").forEach(button => {
      button.classList.toggle(button.dataset.category === "ყველა", button.dataset.category === "ყველა");
    });

    showToast("შენი ფავორიტები");
    $("catalog").scrollIntoView({ behavior: "smooth" });
  } else {
    showToast("ყველა პროდუქტი");
  }

  renderProducts();
});

/* კატეგორიები */

$("categoryTabs").addEventListener("click", event => {
  const button = event.target.closest("button[data-category]");
  if (!button) return;

  selectedCategory = button.dataset.category;
  showingFavorites = false;

  document.querySelectorAll("#categoryTabs button").forEach(item => {
    item.classList.toggle("active", item === button);
  });

  renderProducts();
});

/* ფილტრები */

$("priceRange").addEventListener("input", event => {
  maxPrice = Number(event.target.value);
  $("maxPriceLabel").textContent = `${maxPrice}₾`;
  renderProducts();
});

$("sizeFilters").addEventListener("click", event => {
  const button = event.target.closest("button[data-size]");
  if (!button) return;

  selectedSize =
    selectedSize === button.dataset.size ? "" : button.dataset.size;

  document.querySelectorAll("#sizeFilters button").forEach(item => {
    item.classList.toggle("selected", item.dataset.size === selectedSize);
  });

  renderProducts();
});

document.querySelector(".colors").addEventListener("click", event => {
  const button = event.target.closest("button[data-color]");
  if (!button) return;

  selectedColor =
    selectedColor === button.dataset.color ? "" : button.dataset.color;

  document.querySelectorAll(".colors button").forEach(item => {
    item.classList.toggle("selected", item.dataset.color === selectedColor);
  });

  renderProducts();
});

$("searchInput").addEventListener("input", renderProducts);
$("sortSelect").addEventListener("change", renderProducts);

function resetFilters() {
  selectedCategory = "ყველა";
  selectedSize = "";
  selectedColor = "";
  maxPrice = 500;
  showingFavorites = false;

  $("searchInput").value = "";
  $("sortSelect").value = "default";
  $("priceRange").value = 500;
  $("maxPriceLabel").textContent = "500₾";

  document.querySelectorAll("#categoryTabs button").forEach(button => {
    button.classList.toggle("active", button.dataset.category === "ყველა");
  });

  document.querySelectorAll("#sizeFilters button, .colors button").forEach(button => {
    button.classList.remove("selected");
  });

  renderProducts();
}

$("clearFilters").addEventListener("click", resetFilters);
$("emptyReset").addEventListener("click", resetFilters);

/* პროდუქტის დეტალები */

function openProduct(id) {
  activeProduct = products.find(product => product.id === id);
  if (!activeProduct) return;

  detailSize = "";

  $("productDetail").innerHTML = `
    <div class="detail-layout">
      <img src="${activeProduct.image}" alt="${activeProduct.name}">
      <div>
        <span class="product-category">${activeProduct.category}</span>
        <h2>${activeProduct.name}</h2>
        <strong class="product-price">${activeProduct.price}₾</strong>
        <p>თანამედროვე დიზაინი, ყოველდღიური კომფორტი და NOVA-ს გამორჩეული სტილი.</p>
        <h4 style="margin-top:18px;font-size:11px">აირჩიე ზომა</h4>
        <div class="detail-sizes">
          ${activeProduct.sizes.map(size => `
            <button type="button" data-detail-size="${size}">${size}</button>
          `).join("")}
        </div>
        <button class="primary-btn full-btn" id="detailAdd">კალათაში დამატება</button>
      </div>
    </div>
  `;

  $("productModal").classList.add("open");
}

$("productDetail").addEventListener("click", event => {
  const sizeButton = event.target.closest("[data-detail-size]");

  if (sizeButton) {
    detailSize = sizeButton.dataset.detailSize;

    document.querySelectorAll("[data-detail-size]").forEach(button => {
      button.classList.toggle("selected", button === sizeButton);
    });
  }

  if (event.target.id === "detailAdd") {
    if (!detailSize) {
      showToast("გთხოვ, ჯერ აირჩიე ზომა");
      return;
    }

    addToCart(activeProduct.id, detailSize);
    closeAll();
  }
});

/* კალათა */

function addToCart(id, size) {
  const product = products.find(item => item.id === id);
  if (!product) return;

  const existing = cart.find(item => item.id === id && item.size === size);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, size, quantity: 1 });
  }

  renderCart();
  showToast("პროდუქტი დაემატა კალათაში");
}

function renderCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  $("cartCount").textContent = totalItems;
  $("drawerCount").textContent = totalItems;
  $("cartTotal").textContent = `${totalPrice}₾`;

  if (!cart.length) {
    $("cartItems").innerHTML = `
      <div class="empty-state">
        <h3>კალათა ცარიელია</h3>
        <p>დაამატე სასურველი პროდუქტი.</p>
      </div>
    `;
    return;
  }

  $("cartItems").innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>ზომა: ${item.size} · რაოდენობა: ${item.quantity}</p>
        <p>${item.price * item.quantity}₾</p>
      </div>
      <button data-remove="${item.id}" data-size="${item.size}" aria-label="Remove">✕</button>
    </div>
  `).join("");
}

$("cartItems").addEventListener("click", event => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;

  const id = Number(button.dataset.remove);
  const size = button.dataset.size;

  cart = cart.filter(item => !(item.id === id && item.size === size));
  renderCart();
  showToast("პროდუქტი წაიშალა");
});

$("cartBtn").addEventListener("click", () => {
  $("cartDrawer").classList.add("open");
  $("overlay").classList.add("show");
});

$("closeCart").addEventListener("click", closeAll);
$("overlay").addEventListener("click", closeAll);

/* მოდალების გახსნა და დახურვა */

function closeAll() {
  $("cartDrawer").classList.remove("open");
  $("overlay").classList.remove("show");

  document.querySelectorAll(".modal").forEach(modal => {
    modal.classList.remove("open");
  });
}

document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", closeAll);
});

$("accountBtn").addEventListener("click", () => {
  $("accountModal").classList.add("open");
});

$("checkoutBtn").addEventListener("click", () => {
  if (!cart.length) {
    showToast("კალათა ცარიელია");
    return;
  }

  closeAll();
  $("checkoutModal").classList.add("open");
});

/* შეკვეთის ფორმა */

$("checkoutForm").addEventListener("submit", event => {
  event.preventDefault();

  cart = [];
  renderCart();
  closeAll();
  event.target.reset();

  showToast("შეკვეთა მიღებულია! (დემო)");
});

/* ანგარიშის ფორმა */

$("accountForm").addEventListener("submit", event => {
  event.preventDefault();
  closeAll();
  event.target.reset();
  showToast("ეს არის სადემონსტრაციო ანგარიში");
});

/* Newsletter */

$("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  event.target.reset();
  showToast("მადლობა გამოწერისთვის!");
});

/* Dark Mode */

$("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const dark = document.body.classList.contains("dark-mode");
  $("themeToggle").textContent = dark ? "☀" : "☾";

  showToast(dark ? "Dark Mode ჩართულია" : "Light Mode ჩართულია");
});

/* მობილური მენიუ */

$("menuBtn").addEventListener("click", () => {
  $("mainNav").classList.toggle("open");
});

document.querySelectorAll("#mainNav a").forEach(link => {
  link.addEventListener("click", () => {
    $("mainNav").classList.remove("open");
  });
});

/* ძებნის ღილაკი */

$("searchToggle").addEventListener("click", () => {
  $("catalog").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => $("searchInput").focus(), 500);
});

/* Escape ღილაკით ფანჯრების დახურვა */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeAll();
});

/* საწყისი ჩატვირთვა */

renderProducts();
renderCart();
updateFavorites();
