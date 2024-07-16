function searchBooks() {
    const query = document.getElementById('searchInput').value;
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = ''; // Clear previous results

    // Simulated search results (you can replace this with an actual search function)
    const books = [
        'Introduction to Algorithms',
        'JavaScript: The Good Parts',
        'Clean Code',
        'Design Patterns',
        'You Don\'t Know JS'
    ];

    const filteredBooks = books.filter(book => book.toLowerCase().includes(query.toLowerCase()));

    if (filteredBooks.length > 0) {
        filteredBooks.forEach(book => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.textContent = book;
            booksContainer.appendChild(bookDiv);
        });
    } else {
        booksContainer.textContent = 'No books found.';
    }
}
