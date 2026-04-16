import type { CartItem } from "../../../types/product";

const CART_KEY = "foodstore_cart";

function getCart(): CartItem[] {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function clearCart(): void {
  localStorage.removeItem(CART_KEY);
}

function calcTotal(cart: CartItem[]): number {
  return cart.reduce(
    (acc, item) => acc + item.product.precio * item.cantidad,
    0
  );
}

function render(): void {
  const cart = getCart();
  const listEl = document.getElementById("cart-list");
  const emptyMsg = document.getElementById("empty-msg");
  const footer = document.getElementById("cart-footer");
  const totalEl = document.getElementById("cart-total");

  if (!listEl || !emptyMsg || !footer || !totalEl) return;

  listEl.innerHTML = "";

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
    footer.style.display = "none";
    return;
  }

  emptyMsg.style.display = "none";
  footer.style.display = "flex";

  cart.forEach((item) => {
    const subtotal = item.product.precio * item.cantidad;

    const div = document.createElement("div");
    div.className = "cart-item";

    const info = document.createElement("div");
    info.className = "info";

    const nombre = document.createElement("h3");
    nombre.textContent = item.product.nombre;

    const precioUnit = document.createElement("p");
    precioUnit.textContent = `Precio unitario: $${item.product.precio.toLocaleString("es-AR")}`;

    info.append(nombre, precioUnit);

    const controls = document.createElement("div");
    controls.className = "quantity-controls";

    const btnMinus = document.createElement("button");
    btnMinus.className = "btn-minus";
    btnMinus.textContent = "−";

    const cantSpan = document.createElement("span");
    cantSpan.textContent = String(item.cantidad);

    const btnPlus = document.createElement("button");
    btnPlus.className = "btn-plus";
    btnPlus.textContent = "+";

    controls.append(btnMinus, cantSpan, btnPlus);

    const subtotalDiv = document.createElement("div");
    subtotalDiv.className = "subtotal";
    subtotalDiv.textContent = `$${subtotal.toLocaleString("es-AR")}`;

    const btnRemove = document.createElement("button");
    btnRemove.className = "btn-remove";
    btnRemove.title = "Eliminar";
    btnRemove.textContent = "✕";

    div.append(info, controls, subtotalDiv, btnRemove);

    btnPlus.addEventListener("click", () => {
      item.cantidad += 1;
      saveCart(cart);
      render();
    });

    btnMinus.addEventListener("click", () => {
      if (item.cantidad > 1) {
        item.cantidad -= 1;
      } else {
        const index = cart.indexOf(item);
        cart.splice(index, 1);
      }
      saveCart(cart);
      render();
    });

    btnRemove.addEventListener("click", () => {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
      saveCart(cart);
      render();
    });

    listEl.appendChild(div);
  });

  totalEl.textContent = `$${calcTotal(cart).toLocaleString("es-AR")}`;
}

function init(): void {
  render();

  const btnClear = document.getElementById("btn-clear");
  btnClear?.addEventListener("click", () => {
    if (confirm("¿Vaciar el carrito?")) {
      clearCart();
      render();
    }
  });
}

init();