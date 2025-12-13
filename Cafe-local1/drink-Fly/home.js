// =========================================================
// BASE DE DONNÉES DES PRODUITS DU MENU
// =========================================================
const menuProducts = [
    // Boissons Chaudes
    { id: 1, name: "Espresso", category: "boissons-chaudes", price: 3.50 },
    { id: 2, name: "Cappuccino", category: "boissons-chaudes", price: 5.00 },
    { id: 3, name: "Thé Vert", category: "boissons-chaudes", price: 4.00 },
    { id: 4, name: "Latte Vanille", category: "boissons-chaudes", price: 5.50 },
    
    // Boissons Froides
    { id: 5, name: "Limonade Maison", category: "boissons-froides", price: 4.50 },
    { id: 6, name: "Smoothie Fruits Rouges", category: "boissons-froides", price: 6.50 },
    { id: 7, name: "Jus d'Orange Frais", category: "boissons-froides", price: 5.00 },
    
    // Pâtisseries
    { id: 8, name: "Croissant au Beurre", category: "patisseries", price: 2.50 },
    { id: 9, name: "Tarte aux Pommes", category: "patisseries", price: 5.50 },
    { id: 10, name: "Éclair au Chocolat", category: "patisseries", price: 4.00 },
    
    // Sandwiches
    { id: 11, name: "Sandwich Club", category: "sandwiches", price: 8.00 },
    { id: 12, name: "Sandwich Végétarien", category: "sandwiches", price: 7.00 }
];

const categoryNames = {
    "boissons-chaudes": "Boissons Chaudes",
    "boissons-froides": "Boissons Froides",
    "patisseries": "Pâtisseries",
    "sandwiches": "Sandwiches"
};

// =========================================================
// SLIDESHOW DES IMAGES
// =========================================================
let slideIndex = 0;

function showSlides() {
    const slides = document.querySelectorAll(".slide");
    if (slides.length === 0) return;

    slides.forEach(slide => slide.classList.remove("active"));
    
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    
    slides[slideIndex - 1].classList.add("active");
    
    setTimeout(showSlides, 4000);
}

// =========================================================
// DÉMARRAGE AU CHARGEMENT DE LA PAGE
// =========================================================
document.addEventListener('DOMContentLoaded', function() {
    showSlides();
    loadMenuItems();
    setupCheckboxListeners();
    setupClearButton();
});

// =========================================================
// AFFICHER LES PRODUITS
// =========================================================
function loadMenuItems() {
    const itemsContainer = document.getElementById('items-container');
    if (!itemsContainer) return;
    
    menuProducts.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';
        
        itemDiv.innerHTML = `
            <input type="checkbox" 
                   id="item-${product.id}" 
                   class="item-checkbox" 
                   data-name="${product.name}"
                   data-price="${product.price}">
            <div class="item-info">
                <div class="item-name">${product.name}</div>
                <div class="item-category">${categoryNames[product.category]}</div>
            </div>
            <div class="item-price">${product.price.toFixed(2)} DT</div>
        `;
        
        itemsContainer.appendChild(itemDiv);
    });
}

// =========================================================
// GESTION DES CHECKBOXES
// =========================================================
function setupCheckboxListeners() {
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('item-checkbox')) {
            calculateInvoice();
        }
    });
    
    document.addEventListener('click', function(e) {
        if (e.target.closest('.menu-item') && e.target.type !== 'checkbox') {
            const item = e.target.closest('.menu-item');
            const checkbox = item.querySelector('.item-checkbox');
            checkbox.checked = !checkbox.checked;
            calculateInvoice();
        }
    });
}

// =========================================================
// CALCULER LA FACTURE
// =========================================================
function calculateInvoice() {
    const invoiceItems = document.getElementById('invoice-items');
    const totalElement = document.getElementById('total');
    const checkedBoxes = document.querySelectorAll('.item-checkbox:checked');
    
    if (checkedBoxes.length === 0) {
        invoiceItems.innerHTML = '<p class="empty-message">Sélectionnez des articles pour voir la facture</p>';
        totalElement.textContent = '0.00 DT';
        return;
    }
    
    let total = 0;
    invoiceItems.innerHTML = '';
    
    checkedBoxes.forEach(checkbox => {
        const name = checkbox.dataset.name;
        const price = parseFloat(checkbox.dataset.price);
        total += price;
        
        invoiceItems.innerHTML += `
            <div class="invoice-item">
                <span class="invoice-item-name">${name}</span>
                <span class="invoice-item-price">${price.toFixed(2)} DT</span>
            </div>
        `;
    });
    
    totalElement.textContent = total.toFixed(2) + ' DT';
}

// =========================================================
// BOUTON EFFACER
// =========================================================
function setupClearButton() {
    const clearBtn = document.getElementById('clear-order');
    if (!clearBtn) return;
    
    clearBtn.addEventListener('click', function() {
        document.querySelectorAll('.item-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
        calculateInvoice();
    });
}