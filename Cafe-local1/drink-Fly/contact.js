// =========================================================
// ÉLÉMENTS DU FORMULAIRE
// =========================================================
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// =========================================================
// VALIDATION DU NOM
// =========================================================
function validateName() {
    const name = nameInput.value.trim();
    
    if (name === '') {
        nameError.textContent = 'Le nom est obligatoire';
        nameInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    if (name.length < 2) {
        nameError.textContent = 'Le nom doit contenir au moins 2 caractères';
        nameInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    nameError.textContent = '';
    nameInput.style.borderColor = '#27ae60';
    return true;
}

// =========================================================
// VALIDATION DE L'EMAIL
// =========================================================
function validateEmail() {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        emailError.textContent = 'L\'email est obligatoire';
        emailInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Email invalide';
        emailInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    emailError.textContent = '';
    emailInput.style.borderColor = '#27ae60';
    return true;
}

// =========================================================
// VALIDATION DU MESSAGE
// =========================================================
function validateMessage() {
    const message = messageInput.value.trim();
    
    if (message === '') {
        messageError.textContent = 'Le message est obligatoire';
        messageInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    if (message.length < 10) {
        messageError.textContent = 'Le message doit contenir au moins 10 caractères';
        messageInput.style.borderColor = '#e74c3c';
        return false;
    }
    
    messageError.textContent = '';
    messageInput.style.borderColor = '#27ae60';
    return true;
}

// =========================================================
// VÉRIFIER AU MOMENT DE QUITTER LE CHAMP
// =========================================================
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
messageInput.addEventListener('blur', validateMessage);

// Réinitialiser la bordure pendant la saisie
nameInput.addEventListener('input', () => {
    if (nameError.textContent !== '') nameInput.style.borderColor = '#e8d5c4';
});

emailInput.addEventListener('input', () => {
    if (emailError.textContent !== '') emailInput.style.borderColor = '#e8d5c4';
});

messageInput.addEventListener('input', () => {
    if (messageError.textContent !== '') messageInput.style.borderColor = '#e8d5c4';
});

// =========================================================
// SOUMETTRE LE FORMULAIRE
// =========================================================
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Valider tous les champs
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    // Si tout est valide
    if (isNameValid && isEmailValid && isMessageValid) {
        console.log('Formulaire envoyé:', {
            nom: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        });
        
        // Afficher le message de confirmation
        showConfirmationMessage();
        
        // Réinitialiser le formulaire
        contactForm.reset();
        nameInput.style.borderColor = '#e8d5c4';
        emailInput.style.borderColor = '#e8d5c4';
        messageInput.style.borderColor = '#e8d5c4';
    }
});

// =========================================================
// MESSAGE DE CONFIRMATION
// =========================================================
function showConfirmationMessage() {
    const confirmationMessage = document.getElementById('confirmationMessage');
    
    confirmationMessage.classList.add('show');
    
    // Cacher après 5 secondes
    setTimeout(() => {
        confirmationMessage.classList.remove('show');
    }, 5000);
}

// =========================================================
// CARTE (OPTIONNEL)
// =========================================================
window.addEventListener('load', function() {
    const mapContainer = document.getElementById('map');
    
    if (mapContainer) {
        // Carte simple OpenStreetMap
        mapContainer.innerHTML = `
            <iframe 
                width="100%" 
                height="100%" 
                frameborder="0" 
                src="https://www.openstreetmap.org/export/embed.html?bbox=10.616900,35.815600,10.656900,35.835600&layer=mapnik&marker=35.8256,10.6369"
                style="border: none;">
            </iframe>
        `;
    }
});