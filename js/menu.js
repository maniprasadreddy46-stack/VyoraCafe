// Cart Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ===============================
// Add Item to Cart
// ===============================
function addFood(name, radioName, singlePrice, fullPrice, qtyId) {

    // Selected Type
    let selected = document.querySelector(
        'input[name="' + radioName + '"]:checked'
    );

    if (!selected) {
        showPopup("Please select an option.");
        return;
    }

    let type = selected.value;

    // Price
    let price = (type === "Single") ? singlePrice : fullPrice;

    // Quantity
    let quantityInput = document.getElementById(qtyId);
    let qty = parseInt(quantityInput.value);

    if (!qty || qty < 1) {
        showPopup("Please enter a valid quantity.");
        return;
    }

    // Create Item
    const item = {
        name: name,
        type: type,
        price: price,
        qty: qty
    };

    // Add to Cart
    cart.push(item);

    // Save Cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Professional Success Popup
    showPopup(
        name + " • " + type + " • Qty: " + qty,
        true
    );
}


// ===============================
// Professional VyoraCafe Popup
// ===============================
function showPopup(message, success = false) {

    // Remove existing popup
    const oldPopup = document.getElementById("vyoraPopupOverlay");

    if (oldPopup) {
        oldPopup.remove();
    }

    // Create Overlay
    const overlay = document.createElement("div");
    overlay.id = "vyoraPopupOverlay";

    overlay.innerHTML = `
        <div class="vyora-popup">

            <div class="vyora-icon">
                ${success ? "✓" : "!"}
            </div>

            <h2>VyoraCafe</h2>

            <div class="vyora-line"></div>

            <p class="vyora-success">
                ${success ? "Added Successfully" : "Notice"}
            </p>

            <p class="vyora-message">
                ${message}
            </p>

            <button id="vyoraPopupButton">
                OK
            </button>

        </div>
    `;

    document.body.appendChild(overlay);


    // ===============================
    // OK Button
    // ===============================
    document.getElementById("vyoraPopupButton").onclick = function () {
        overlay.remove();
    };


    // ===============================
    // Click Outside Popup
    // ===============================
    overlay.onclick = function (event) {

        if (event.target === overlay) {
            overlay.remove();
        }

    };


    // ===============================
    // Auto Close After 2 Seconds
    // ===============================
    if (success) {

        setTimeout(function () {

            if (document.getElementById("vyoraPopupOverlay")) {
                overlay.remove();
            }

        }, 2000);

    }
}


// ===============================
// Popup Styling
// ===============================
const popupStyle = document.createElement("style");

popupStyle.innerHTML = `

#vyoraPopupOverlay {

    position: fixed;

    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.65);

    display: flex;

    align-items: center;
    justify-content: center;

    z-index: 99999;

    padding: 20px;

    box-sizing: border-box;
}


.vyora-popup {

    width: 100%;
    max-width: 380px;

    background: #fffaf3;

    border-radius: 22px;

    padding: 30px 25px;

    text-align: center;

    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.35);

    animation: vyoraPopupShow 0.25s ease;

}


.vyora-icon {

    width: 65px;
    height: 65px;

    margin: 0 auto 15px;

    border-radius: 50%;

    background: #6b3e26;

    color: white;

    display: flex;

    align-items: center;
    justify-content: center;

    font-size: 34px;

    font-weight: bold;

}


.vyora-popup h2 {

    margin: 5px 0;

    color: #4b2818;

    font-size: 28px;

    font-weight: bold;

}


.vyora-line {

    width: 55px;
    height: 3px;

    background: #c47a32;

    margin: 12px auto 18px;

    border-radius: 10px;

}


.vyora-success {

    margin: 0 0 8px;

    color: #4b2818;

    font-size: 20px;

    font-weight: bold;

}


.vyora-message {

    margin: 0 0 22px;

    color: #555;

    font-size: 16px;

    line-height: 1.5;

}


#vyoraPopupButton {

    width: 100%;

    padding: 13px;

    border: none;

    border-radius: 12px;

    background: #6b3e26;

    color: white;

    font-size: 17px;

    font-weight: bold;

    cursor: pointer;

}


#vyoraPopupButton:hover {

    background: #4b2818;

}


@keyframes vyoraPopupShow {

    from {

        opacity: 0;

        transform: scale(0.85);

    }

    to {

        opacity: 1;

        transform: scale(1);

    }

}

`;

document.head.appendChild(popupStyle);