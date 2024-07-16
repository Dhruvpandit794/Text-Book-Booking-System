let itemCount = document.getElementById("cart-item-count");

function addToCart(button, title, author, imgUrl, price) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    let existingItem = cartItems.find(item => item.title === title);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ title, author, imgUrl, price, quantity: 1 });
    }

    // Update button text
    button.innerText = "Added to Cart";

    // Update cart item count
    itemCount.innerText = cartItems.reduce((total, item) => total + item.quantity, 0);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function searchBooks() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let books = document.querySelectorAll('.book');

    books.forEach(book => {
        let title = book.getAttribute('data-title').toLowerCase();
        let author = book.getAttribute('data-author').toLowerCase();
        if (title.includes(input) || author.includes(input)) {
            book.style.display = '';
        } else {
            book.style.display = 'none';
        }
    });
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

function viewOrders() {
    window.location.href = 'orders.html';
}

// Initialize cart item count on page load
document.addEventListener("DOMContentLoaded", () => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    itemCount.innerText = cartItems.reduce((total, item) => total + item.quantity, 0);

    // Add event listener to search input for dynamic search
    document.getElementById('searchInput').addEventListener('input', searchBooks);
});