// IndexedDB Manager pour Portfolio
class PortfolioDB {
    constructor() {
        this.dbName = 'PortfolioDB';
        this.version = 1;
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Store pour les images
                if (!db.objectStoreNames.contains('images')) {
                    db.createObjectStore('images', { keyPath: 'id' });
                }
                
                // Store pour les données
                if (!db.objectStoreNames.contains('data')) {
                    db.createObjectStore('data', { keyPath: 'key' });
                }
            };
        });
    }

    async saveImage(id, file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const transaction = this.db.transaction(['images'], 'readwrite');
                const store = transaction.objectStore('images');
                
                const imageData = {
                    id: id,
                    data: reader.result,
                    type: file.type,
                    size: file.size,
                    name: file.name,
                    timestamp: Date.now()
                };
                
                const request = store.put(imageData);
                request.onsuccess = () => resolve(imageData);
                request.onerror = () => reject(request.error);
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsDataURL(file);
        });
    }

    async getImage(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['images'], 'readonly');
            const store = transaction.objectStore('images');
            const request = store.get(id);
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async saveData(key, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['data'], 'readwrite');
            const store = transaction.objectStore('data');
            
            const dataObj = {
                key: key,
                value: data,
                timestamp: Date.now()
            };
            
            const request = store.put(dataObj);
            request.onsuccess = () => resolve(dataObj);
            request.onerror = () => reject(request.error);
        });
    }

    async getData(key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['data'], 'readonly');
            const store = transaction.objectStore('data');
            const request = store.get(key);
            
            request.onsuccess = () => {
                const result = request.result;
                resolve(result ? result.value : null);
            };
            request.onerror = () => reject(request.error);
        });
    }

    async deleteImage(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['images'], 'readwrite');
            const store = transaction.objectStore('images');
            const request = store.delete(id);
            
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }
}

// Instance globale
const portfolioDB = new PortfolioDB();