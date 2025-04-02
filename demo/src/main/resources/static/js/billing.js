// Product data from saree_inventory
const products = {
    "BAR415907": { price: 15074.30, discount: 26.63 },
    "BAR956606": { price: 9806.83, discount: 29.45 },
    "BAR288814": { price: 17860.01, discount: 24.48 },
    "BAR424400": { price: 1427.20, discount: 29.26 },
    "BAR504901": { price: 14574.68, discount: 19.21 },
    "BAR722707": { price: 7970.20, discount: 13.55 },
    "BAR414932": { price: 1461.54, discount: 21.48 },
    "BAR927288": { price: 9440.21, discount: 26.14 },
    "BAR141158": { price: 13095.07, discount: 19.63 },
    "BAR534188": { price: 8554.58, discount: 26.25 }
};

// Auto-fill price and discount when product is selected
document.getElementById("product-id").addEventListener("change", function() {
    const productId = this.value;
    if (products[productId]) {
        document.getElementById("price").value = products[productId].price;
        document.getElementById("discount").value = products[productId].discount;
    } else {
        document.getElementById("price").value = "";
        document.getElementById("discount").value = "";
    }
});

function showPopup() {
    document.getElementById("popup").style.display = "flex";
    // Clear previous inputs when opening popup
    document.getElementById("product-id").value = "";
    document.getElementById("product-quantity").value = "";
    document.getElementById("price").value = "";
    document.getElementById("discount").value = "";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function addItem() {
    let productId = document.getElementById("product-id").value;
    let quantity = document.getElementById("product-quantity").value;
    let price = document.getElementById("price").value;
    let discount = document.getElementById("discount").value;
    
    // Validate inputs
    if (!productId || !quantity || !price) {
        alert("Please fill all required fields");
        return;
    }
    
    // Calculate amount with discount
    let discountedPrice = price * (1 - (discount/100));
    let amount = (discountedPrice * quantity).toFixed(2);

    let tableBody = document.getElementById("billing-table-body");
    let row = `<tr>
        <td>${productId}</td>
        <td>${quantity}</td>
        <td>${price}</td>
        <td>${discount}%</td>
        <td>${amount}</td>
    </tr>`;
    tableBody.innerHTML += row;
    updateTotal();
    closePopup();
}

function updateTotal() {
    let total = 0;
    document.querySelectorAll("#billing-table-body tr").forEach(row => {
        total += parseFloat(row.cells[4].innerText);
    });
    document.getElementById("total-price").innerText = total.toFixed(2);
}

function generateBill() {
    let salesPersonId = document.getElementById("salesPerson").value;
    let customerName = document.getElementById("customer-name").value;
    let customerMobile = document.getElementById("customer-mobile").value;
    
    // Validate required fields
    if (!salesPersonId) {
        alert("Please select a sales person");
        return;
    }
    if (!customerName) {
        alert("Customer name is required");
        return;
    }
    if (!customerMobile) {
        alert("Customer mobile is required");
        return;
    }
    
    // Check if any items are added
    if (document.getElementById("billing-table-body").rows.length === 0) {
        alert("Please add at least one item to generate bill");
        return;
    }

    // Fill bill details
    document.getElementById("bill-customer-name").innerText = customerName;
    document.getElementById("bill-customer-mobile").innerText = customerMobile;
    document.getElementById("bill-sales-person-id").innerText = salesPersonId;

    // Copy items to bill table
    let billTable = document.getElementById("bill-table");
    billTable.innerHTML = document.getElementById("billing-table-body").innerHTML;

    // Set total price
    let totalPrice = document.getElementById("total-price").innerText;
    document.getElementById("bill-total-price").innerText = totalPrice;

    // Show bill popup
    document.getElementById("bill-popup").style.display = "flex";
}

function closeBillPopup() {
    document.getElementById("bill-popup").style.display = "none";
    location.reload();
    // Optionally clear the form after bill is done
    // location.reload();
}