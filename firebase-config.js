// Configuration Firebase simple
const firebaseConfig = {
    apiKey: "AIzaSyDemo-Key-Replace-With-Real",
    authDomain: "prima-photo.firebaseapp.com",
    databaseURL: "https://prima-photo-default-rtdb.firebaseio.com",
    projectId: "prima-photo",
    storageBucket: "prima-photo.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Simulateur Firebase simple (sans vraie config)
class SimpleDB {
    constructor() {
        this.data = {};
        this.loadFromStorage();
    }

    loadFromStorage() {
        const stored = localStorage.getItem('simpleDB');
        if (stored) {
            this.data = JSON.parse(stored);
        }
    }

    save() {
        localStorage.setItem('simpleDB', JSON.stringify(this.data));
        // Déclencher un événement pour synchroniser
        window.dispatchEvent(new CustomEvent('dataChanged', { detail: this.data }));
    }

    set(path, value) {
        this.data[path] = value;
        this.save();
    }

    get(path) {
        return this.data[path] || null;
    }

    push(path, value) {
        if (!this.data[path]) this.data[path] = [];
        this.data[path].push(value);
        this.save();
        return this.data[path].length - 1;
    }
}

const simpleDB = new SimpleDB();