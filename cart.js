// Cart එකේ HTML එක පේජ් එකට ඇඩ් කිරීම
const cartHTML = `
    <div id="cart-icon" onclick="toggleCart()" style="position: fixed; top: 20px; right: 20px; background: #e62e04; color: white; padding: 12px; border-radius: 50%; cursor: pointer; z-index: 1001; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
        🛒 <span id="cart-count" style="background: white; color: #e62e04; border-radius: 50%; padding: 2px 6px; font-size: 12px; font-weight: bold;">0</span>
    </div>

    <div id="side-cart" style="position: fixed; top: 0; right: -350px; width: 320px; height: 100%; background: white; box-shadow: -5px 0 15px rgba(0,0,0,0.2); transition: 0.4s; z-index: 1002; padding: 20px; color: #333; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            <h2 style="margin: 0; font-size: 20px;">Shopping Cart</h2>
            <button onclick="toggleCart()" style="background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
        </div>
        
        <div id="cart-items" style="flex-grow: 1; overflow-y: auto; margin-top: 20px;">
            </div>

        <div style="border-top: 2px solid #eee; padding-top: 20px;">
            <h3 style="display: flex; justify-content: space-between;">Total: <span id="cart-total">LKR 0</span></h3>
            <button onclick="clearCart()" style="width: 100%; background: #f4f4f4; border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; cursor: pointer; border-radius: 5px;">Clear Cart</button>
            <button onclick="checkoutWhatsApp()" style="width: 100%; background: #e62e04; color: white; border: none; padding: 12px; font-weight: bold; cursor: pointer; border-radius: 5px;">Checkout</button>
        </div>
    </div>
    <div id="cart-overlay" onclick="toggleCart()" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: none; z-index: 1000;"></div>
`;

// පේජ් එක load වෙද්දී කාර්ට් එක ඇතුල් කිරීම
document.body.insertAdjacentHTML('beforeend', cartHTML);

// Cart එක ඇරීම සහ වැසීම
function toggleCart() {
    const cart = document.getElementById('side-cart');
    const overlay = document.getElementById('cart-overlay');
    if (cart.style.right === "0px") {
        cart.style.right = "-350px";
        overlay.style.display = "none";
    } else {
        cart.style.right = "0px";
        overlay.style.display = "block";
        displayCart();
    }
}

// කාර්ට් එකට බඩු පෙන්වීම
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const countEl = document.getElementById('cart-count');
    
    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        container.innerHTML += `
            <div style="display: flex; gap: 10px; margin-bottom: 15px; align-items: center; border-bottom: 1px solid #f9f9f9; padding-bottom: 10px;">
                <img src="${item.img}" style="width: 60px; height: 60px; border-radius: 5px; object-fit: cover;">
                <div style="flex-grow: 1;">
                    <div style="font-weight: bold; font-size: 14px;">${item.name}</div>
                    <div style="font-size: 13px; color: #666;">LKR ${item.price} x ${item.qty}</div>
                </div>
                <button onclick="removeItem(${index})" style="background: none; border: none; color: red; cursor: pointer; font-size: 18px;">&times;</button>
            </div>
        `;
    });

    totalEl.innerText = "LKR " + total;
    countEl.innerText = cart.length;
}

// එක අයිතමයක් ඉවත් කිරීම
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(cart));
    displayCart();
}

// මුළු කාර්ට් එකම මකා දැමීම
function clearCart() {
    if(confirm("සිරාවටම කාර්ට් එකම මකන්න ඕනෙද?")) {
        localStorage.removeItem('myCart');
        displayCart();
    }
}

// WhatsApp Checkout
function checkoutWhatsApp() {
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
    if (cart.length === 0) return alert("කාර්ට් එක හිස් මචං!");

    let message = "හලෝ, මට මේ ඇණවුම ලබා දෙන්න පුළුවන්ද?%0A";
    let total = 0;
    cart.forEach(item => {
        message += `%0A🐟 ${item.name} (x${item.qty}) - LKR ${item.price * item.qty}`;
        total += item.price * item.qty;
    });
    message += `%0A%0A💰 **Total: LKR ${total}**`;

    window.open(`https://wa.me/947XXXXXXXX?text=${message}`, '_blank'); // ඔයාගේ නම්බර් එක දාන්න
}

// පේජ් එක load වෙද්දී count එක update කරන්න
displayCart();