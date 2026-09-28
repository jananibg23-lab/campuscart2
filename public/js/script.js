/**
 * CampusCart - Main Application Script
 * Vanilla JavaScript implementation for student shopping cart
 */

// =============================================================================
// 1. Cart Management & Storage Helpers
// =============================================================================
const CART_STORAGE_KEY = 'campuscart_items';
const LAST_ORDER_KEY = 'campuscart_last_order';

function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading cart from localStorage', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadges();
  } catch (e) {
    console.error('Error saving cart to localStorage', e);
  }
}

function addToCart(productId, quantity = 1, showToastNotification = true) {
  const product = getProductById(productId);
  if (!product) return;

  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ id: productId, quantity: quantity });
  }

  saveCart(cart);

  if (showToastNotification) {
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}"${product.name}" to cart!`);
  }
}

function updateCartItemQuantity(productId, newQuantity) {
  let cart = getCart();
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = newQuantity;
    saveCart(cart);
  }
}

function removeFromCart(productId) {
  let cart = getCart();
  const product = getProductById(productId);
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  if (product) {
    showToast(`Removed "${product.name}" from cart.`);
  }
}

function clearCart() {
  localStorage.removeItem(CART_STORAGE_KEY);
  updateCartBadges();
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartBadges() {
  const count = getCartCount();
  const badges = document.querySelectorAll('.cart-badge');
  badges.forEach(badge => {
    badge.textContent = count;
  });
}

function formatPrice(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

// =============================================================================
// 2. Toast Notifications
// =============================================================================
function showToast(message, isError = false) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (isError) {
    toast.style.borderLeftColor = 'var(--red)';
  }

  toast.innerHTML = `
    <span class="toast-icon">${isError ? '⚠️' : '✓'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2500);
}

// =============================================================================
// 3. Global Navbar Initializer
// =============================================================================
function initNavbar() {
  updateCartBadges();

  // Highlight active link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile menu toggle
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      toggleBtn.textContent = mobileNav.classList.contains('open') ? '✕' : '☰';
    });
  }
}

// =============================================================================
// 4. Product Card Template Helper
// =============================================================================
function renderProductCard(product) {
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  
  return `
    <article class="product-card" data-id="${product.id}">
      <a href="product-details.html?id=${product.id}" class="product-thumb-link" aria-label="View details for ${product.name}">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
      </a>
      <div class="product-card-body">
        <div class="product-meta-row">
          <span>${product.category}</span>
          <span aria-hidden="true">·</span>
          <span>In Stock</span>
        </div>
        <h3 class="product-title">
          <a href="product-details.html?id=${product.id}">${product.name}</a>
        </h3>
        <p class="product-desc">${product.shortDesc}</p>
        <div class="product-card-rating">
          <div class="rating-stars">
            <span>★</span>
            <span class="rating-score">${product.rating}</span>
            <span class="rating-count">(${product.reviews})</span>
          </div>
        </div>
        <div class="product-price-row">
          <span class="product-price tabular-nums">${formatPrice(product.price)}</span>
          <span class="product-original-price tabular-nums">${formatPrice(product.originalPrice)}</span>
          <span class="product-discount-label">${discountPercent}% OFF</span>
        </div>
        <div class="product-card-actions">
          <button type="button" class="btn btn-primary btn-sm add-to-cart-btn" data-id="${product.id}">
            🛒 Add to Cart
          </button>
          <a href="product-details.html?id=${product.id}" class="btn btn-secondary btn-sm">
            Details
          </a>
        </div>
      </div>
    </article>
  `;
}

// Attach event delegation for "Add to Cart" buttons
function attachAddToCartListeners(container) {
  if (!container) return;
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
      const id = parseInt(btn.getAttribute('data-id'), 10);
      addToCart(id, 1);
    }
  });
}

// =============================================================================
// 5. Home Page Logic (index.html)
// =============================================================================
function initHomePage() {
  const featuredContainer = document.getElementById('featured-products-grid');
  if (!featuredContainer) return;

  // Show 4 top-rated items
  const featured = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 4);
  featuredContainer.innerHTML = featured.map(p => renderProductCard(p)).join('');
  attachAddToCartListeners(featuredContainer);
}

// =============================================================================
// 6. Shop / Products Page Logic (products.html)
// =============================================================================
function initProductsPage() {
  const gridContainer = document.getElementById('products-grid');
  if (!gridContainer) return;

  const searchInput = document.getElementById('search-input');
  const clearSearchBtn = document.getElementById('clear-search-btn');
  const sortSelect = document.getElementById('sort-select');
  const categoryTabs = document.querySelectorAll('.category-tab-btn');
  const countLabel = document.getElementById('products-count');
  const emptyState = document.getElementById('products-empty-state');

  // Parse initial query params (e.g. ?category=Tech+Accessories)
  const urlParams = new URLSearchParams(window.location.search);
  let activeCategory = urlParams.get('category') || 'All';
  let searchQuery = urlParams.get('search') || '';
  let sortBy = 'featured';

  if (searchInput && searchQuery) {
    searchInput.value = searchQuery;
    if (clearSearchBtn) clearSearchBtn.classList.add('active');
  }

  function updateCategoryTabsUI() {
    categoryTabs.forEach(tab => {
      const cat = tab.getAttribute('data-category');
      if (cat.toLowerCase() === activeCategory.toLowerCase()) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  function filterAndSortProducts() {
    let result = [...PRODUCTS];

    // Filter by Category
    if (activeCategory && activeCategory !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.shortDesc.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Update Count Label
    if (countLabel) {
      countLabel.textContent = `Showing ${result.length} of ${PRODUCTS.length} products`;
    }

    // Render Grid
    if (result.length === 0) {
      gridContainer.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
    } else {
      gridContainer.style.display = 'grid';
      if (emptyState) emptyState.style.display = 'none';
      gridContainer.innerHTML = result.map(p => renderProductCard(p)).join('');
    }
  }

  // Setup Event Listeners
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activeCategory = tab.getAttribute('data-category');
      updateCategoryTabsUI();
      filterAndSortProducts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('active', searchQuery.length > 0);
      }
      filterAndSortProducts();
    });
  }

  if (clearSearchBtn && searchInput) {
    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.classList.remove('active');
      searchInput.focus();
      filterAndSortProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      filterAndSortProducts();
    });
  }

  attachAddToCartListeners(gridContainer);
  updateCategoryTabsUI();
  filterAndSortProducts();
}

// =============================================================================
// 7. Product Details Page Logic (product-details.html)
// =============================================================================
function initProductDetailsPage() {
  const pdpContainer = document.getElementById('pdp-content');
  if (!pdpContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'), 10) || 1;
  const product = getProductById(productId);

  if (!product) {
    pdpContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>Product Not Found</h3>
        <p>The product you are looking for does not exist or has been removed.</p>
        <a href="products.html" class="btn btn-primary">Browse All Products</a>
      </div>
    `;
    return;
  }

  // Update Page Title
  document.title = `${product.name} – CampusCart`;

  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  // Render Breadcrumbs
  const breadcrumbsEl = document.getElementById('pdp-breadcrumbs');
  if (breadcrumbsEl) {
    breadcrumbsEl.innerHTML = `
      <a href="index.html">Home</a>
      <span aria-hidden="true">/</span>
      <a href="products.html">Shop</a>
      <span aria-hidden="true">/</span>
      <a href="products.html?category=${encodeURIComponent(product.category)}">${product.category}</a>
      <span aria-hidden="true">/</span>
      <span style="color: var(--text-main); font-weight: 600;">${product.name}</span>
    `;
  }

  // Render PDP
  pdpContainer.innerHTML = `
    <div class="pdp-grid">
      <!-- Image Showcase -->
      <div class="pdp-image-showcase">
        <img src="${product.image}" alt="${product.name}" id="main-product-img" />
      </div>

      <!-- Details Panel -->
      <div class="pdp-details-panel">
        <div class="pdp-category-kicker">${product.category}</div>
        <h1 class="pdp-title">${product.name}</h1>

        <div class="pdp-rating-row">
          <div class="rating-stars">
            <span>★</span>
            <span class="rating-score">${product.rating}</span>
            <span class="rating-count">(${product.reviews} student reviews)</span>
          </div>
          <span class="in-stock-tag">In Stock & Ready to Ship</span>
        </div>

        <div class="pdp-price-box">
          <span class="pdp-current-price tabular-nums">${formatPrice(product.price)}</span>
          <span class="pdp-original-price tabular-nums">${formatPrice(product.originalPrice)}</span>
          <span class="pdp-savings-badge">Save ${discountPercent}% (${formatPrice(product.originalPrice - product.price)})</span>
        </div>

        <div class="pdp-description-block">
          <p>${product.fullDesc}</p>
        </div>

        <!-- Specifications & Features -->
        <div class="pdp-specs-card">
          <h4>Key Highlights & Specifications</h4>
          <ul class="pdp-specs-list">
            ${product.features.map(f => `<li><span class="bullet">✓</span><span>${f}</span></li>`).join('')}
          </ul>
        </div>

        <!-- Purchase Actions -->
        <div class="pdp-purchase-actions">
          <div class="qty-stepper">
            <button type="button" class="qty-btn" id="qty-minus" aria-label="Decrease quantity">−</button>
            <input type="number" id="qty-input" class="qty-input" value="1" min="1" max="10" readonly />
            <button type="button" class="qty-btn" id="qty-plus" aria-label="Increase quantity">+</button>
          </div>

          <button type="button" class="btn btn-primary btn-lg" id="add-to-cart-pdp" style="flex: 1;">
            🛒 Add to Cart
          </button>
          <button type="button" class="btn btn-accent btn-lg" id="buy-now-pdp">
            ⚡ Buy Now
          </button>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <a href="products.html" class="btn btn-secondary btn-sm">
            ← Back to Products
          </a>
        </div>

        <!-- Trust Badges -->
        <div class="pdp-trust-bar">
          <div class="pdp-trust-item">
            <strong>Campus Delivery</strong>
            <span>2-3 Days to Hostel/Campus</span>
          </div>
          <div class="pdp-trust-item">
            <strong>Pay on Delivery</strong>
            <span>Cash / UPI on arrival</span>
          </div>
          <div class="pdp-trust-item">
            <strong>Student Discount</strong>
            <span>Verified Lowest Price</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Quantity Stepper Handlers
  const qtyInput = document.getElementById('qty-input');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10);
      if (val > 1) qtyInput.value = val - 1;
    });

    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10);
      if (val < 10) qtyInput.value = val + 1;
    });
  }

  // Add to Cart
  const addBtn = document.getElementById('add-to-cart-pdp');
  if (addBtn && qtyInput) {
    addBtn.addEventListener('click', () => {
      const qty = parseInt(qtyInput.value, 10) || 1;
      addToCart(product.id, qty);
    });
  }

  // Buy Now
  const buyBtn = document.getElementById('buy-now-pdp');
  if (buyBtn && qtyInput) {
    buyBtn.addEventListener('click', () => {
      const qty = parseInt(qtyInput.value, 10) || 1;
      addToCart(product.id, qty, false);
      window.location.href = 'checkout.html';
    });
  }

  // Related Products
  const relatedContainer = document.getElementById('related-products-grid');
  if (relatedContainer) {
    const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
    if (related.length > 0) {
      relatedContainer.innerHTML = related.map(p => renderProductCard(p)).join('');
      attachAddToCartListeners(relatedContainer);
    } else {
      const otherTop = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);
      relatedContainer.innerHTML = otherTop.map(p => renderProductCard(p)).join('');
      attachAddToCartListeners(relatedContainer);
    }
  }
}

// =============================================================================
// 8. Shopping Cart Page Logic (cart.html)
// =============================================================================
function initCartPage() {
  const cartContent = document.getElementById('cart-content');
  if (!cartContent) return;

  function renderCart() {
    const cart = getCart();

    if (cart.length === 0) {
      cartContent.innerHTML = `
        <div class="empty-state" style="margin: 3rem 0;">
          <div class="empty-state-icon">🛒</div>
          <h3>Your Shopping Cart is Empty</h3>
          <p>Looks like you haven't added any college essentials yet. Check out our student store for notebooks, tech accessories, and more!</p>
          <a href="products.html" class="btn btn-primary btn-lg">Explore College Store</a>
        </div>
      `;
      return;
    }

    let subtotal = 0;
    const itemsHtml = cart.map(item => {
      const product = getProductById(item.id);
      if (!product) return '';
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      return `
        <div class="cart-item-row" data-id="${product.id}">
          <div class="cart-item-product">
            <a href="product-details.html?id=${product.id}" class="cart-item-thumb">
              <img src="${product.image}" alt="${product.name}" />
            </a>
            <div class="cart-item-info">
              <h4><a href="product-details.html?id=${product.id}">${product.name}</a></h4>
              <p>${product.category}</p>
            </div>
          </div>

          <div class="cart-item-price tabular-nums">
            ${formatPrice(product.price)}
          </div>

          <div>
            <div class="qty-stepper">
              <button type="button" class="qty-btn cart-qty-minus" data-id="${product.id}">−</button>
              <input type="text" class="qty-input" value="${item.quantity}" readonly />
              <button type="button" class="qty-btn cart-qty-plus" data-id="${product.id}">+</button>
            </div>
          </div>

          <div class="cart-item-total tabular-nums">
            ${formatPrice(itemTotal)}
          </div>

          <div>
            <button type="button" class="cart-remove-btn" data-id="${product.id}" title="Remove item" aria-label="Remove ${product.name}">
              🗑
            </button>
          </div>
        </div>
      `;
    }).join('');

    const freeShippingThreshold = 499;
    const deliveryFee = subtotal >= freeShippingThreshold ? 0 : 49;
    const finalTotal = subtotal + deliveryFee;
    const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

    cartContent.innerHTML = `
      <div class="cart-page-layout">
        <!-- Cart Items List -->
        <div class="cart-items-card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
            <h2 style="font-size: 1.35rem; font-weight: 800;">Shopping Cart (${getCartCount()} items)</h2>
            <button type="button" id="clear-all-cart-btn" class="btn btn-secondary btn-sm" style="color: var(--red);">
              Clear Cart
            </button>
          </div>

          <div class="cart-table-header">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
            <div></div>
          </div>

          <div id="cart-rows-container">
            ${itemsHtml}
          </div>

          <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <a href="products.html" class="btn btn-secondary">
              ← Continue Shopping
            </a>
          </div>
        </div>

        <!-- Order Summary Sidebar -->
        <div class="cart-summary-card">
          <h3>Order Summary</h3>

          ${subtotal < freeShippingThreshold ? `
            <div style="background: var(--amber-light); border: 1px solid #FCD34D; padding: 0.75rem 1rem; border-radius: var(--radius-md); font-size: 0.85rem; color: #92400E; margin-bottom: 1.25rem;">
              ⚡ Add <strong>${formatPrice(remainingForFreeShipping)}</strong> more to unlock <strong>Free Campus Delivery!</strong>
            </div>
          ` : `
            <div style="background: var(--accent-light); border: 1px solid #A7F3D0; padding: 0.75rem 1rem; border-radius: var(--radius-md); font-size: 0.85rem; color: #065F46; margin-bottom: 1.25rem;">
              🎉 <strong>Free Campus Delivery</strong> unlocked for this order!
            </div>
          `}

          <div class="summary-line-row">
            <span>Items Subtotal</span>
            <span class="tabular-nums" style="font-weight: 700;">${formatPrice(subtotal)}</span>
          </div>

          <div class="summary-line-row">
            <span>Campus Delivery</span>
            <span>
              ${deliveryFee === 0 ? '<span class="free-shipping-tag">FREE</span>' : `<span class="tabular-nums font-semibold">${formatPrice(deliveryFee)}</span>`}
            </span>
          </div>

          <div class="summary-line-row">
            <span>Student Discount</span>
            <span class="free-shipping-tag">Applied</span>
          </div>

          <div class="summary-line-row total-row">
            <span>Final Total</span>
            <span class="tabular-nums" style="color: var(--primary);">${formatPrice(finalTotal)}</span>
          </div>

          <div style="margin-top: 1.5rem;">
            <a href="checkout.html" class="btn btn-primary btn-lg btn-full">
              Proceed to Checkout →
            </a>
          </div>

          <div style="margin-top: 1.25rem; font-size: 0.8rem; color: var(--text-muted); text-align: center;">
            🔒 Safe & Secure Campus Order · Pay on Delivery
          </div>
        </div>
      </div>
    `;

    // Attach Stepper & Remove Handlers
    attachCartRowHandlers();
  }

  function attachCartRowHandlers() {
    const rows = document.getElementById('cart-rows-container');
    if (!rows) return;

    rows.addEventListener('click', (e) => {
      const minusBtn = e.target.closest('.cart-qty-minus');
      const plusBtn = e.target.closest('.cart-qty-plus');
      const removeBtn = e.target.closest('.cart-remove-btn');

      if (minusBtn) {
        const id = parseInt(minusBtn.getAttribute('data-id'), 10);
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item) {
          updateCartItemQuantity(id, item.quantity - 1);
          renderCart();
        }
      }

      if (plusBtn) {
        const id = parseInt(plusBtn.getAttribute('data-id'), 10);
        const cart = getCart();
        const item = cart.find(i => i.id === id);
        if (item && item.quantity < 10) {
          updateCartItemQuantity(id, item.quantity + 1);
          renderCart();
        }
      }

      if (removeBtn) {
        const id = parseInt(removeBtn.getAttribute('data-id'), 10);
        removeFromCart(id);
        renderCart();
      }
    });

    const clearAllBtn = document.getElementById('clear-all-cart-btn');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
          clearCart();
          renderCart();
        }
      });
    }
  }

  renderCart();
}

// =============================================================================
// 9. Checkout Page Logic (checkout.html)
// =============================================================================
function initCheckoutPage() {
  const checkoutContainer = document.getElementById('checkout-page-container');
  if (!checkoutContainer) return;

  const cart = getCart();
  if (cart.length === 0) {
    checkoutContainer.innerHTML = `
      <div class="empty-state" style="margin: 3rem 0;">
        <div class="empty-state-icon">🛒</div>
        <h3>No Items to Checkout</h3>
        <p>Your cart is empty. Please add items before proceeding to checkout.</p>
        <a href="products.html" class="btn btn-primary btn-lg">Browse Products</a>
      </div>
    `;
    return;
  }

  // Calculate totals
  let subtotal = 0;
  const itemsSummaryHtml = cart.map(item => {
    const product = getProductById(item.id);
    if (!product) return '';
    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;
    return `
      <div class="checkout-item-mini">
        <div class="name-qty">
          <img src="${product.image}" alt="${product.name}" style="width: 38px; height: 38px; object-fit: contain; border-radius: var(--radius-sm); background: var(--bg-page); border: 1px solid var(--border-light);" />
          <div>
            <div style="font-weight: 700; color: var(--text-main);">${product.name}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">Qty: ${item.quantity} × ${formatPrice(product.price)}</div>
          </div>
        </div>
        <div class="tabular-nums" style="font-weight: 700;">${formatPrice(itemTotal)}</div>
      </div>
    `;
  }).join('');

  const freeShippingThreshold = 499;
  const deliveryFee = subtotal >= freeShippingThreshold ? 0 : 49;
  const finalTotal = subtotal + deliveryFee;

  // Insert Order Summary
  const orderItemsList = document.getElementById('checkout-items-list');
  if (orderItemsList) orderItemsList.innerHTML = itemsSummaryHtml;

  const subtotalEl = document.getElementById('checkout-subtotal');
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);

  const deliveryEl = document.getElementById('checkout-delivery');
  if (deliveryEl) deliveryEl.innerHTML = deliveryFee === 0 ? '<span class="free-shipping-tag">FREE</span>' : formatPrice(deliveryFee);

  const totalEl = document.getElementById('checkout-total');
  if (totalEl) totalEl.textContent = formatPrice(finalTotal);

  // Form Validation and Submission
  const form = document.getElementById('checkout-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    function validateField(id, errorId, validator) {
      const input = document.getElementById(id);
      const errorMsg = document.getElementById(errorId);
      if (!input || !errorMsg) return true;

      const valid = validator(input.value.trim());
      if (!valid) {
        input.classList.add('error');
        errorMsg.classList.add('visible');
        isValid = false;
      } else {
        input.classList.remove('error');
        errorMsg.classList.remove('visible');
      }
      return valid;
    }

    validateField('customer-name', 'name-error', val => val.length >= 2);
    validateField('customer-email', 'email-error', val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
    validateField('customer-phone', 'phone-error', val => /^[6-9]\d{9}$/.test(val.replace(/\s+/g, '')));
    validateField('customer-address', 'address-error', val => val.length >= 5);
    validateField('customer-city', 'city-error', val => val.length >= 2);
    validateField('customer-state', 'state-error', val => val.length >= 2);
    validateField('customer-pincode', 'pincode-error', val => /^\d{6}$/.test(val));

    if (!isValid) {
      showToast('Please correct the highlighted fields.', true);
      return;
    }

    // Capture payment mode
    const paymentModeInput = document.querySelector('input[name="payment_method"]:checked');
    const paymentMode = paymentModeInput ? paymentModeInput.value : 'Pay on Delivery';

    // Generate Random Order ID
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `CC-${randomNum}`;

    // Collect order details
    const orderData = {
      orderId: orderId,
      date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      customer: {
        name: document.getElementById('customer-name').value.trim(),
        email: document.getElementById('customer-email').value.trim(),
        phone: document.getElementById('customer-phone').value.trim(),
        address: document.getElementById('customer-address').value.trim(),
        city: document.getElementById('customer-city').value.trim(),
        state: document.getElementById('customer-state').value.trim(),
        pincode: document.getElementById('customer-pincode').value.trim(),
      },
      paymentMode: paymentMode,
      items: cart.map(i => {
        const prod = getProductById(i.id);
        return {
          id: i.id,
          name: prod ? prod.name : 'Unknown Product',
          price: prod ? prod.price : 0,
          quantity: i.quantity,
          image: prod ? prod.image : ''
        };
      }),
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      finalTotal: finalTotal
    };

    try {
      localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(orderData));
      clearCart();
      window.location.href = 'success.html';
    } catch (err) {
      console.error('Error saving order', err);
      showToast('Error placing order. Please try again.', true);
    }
  });
}

// =============================================================================
// 10. Order Success Page Logic (success.html)
// =============================================================================
function initSuccessPage() {
  const container = document.getElementById('success-page-container');
  if (!container) return;

  let orderData = null;
  try {
    const raw = localStorage.getItem(LAST_ORDER_KEY);
    orderData = raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Error reading order from localStorage', e);
  }

  if (!orderData) {
    container.innerHTML = `
      <div class="empty-state" style="margin: 3rem 0;">
        <div class="empty-state-icon">📦</div>
        <h3>No Recent Order Found</h3>
        <p>We couldn't locate recent order details on this browser session. If you just placed an order, check your email confirmation.</p>
        <a href="products.html" class="btn btn-primary btn-lg">Continue Shopping</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="success-container">
      <div class="success-check-badge">✓</div>
      <h1>Order Placed Successfully!</h1>
      <p style="color: var(--text-muted); margin-bottom: 1rem;">Thank you for your order, <strong>${orderData.customer.name}</strong>! We're preparing your college essentials for dispatch.</p>
      
      <div class="order-id-badge">Order ID: #${orderData.orderId}</div>

      <div class="delivery-estimate-card">
        <div class="icon">🚚</div>
        <div>
          <strong style="color: var(--text-main); font-size: 0.95rem; display: block;">Campus Delivery Dispatch: 2–3 Days</strong>
          <span style="font-size: 0.85rem; color: var(--text-body);">Your parcel will be delivered directly to: <strong>${orderData.customer.address}, ${orderData.customer.city} (${orderData.customer.pincode})</strong></span>
        </div>
      </div>

      <div class="success-summary-box">
        <h3>Order Receipt & Summary</h3>
        <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">
          <div><strong>Order Date:</strong> ${orderData.date}</div>
          <div><strong>Payment Mode:</strong> ${orderData.paymentMode}</div>
          <div><strong>Customer Contact:</strong> ${orderData.customer.phone} · ${orderData.customer.email}</div>
        </div>

        <div style="border-top: 1px solid var(--border-light); padding-top: 0.75rem; margin-top: 0.75rem;">
          ${orderData.items.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0; font-size: 0.9rem;">
              <span>${item.name} × ${item.quantity}</span>
              <span class="tabular-nums" style="font-weight: 700;">${formatPrice(item.price * item.quantity)}</span>
            </div>
          `).join('')}
        </div>

        <div style="border-top: 1px solid var(--border-light); padding-top: 0.75rem; margin-top: 0.75rem;">
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.3rem;">
            <span>Subtotal</span>
            <span class="tabular-nums">${formatPrice(orderData.subtotal)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.88rem; color: var(--text-muted); margin-bottom: 0.5rem;">
            <span>Campus Delivery</span>
            <span>${orderData.deliveryFee === 0 ? '<span class="free-shipping-tag">FREE</span>' : formatPrice(orderData.deliveryFee)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 1.15rem; font-weight: 800; color: var(--text-main); border-top: 1px dashed var(--border-light); padding-top: 0.6rem;">
            <span>Total Amount</span>
            <span class="tabular-nums" style="color: var(--primary);">${formatPrice(orderData.finalTotal)}</span>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
        <button type="button" class="btn btn-secondary" onclick="window.print()">
          🖨 Print Invoice
        </button>
        <a href="products.html" class="btn btn-primary btn-lg">
          Continue Shopping →
        </a>
      </div>
    </div>
  `;
}

// =============================================================================
// 11. About Us Page Logic (about.html)
// =============================================================================
function initAboutPage() {
  const contactForm = document.getElementById('about-contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const msgInput = document.getElementById('contact-message');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim()) {
      showToast('Please fill out all contact fields.', true);
      return;
    }

    showToast('Thank you! Your campus support inquiry has been submitted.');
    contactForm.reset();
  });
}

// =============================================================================
// 12. Main Initialization on DOM Ready
// =============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHomePage();
  initProductsPage();
  initProductDetailsPage();
  initCartPage();
  initCheckoutPage();
  initSuccessPage();
  initAboutPage();
});
