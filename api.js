// API simple qui fonctionne immédiatement
class PortfolioAPI {
    async getData(section) {
        return simpleDB.get(section) || {};
    }

    async saveData(section, data) {
        simpleDB.set(section, data);
        return { success: true };
    }

    async getPhotos() {
        return simpleDB.get('photos') || [];
    }

    async addPhoto(photoData) {
        const photos = simpleDB.get('photos') || [];
        photoData.id = Date.now();
        photos.push(photoData);
        simpleDB.set('photos', photos);
        return { success: true };
    }
}

const portfolioAPI = new PortfolioAPI();