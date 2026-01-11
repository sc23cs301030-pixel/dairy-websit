if (!localStorage.getItem("userName")) {
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("skeleton").style.display = "none";
  }, 800);
});

// =============================
// CART & VARIANTS LOGIC
// =============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const selectedVariant = {};

// -----------------------------
// SELECT PRODUCT VARIANT
// -----------------------------
function selectVariant(key, select) {
    const option = select.options[select.selectedIndex];
    selectedVariant[key] = {
        weight: option.value,
        price: Number(option.dataset.price)
    };
    // Update price on product card
    document.getElementById("price-" + key).innerText = option.dataset.price;
}

// -----------------------------
// ADD PRODUCT TO CART
// -----------------------------
const splash = document.getElementById("milk-splash");
splash.classList.add("active");

setTimeout(() => {
  splash.classList.remove("active");
}, 600);

function addToCart(name, key) {
    const v = selectedVariant[key] || { weight: "500g", price: 450 };
    const fullName = `${name} (${v.weight})`;

    const item = cart.find(i => i.name === fullName);
    if (item) {
        item.qty++;
    } else {
        cart.push({ name: fullName, price: v.price, qty: 1 });
    }

    saveCart();
    renderCart();
}

// -----------------------------
// RENDER CART
// -----------------------------
function renderCart() {
    const box = document.getElementById("cartItems");
    let total = 0;
    box.innerHTML = "";

    cart.forEach((item, i) => {
        total += item.price * item.qty;
        box.innerHTML += `
            <div class="cart-item">
                <div>
                    ${item.name}<br>₹${item.price} × ${item.qty}
                </div>
                <button onclick="removeItem(${i})">X</button>
            </div>
        `;
    });

    document.getElementById("total").innerText = total;
}

// -----------------------------
// REMOVE ITEM FROM CART
// -----------------------------
function removeItem(i) {
    cart.splice(i, 1);
    saveCart();
    renderCart();
}

// -----------------------------
// SAVE CART TO LOCALSTORAGE
// -----------------------------
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// -----------------------------
// WHATSAPP ORDER
// -----------------------------
function sendWhatsApp() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  // 1️⃣ Calculate total
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
  });

  // 2️⃣ Create order object
  const order = {
    id: "ORD" + Date.now(),
    items: cart,
    total: total,
    date: new Date().toLocaleString(),
    customerName: localStorage.getItem("userName"),
    customerPhone: localStorage.getItem("userPhone"),
    customerAddress: localStorage.getItem("userLocation"),
    source: "WhatsApp"
  };

  // 3️⃣ Save order
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  // 4️⃣ Build WhatsApp message
  let msg = "Order Details:%0A";
  cart.forEach(i => {
    msg += `${i.name} x ${i.qty} = ₹${i.price * i.qty}%0A`;
  });
  msg += `Total: ₹${total}`;

  // 5️⃣ Open WhatsApp
  window.open(`https://wa.me/919407156211?text=${msg}`);

  // 6️⃣ Clear cart
  cart = [];
  localStorage.removeItem("cart");
  renderCart();
}


// -----------------------------
// LOGOUT
// -----------------------------
function logout() {
    localStorage.clear();
    location.href = "login.html";
}

// -----------------------------
// INITIAL RENDER
// -----------------------------
renderCart();
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
  });

  const order = {
    id: "ORD" + Date.now(),
    items: cart,
    total: total,
    date: new Date().toLocaleString(),

    // ✅ FROM LOGIN DATA
    customerName: localStorage.getItem("userName"),
    customerPhone: localStorage.getItem("userPhone"),
    customerAddress: localStorage.getItem("userLocation")
  };

  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("✅ Order placed successfully!");

  cart = [];
  localStorage.removeItem("cart");
  renderCart();
}

 
  let orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  alert("✅ Order placed successfully!");

  // Clear cart
  cart = [];
  total = 0;
  localStorage.removeItem("cart");
  renderCart();

