// Products Data (Your gift & beauty products)
const products = [
    {
        id: 1,
        name: "Rose Gold Necklace",
        price: 29.99,
        category: "Gifts",
        image: "💍",
        description: "Elegant rose gold necklace with heart pendant"
    },
    {
        id: 2,
        name: "Luxury Gift Hamper",
        price: 49.99,
        category: "Gifts",
        image: "🎁",
        description: "Premium chocolates, wine & flowers hamper"
    },
    {
        id: 3,
        name: "Pearl Earrings",
        price: 39.99,
        category: "Gifts",
        image: "👂",
        description: "Classic pearl studs for every occasion"
    },
    {
        id: 4,
        name: "Organic Face Serum",
        price: 24.99,
        category: "Beauty",
        image: "💧",
        description: "Vitamin C serum for glowing skin"
    },
    {
        id: 5,
        name: "Red Lipstick Set",
        price: 19.99,
        category: "Beauty",
        image: "💄",
        description: "Matte & glossy shades collection"
    },
    {
        id: 6,
        name: "Gold Bracelet",
        price: 59.99,
        category: "Gifts",
        image: "✨",
        description: "18K gold plated charm bracelet"
    },
    {
        id: 7,
        name: "Hair Oil Treatment",
        price: 22.99,
        category: "Beauty",
        image: "🧴",
        description: "Ayurvedic hair growth oil"
    },
    {
        id: 8,
        name: "Personalized Mug",
        price: 15.99,
        category: "Gifts",
        image: "☕",
        description: "Custom photo printed ceramic mug"
    },
    {
        id: 9,
        name: "Eye Shadow Palette",
        price: 34.99,
        category: "Beauty",
        image: "🎨",
        description: "10 shades professional palette"
    },
    {
        id: 10,
        name: "Crystal Perfume",
        price: 44.99,
        category: "Beauty",
        image: "🌹",
        description: "Long-lasting floral fragrance"
    }
];

let cart = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartModal = document.getElementById('cart-modal');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartUI();
});

// Render Products
function renderProducts() {
    productsGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.image}</div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    showNotification('Added to cart!');
}

// Update Cart UI
function updateCartUI() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        cartTotal.textContent = '0';
        checkoutBtn.style.display = 'none';
        return;
    }
    
    renderCartItems();
}

// Render Cart Items
function renderCartItems() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-icon">${item.image}</div>
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${