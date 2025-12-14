const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Retirer "active" de tous les boutons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Ajouter "active" au bouton cliqué
        this.classList.add('active');
        
        // Récupérer la catégorie
        const category = this.dataset.category;
        
        // Afficher/Cacher les produits
        productCards.forEach(card => {
            if (category === 'tous' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// =========================================================
// TRI DES PRODUITS
// =========================================================
const sortSelect = document.getElementById('sortSelect');
const productsGrid = document.getElementById('productsGrid');

if (sortSelect && productsGrid) {
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const cardsArray = Array.from(productCards);
        
        // Trier selon l'option
        if (sortValue === 'price-asc') {
            cardsArray.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
        } 
        else if (sortValue === 'price-desc') {
            cardsArray.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
        } 
        else if (sortValue === 'name') {
            cardsArray.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
        }
        
        // Réorganiser les cartes
        if (sortValue !== 'default') {
            cardsArray.forEach(card => productsGrid.appendChild(card));
        }
    });
}