document.addEventListener("DOMContentLoaded", loadCartItems);

function loadCartItems() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let cartItemsContainer = document.getElementById("cartItems");

    cartItemsContainer.innerHTML = ""; // Clear current list

    cartItems.forEach(item => {
        let bookDiv = document.createElement("div");
        bookDiv.className = "book";

        let img = document.createElement("img");
        img.src = item.imgUrl;
        img.alt = item.title;

        let title = document.createElement("h3");
        title.innerText = item.title;

        let author = document.createElement("p");
        author.innerText = item.author;

        let description = document.createElement("p");
        description.innerText = item.description;

        let price = document.createElement("p");
        price.innerText = `Price: $${item.price.toFixed(2)}`;

        let quantity = document.createElement("div");
        quantity.className = "quantity";
        let decreaseBtn = document.createElement("button");
        decreaseBtn.innerText = "-";
        decreaseBtn.onclick = function() {
            if (item.quantity > 1) {
                item.quantity--;
                updateQuantityDisplay(quantity, item.quantity);
            }
        };
        let quantityDisplay = document.createElement("span");
        quantityDisplay.innerText = item.quantity;
        let increaseBtn = document.createElement("button");
        increaseBtn.innerText = "+";
        increaseBtn.onclick = function() {
            item.quantity++;
            updateQuantityDisplay(quantity, item.quantity);
        };

        quantity.appendChild(decreaseBtn);
        quantity.appendChild(quantityDisplay);
        quantity.appendChild(increaseBtn);

        let removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.onclick = function() {
            removeFromCart(item.title);
            loadCartItems(); // Reload cart items after removal
        };

        bookDiv.appendChild(img);
        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(description);
        bookDiv.appendChild(price);
        bookDiv.appendChild(quantity);
        bookDiv.appendChild(removeBtn);

        cartItemsContainer.appendChild(bookDiv);
    });
}

function removeFromCart(title) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems = cartItems.filter(item => item.title !== title);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    loadCartItems(); // Update the cart items after removal
}

function showBill() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let billDetailsContainer = document.getElementById("billDetails");
    let totalAmountContainer = document.getElementById("totalAmount");

    let totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let bookingFee = 5.00; // Example booking fee
    let tax = 0.1 * totalPrice; // 10% tax

    billDetailsContainer.innerHTML = ""; // Clear current bill details
    cartItems.forEach(item => {
        let itemDiv = document.createElement("div");
        itemDiv.innerHTML = `${item.title} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        billDetailsContainer.appendChild(itemDiv);
    });

    totalAmountContainer.innerHTML = `
        <p>Total Price: $${totalPrice.toFixed(2)}</p>
        <p>booking Fee: $${bookingFee.toFixed(2)}</p>
        <p>Tax: $${tax.toFixed(2)}</p>
        <hr>
        <h3>Final Total: $${(totalPrice + bookingFee + tax).toFixed(2)}</h3>
    `;

    document.getElementById("billModal").style.display = "block";
}

function closeModal() {
    document.getElementById("billModal").style.display = "none";
}

function placeBooking() {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (cartItems.length > 0) {
        let order = {
            items: cartItems,
            orderTime: new Date().toISOString(),
            deliveryTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
            totalPrice: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + 5.00 + (0.1 * cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)) // Total price including delivery fee and tax
        };

        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.removeItem("cartItems");
        loadCartItems();
        closeModal();
        launchConfetti(); // Trigger confetti effect
        showNotification("Order placed successfully!"); // Show notification
    } else {
        alert("Your cart is empty!");
    }
}

function addToCart(title, author, imgUrl, description, price) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let existingItem = cartItems.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ title, author, imgUrl, description, price, quantity: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    loadCartItems(); // Update the cart items after adding
}

function updateQuantityDisplay(quantityElement, quantity) {
    let quantityDisplay = quantityElement.querySelector("span");
    quantityDisplay.innerText = quantity;
}

function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function showNotification(message) {
    let notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("show");
        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }, 100);
}