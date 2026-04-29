import { logout } from "../../../utils/auth";
import { PRODUCTS, getCategories } from "../../../data/data";
import type { Product, CartItem } from "../../../types/product";

const CART_KEY = "foodstore_cart";

let selectedCategory: number | "all" = "all";
let searchQuery = "";

function getCart(): CartItem[] {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product: Product): void {
  const cart = getCart();
  const existing = cart.find((item) => item.product.id === product.id);
  if (existing) {
    existing.cantidad += 1;
  } else {
    cart.push({ product, cantidad: 1 });
  }
  saveCart(cart);
  updateCartCount();
}

function updateCartCount(): void {
  const cart = getCart();
  const total = cart.reduce((acc, item) => acc + item.cantidad, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = String(total);
}

function renderCategories(): void {
  const list = document.getElementById("category-list");
  if (!list) return;

  const categories = getCategories();

  categories.forEach((cat) => {
    const li = document.createElement("li");
    li.textContent = cat.nombre;
    li.dataset["id"] = String(cat.id);
    li.addEventListener("click", () => {
      selectedCategory = cat.id;
      setActiveCategory(li);
      renderProducts();
    });
    list.appendChild(li);
  });

  // el "Todas" ya viene en el HTML, solo le agrego el evento
  const allLi = list.querySelector<HTMLLIElement>('[data-id="all"]');
  if (allLi) {
    allLi.addEventListener("click", () => {
      selectedCategory = "all";
      setActiveCategory(allLi);
      renderProducts();
    });
  }
}

function setActiveCategory(activeLi: HTMLLIElement): void {
  document
    .querySelectorAll("#category-list li")
    .forEach((li) => li.classList.remove("active"));
  activeLi.classList.add("active");
}

function getFilteredProducts(): Product[] {
  return PRODUCTS.filter((p) => {
    const matchSearch = p.nombre
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory =
      selectedCategory === "all" ||
      p.categorias.some((c) => c.id === selectedCategory);
    return matchSearch && matchCategory;
  });
}

function renderProducts(): void {
  const grid = document.getElementById("product-grid");
  const noResults = document.getElementById("no-results");
  if (!grid || !noResults) return;

  const filtered = getFilteredProducts();
  grid.querySelectorAll(".product-card").forEach((el) => el.remove());

  if (filtered.length === 0) {
    noResults.style.display = "block";
    return;
  }
  noResults.style.display = "none";

  filtered.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const categoryName = product.categorias[0]?.nombre ?? "";
    const isAvailable = product.disponible && product.stock > 0;

    // uso textContent para evitar XSS
    const img = document.createElement("img");
    img.alt = product.nombre;
    img.src = `/src/assets/${product.imagen}`;
    img.onerror = () => { 
    img.onerror = null; 
        const textoSeguro = encodeURIComponent(categoryName || 'Food Store');
        img.src = `https://placehold.co/300x140/ff6347/ffffff?text=${textoSeguro}`; 
  };
  
    const tag = document.createElement("span");
    tag.className = "categoria-tag";
    tag.textContent = categoryName;

    const title = document.createElement("h3");
    title.textContent = product.nombre;

    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = product.descripcion;

    const precio = document.createElement("p");
    precio.className = "precio";
    precio.textContent = `$${product.precio.toLocaleString("es-AR")}`;

    const btn = document.createElement("button");
    btn.disabled = !isAvailable;
    btn.textContent = isAvailable ? "Agregar al carrito" : "Sin stock";

    const msg = document.createElement("span");
    msg.className = "added-msg";

    if (isAvailable) {
      btn.addEventListener("click", () => {
        addToCart(product);
        msg.textContent = "✓ Agregado";
        setTimeout(() => (msg.textContent = ""), 1500);
      });
    }

    card.append(img, tag, title, desc, precio, btn, msg);
    grid.appendChild(card);
  });
}

function init(): void {
  renderCategories();
  renderProducts();
  updateCartCount();

  const searchInput = document.getElementById("search-bar") as HTMLInputElement | null;
  searchInput?.addEventListener("input", () => {
    searchQuery = searchInput.value;
    renderProducts();
  });

  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn?.addEventListener("click", () => logout());
}

init();