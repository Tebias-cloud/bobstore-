// js/firebase-config.js

// 1. Importamos las herramientas directamente desde la nube de Google
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// 2. Tus credenciales exclusivas de BobStore
const firebaseConfig = {
  apiKey: "AIzaSyCIX6wSVyjvb-Xzx8hnCkJi1W_PYm1JIf0",
  authDomain: "bobstore-89a30.firebaseapp.com",
  projectId: "bobstore-89a30",
  storageBucket: "bobstore-89a30.firebasestorage.app",
  messagingSenderId: "232209230774",
  appId: "1:232209230774:web:45e1d657ccc81bf4c62f17",
  measurementId: "G-SJR24NMQYC"
};

// 3. Inicializamos la app
const app = initializeApp(firebaseConfig);

// 4. Exportamos la Base de Datos y el Storage para usarlos en el resto de tu web
export const db = getFirestore(app);
export const storage = getStorage(app);