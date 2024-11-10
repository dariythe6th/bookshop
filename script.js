// Smooth scrolling for navigation
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Update total price in the cart
document.addEventListener('DOMContentLoaded', () => {
    const cartItems = document.querySelectorAll('.cart-item');
    let totalPrice = 0;
    cartItems.forEach(item => {
        const price = parseInt(item.querySelector('p').innerText.replace('Цена: ', '').replace(' руб.', ''));
        totalPrice += price;
    });
    document.getElementById('total-price').innerText = `${totalPrice} руб.`;
});

// Placeholder for login functionality
const loginForm = document.querySelector('.login-form form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Вход в аккаунт временно недоступен.');
    });
}

// Placeholder for logout functionality
const logoutBtn = document.querySelector('.logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        alert('Вы вышли из аккаунта.');
    });
}
// Search Books Function
function searchBooks() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const books = document.querySelectorAll('.book-card');
    books.forEach(book => {
        const title = book.querySelector('h4').innerText.toLowerCase();
        if (title.includes(query)) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
}

// Sort Books Function
function sortBooks() {
    const criteria = document.getElementById('sort-books').value;
    const bookGrid = document.getElementById('book-grid');
    const books = Array.from(bookGrid.children);
    
    books.sort((a, b) => {
        if (criteria === 'price') {
            return parseInt(a.dataset.price) - parseInt(b.dataset.price);
        } else if (criteria === 'title') {
            return a.dataset.title.localeCompare(b.dataset.title);
        } else if (criteria === 'popularity') {
            return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
        }
    });

    bookGrid.innerHTML = '';
    books.forEach(book => bookGrid.appendChild(book));
}

// Wishlist Functionality
function addToWishlist(button) {
    const bookCard = button.parentElement;
    const title = bookCard.querySelector('h4').innerText;
    const price = bookCard.querySelector('p:nth-child(3)').innerText;
    const imageSrc = bookCard.querySelector('img').src;

    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const book = { title, price, imageSrc };

    if (!wishlist.some(item => item.title === title)) {
        wishlist.push(book);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${title} добавлена в избранное!`);
    } else {
        alert(`${title} уже в избранном.`);
    }
}

// Load Wishlist Items on Wishlist Page
function loadWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistGrid = document.getElementById('wishlist-grid');

    if (wishlistGrid) {
        wishlist.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');

            bookCard.innerHTML = `
                <img src="${book.imageSrc}" alt="${book.title}">
                <h4>${book.title}</h4>
                <p>${book.price}</p>
                <button onclick="removeFromWishlist('${book.title}')">Удалить</button>
            `;

            wishlistGrid.appendChild(bookCard);
        });
    }
}

// Remove Book from Wishlist
function removeFromWishlist(title) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(book => book.title !== title);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    alert(`${title} удалена из избранного.`);
    location.reload(); // Refresh the page to update the wishlist
}

// Call loadWishlist when the wishlist page loads
document.addEventListener('DOMContentLoaded', loadWishlist);
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
