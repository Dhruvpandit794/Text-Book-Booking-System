
// Function to extract query parameters from URL
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) {
            return decodeURIComponent(pair[1].replace(/\+/g, "%20"));
        }
    }
    return null;
}

// Function to populate order details in QR.html
function populateOrderDetails() {
    var orderId = getQueryVariable("orderId");
    var orderTime = getQueryVariable("orderTime");
    var books = getQueryVariable("books");

    var orderDetailsContainer = document.getElementById("orderDetails");
    var booksArray = JSON.parse(books);

    var booksHtml = "";
    booksArray.forEach(book => {
        booksHtml += `
            <div>
                <h4>${book.title}</h4>
                <p>by ${book.author}</p>
                <p>Price: $${book.price}</p>
                <p>Quantity: ${book.quantity}</p>
                <p>Total: $${book.total}</p>
            </div>
        `;
    });

    orderDetailsContainer.innerHTML = `
        <h2>Order Details</h2>
        <p>Order ID: ${orderId}</p>
        <p>Order Time: ${orderTime}</p>
        ${booksHtml}
    `;
}

// Generate QR code based on input text
function generateQRCode() {
    var text = document.getElementById("orderDetails").textContent;
    document.getElementById("qrcode").innerHTML = "";
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: text,
        width: 256,  // Increased width for higher quality
        height: 256, // Increased height for higher quality
        correctLevel: QRCode.CorrectLevel.H  // Higher error correction level
    });
}

// Call populateOrderDetails and generateQRCode on page load
window.onload = function() {
    populateOrderDetails();
    generateQRCode();
};
