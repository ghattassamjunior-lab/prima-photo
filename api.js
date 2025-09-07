// API Client pour le backend Flask
const API_BASE_URL = 'http://localhost:5000/api';

class PortfolioAPI {
    async getData(section) {
        try {
            const response = await fetch(`${API_BASE_URL}/data/${section}`);
            return await response.json();
        } catch (error) {
            console.error('Erreur API getData:', error);
            return {};
        }
    }

    async saveData(section, data) {
        try {
            const response = await fetch(`${API_BASE_URL}/data/${section}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            return await response.json();
        } catch (error) {
            console.error('Erreur API saveData:', error);
            return { success: false };
        }
    }

    async getPhotos() {
        try {
            const response = await fetch(`${API_BASE_URL}/photos`);
            return await response.json();
        } catch (error) {
            console.error('Erreur API getPhotos:', error);
            return [];
        }
    }

    async addPhoto(photoData) {
        try {
            const response = await fetch(`${API_BASE_URL}/photos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(photoData)
            });
            return await response.json();
        } catch (error) {
            console.error('Erreur API addPhoto:', error);
            return { success: false };
        }
    }
}

const portfolioAPI = new PortfolioAPI();