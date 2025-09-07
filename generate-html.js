// Générateur HTML pour synchronisation cross-device
function generateUpdatedHTML() {
    // Récupérer les données de l'admin
    const hero = JSON.parse(localStorage.getItem('portfolioHero')) || {};
    const about = JSON.parse(localStorage.getItem('portfolioAbout')) || {};
    const services = JSON.parse(localStorage.getItem('portfolioServices')) || {};
    const contact = JSON.parse(localStorage.getItem('portfolioContact')) || {};
    
    // Template HTML avec les nouvelles données
    const htmlTemplate = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Photographe - Prima Photo</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <script src="indexeddb.js"></script>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-brand">
            <img src="images/logo.PNG" alt="Logo" class="logo">
            <span class="brand-name">Prima Photo</span>
        </div>
        <ul class="nav-menu">
            <li><a href="#home">Accueil</a></li>
            <li><a href="#gallery">Galerie</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">À propos</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-image">
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <h1>${hero.title || 'Prima Photo Studio'}</h1>
                <p>${hero.subtitle || 'Votre moment, notre passion'}</p>
                <a href="#gallery" class="cta-btn">${hero.buttonText || 'Découvrir nos services'}</a>
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="gallery">
        <div class="container">
            <h2>Galerie</h2>
            
            <!-- Filter Tabs -->
            <div class="filter-tabs">
                <button class="filter-btn active" data-filter="all">Tout</button>
                <button class="filter-btn" data-filter="portrait">Portrait</button>
                <button class="filter-btn" data-filter="mariage">Mariage</button>
                <button class="filter-btn" data-filter="evenement">Événement</button>
                <button class="filter-btn" data-filter="nature">Nature</button>
            </div>

            <!-- Gallery Grid -->
            <div class="gallery-grid" id="galleryGrid">
                <!-- Images will be loaded here -->
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
        <div class="container">
            <h2>Services</h2>
            <div class="services-grid">
                <div class="service-card">
                    <i class="fas fa-user"></i>
                    <h3>Portraits</h3>
                    <p>${services.portrait?.description || 'Séances photo portrait en studio ou extérieur'}</p>
                    <div class="price">${services.portrait?.price || 'À partir de 150€'}</div>
                    <button class="reserve-btn" onclick="reserveService('portrait')">Réserver</button>
                </div>
                <div class="service-card">
                    <i class="fas fa-heart"></i>
                    <h3>Mariages</h3>
                    <p>${services.mariage?.description || 'Couverture complète de votre jour J'}</p>
                    <div class="price">${services.mariage?.price || 'À partir de 800€'}</div>
                    <button class="reserve-btn" onclick="reserveService('mariage')">Réserver</button>
                </div>
                <div class="service-card">
                    <i class="fas fa-calendar"></i>
                    <h3>Événements</h3>
                    <p>${services.evenement?.description || 'Reportage photo pour tous vos événements'}</p>
                    <div class="price">${services.evenement?.price || 'À partir de 300€'}</div>
                    <button class="reserve-btn" onclick="reserveService('evenement')">Réserver</button>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <h2>${about.sectionTitle || 'À propos'}</h2>
                    <p>${about.para1 || 'Passionné de photographie depuis plus de 10 ans, je capture vos moments les plus précieux avec un œil artistique et une approche professionnelle.'}</p>
                    <div class="stats">
                        <div class="stat">
                            <span class="number">${about.stats?.clients || '500'}+</span>
                            <span class="label">${about.stats?.clientsLabel || 'Clients'}</span>
                        </div>
                        <div class="stat">
                            <span class="number">${about.stats?.mariages || '100'}+</span>
                            <span class="label">${about.stats?.mariagesLabel || 'Mariages'}</span>
                        </div>
                        <div class="stat">
                            <span class="number">${about.stats?.experience || '10'}</span>
                            <span class="label">${about.stats?.experienceLabel || 'Années'}</span>
                        </div>
                    </div>
                </div>
                <div class="about-image">
                    ${about.image ? `<img src="${about.image}" alt="Photographe" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">` : '<div class="placeholder">Photo du photographe</div>'}
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2>${contact.sectionTitle || 'Contact'}</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>${contact.email || 'photo@exemple.com'}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>${contact.phone || '+33 1 23 45 67 89'}</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${contact.address || 'Paris, France'}</span>
                    </div>
                </div>
                <form class="contact-form">
                    <input type="text" placeholder="${contact.formPlaceholders?.name || 'Nom'}" required>
                    <input type="email" placeholder="${contact.formPlaceholders?.email || 'Email'}" required>
                    <textarea placeholder="${contact.formPlaceholders?.message || 'Message'}" rows="5" required></textarea>
                    <button type="submit">${contact.formPlaceholders?.button || 'Envoyer'}</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Lightbox -->
    <div class="lightbox" id="lightbox">
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="" alt="" class="lightbox-image">
            <div class="lightbox-nav">
                <button class="lightbox-prev">&#10094;</button>
                <button class="lightbox-next">&#10095;</button>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>`;

    return htmlTemplate;
}

// Fonction pour télécharger le HTML généré
function downloadGeneratedHTML() {
    const htmlContent = generateUpdatedHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Fichier index.html généré ! Remplacez le fichier sur votre serveur.');
}