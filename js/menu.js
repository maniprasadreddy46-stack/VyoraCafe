// Cart Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add Item
function addFood(name, radioName, singlePrice, fullPrice, qtyId) {

    // Selected Type (Single / Full)
    let type = document.querySelector('input[name="' + radioName + '"]:checked').value;

    // Price
    let price = (type === "Single") ? singlePrice : fullPrice;

    // Quantity
    let qty = parseInt(document.getElementById(qtyId).value);

    // Create Item
    const item = {
        name: name,
        type: type,
        price: price,
        qty: qty
    };

    // Add to Cart
    cart.push(item);

    // Save
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " (" + type + ") x " + qty + " Added Successfully");
}