// Synchronisation via URL - Fonctionne sur tous les appareils
class URLSync {
    constructor() {
        this.baseURL = window.location.origin + window.location.pathname;
    }

    // Générer une URL avec les données
    generateSyncURL() {
        const data = {
            hero: JSON.parse(localStorage.getItem('portfolioHero') || '{}'),
            about: JSON.parse(localStorage.getItem('portfolioAbout') || '{}'),
            services: JSON.parse(localStorage.getItem('portfolioServices') || '{}'),
            contact: JSON.parse(localStorage.getItem('portfolioContact') || '{}'),
            photos: JSON.parse(localStorage.getItem('portfolioPhotos') || '[]')
        };
        
        const compressed = btoa(JSON.stringify(data));
        return `${this.baseURL}?sync=${compressed}`;
    }

    // Charger les données depuis l'URL
    loadFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const syncData = urlParams.get('sync');
        
        if (syncData) {
            try {
                const data = JSON.parse(atob(syncData));
                
                // Sauvegarder localement
                if (data.hero) localStorage.setItem('portfolioHero', JSON.stringify(data.hero));
                if (data.about) localStorage.setItem('portfolioAbout', JSON.stringify(data.about));
                if (data.services) localStorage.setItem('portfolioServices', JSON.stringify(data.services));
                if (data.contact) localStorage.setItem('portfolioContact', JSON.stringify(data.contact));
                if (data.photos) localStorage.setItem('portfolioPhotos', JSON.stringify(data.photos));
                
                console.log('Données synchronisées depuis URL');
                return true;
            } catch (error) {
                console.error('Erreur décodage URL:', error);
            }
        }
        return false;
    }

    // Copier l'URL de synchronisation
    copySync() {
        const url = this.generateSyncURL();
        navigator.clipboard.writeText(url).then(() => {
            alert('URL de synchronisation copiée ! Partagez cette URL pour synchroniser vos appareils.');
        }).catch(() => {
            // Fallback pour les navigateurs plus anciens
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('URL de synchronisation copiée ! Partagez cette URL pour synchroniser vos appareils.');
        });
    }
}

const urlSync = new URLSync();