// Load Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Cart
function loadCart() {

    let cartItems = document.getElementById("cartItems");
    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<h3>Your Cart is Empty 🛒</h3>";
        document.getElementById("total").innerHTML = "Total : ₹0";
        return;
    }

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.qty;
        total += itemTotal;

        cartItems.innerHTML += `
        <div class="food-card">

            <div>
                <h3>${item.name}</h3>
                <p>${item.type}</p>
                <p>₹${item.price} × ${item.qty}</p>
            </div>

            <div>
                <h3>₹${itemTotal}</h3>

                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </div>

        </div>
        `;
    });

    document.getElementById("total").innerHTML = "Total : ₹" + total;
}

// Remove Item
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

// Show Address for Delivery
function toggleAddress() {

    const type = document.getElementById("orderType").value;

    if (type === "Delivery") {
        document.getElementById("addressBox").style.display = "block";
    } else {
        document.getElementById("addressBox").style.display = "none";
    }
}

// Send WhatsApp Order
function sendWhatsApp() {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const orderType = document.getElementById("orderType").value;
    const address = document.getElementById("address").value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    if (mobile === "") {
        alert("Please enter your mobile number.");
        return;
    }

    if (orderType === "Delivery" && address === "") {
        alert("Please enter your delivery address.");
        return;
    }

    let total = 0;

    let message = "🍽️ *VYORA CAFE*%0A%0A";

    message += "👤 Name : " + name + "%0A";
    message += "📞 Mobile : " + mobile + "%0A";
    message += "🚚 Order Type : " + orderType + "%0A";

    if (orderType === "Delivery") {
        message += "📍 Address : " + address + "%0A";
    }

    message += "%0A📋 *Order Items*%0A";

    cart.forEach(item => {

        let itemTotal = item.price * item.qty;
        total += itemTotal;

        message += "• " + item.name +
            " (" + item.type + ")" +
            " × " + item.qty +
            " = ₹" + itemTotal +
            "%0A";

    });

    message += "%0A💰 *Grand Total : ₹" + total + "*";

    const phone = "916305569311";

    window.open(
        "https://wa.me/" + phone + "?text=" + message,
        "_blank"
    );

    // Clear cart
    localStorage.removeItem("cart");
    cart = [];

    // Show updated cart
    loadCart();

    // Confirmation Message
    setTimeout(function () {

    localStorage.removeItem("cart");

    window.location.href = "success.html";

},500);

}

// Load Cart
loadCart();