document.addEventListener("DOMContentLoaded", () => {
    let orderItemsDiv = document.getElementById('orderItems');
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        orderItemsDiv.innerHTML = '<p>You have no orders.</p>';
    } else {
        orders.forEach((order, orderIndex) => {
            let orderDiv = document.createElement('div');
            orderDiv.classList.add('order');
            orderDiv.id = `order-${orderIndex}`;
            let deliveryTime = new Date(order.deliveryTime);
            let currentTime = new Date();

            orderDiv.innerHTML = `
                <h3>Order ${orderIndex + 1}</h3>
                <p>Order Time: ${new Date(order.orderTime).toLocaleString()}</p>

                <div class="order-items">
                    ${order.items.map((item, itemIndex) => `
                        <div class="book" id="book-${orderIndex}-${itemIndex}">
                            <img src="${item.imgUrl}" alt="${item.title}">
                            <div>
                                <h4>${item.title}</h4>
                                <p>by ${item.author}</p>
                                <p>Price: $${item.price.toFixed(2)}</p>
                                <p>Quantity: ${item.quantity}</p>
                                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                                <button onclick="generateQRLink(${orderIndex})">Get QR</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button onclick="removeOrder(${orderIndex})">Remove Order</button>
            `;
            orderItemsDiv.appendChild(orderDiv);
        });
    }
});

function generateQRLink(orderIndex) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    let order = orders[orderIndex];

    // Prepare all book details for QR code
    let allBookDetails = order.items.map(item => ({
        title: item.title,
        author: item.author,
        price: item.price.toFixed(2),
        quantity: item.quantity,
        total: (item.price * item.quantity).toFixed(2)
    }));

    // Convert to JSON string
    let queryParams = `orderId=${orderIndex + 1}&orderTime=${encodeURIComponent(new Date(order.orderTime).toLocaleString())}&books=${encodeURIComponent(JSON.stringify(allBookDetails))}`;
    window.location.href = `QR.html?${queryParams}`;
}

function removeOrder(orderIndex) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.splice(orderIndex, 1);
    localStorage.setItem("orders", JSON.stringify(orders));
    location.reload();
}
