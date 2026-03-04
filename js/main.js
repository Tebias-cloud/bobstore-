import { db } from "./firebase-config.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

async function cargarCatalogo() {
    const container = document.getElementById('container-catalogo');
    if (!container) return;

    // Traemos los productos ordenados por los más nuevos
    const q = query(collection(db, "productos"), orderBy("fecha", "desc"));
    const querySnapshot = await getDocs(q);
    
    container.innerHTML = ""; // Limpiamos carga previa

    querySnapshot.forEach((doc) => {
        const p = doc.data();
        container.innerHTML += `
            <div class="product-card" data-aos="fade-up">
                <img src="${p.imagen}" alt="${p.nombre}" style="width:100%">
                <div class="overlay">
                    <h3>${p.nombre}</h3>
                    <p>${p.precio}</p>
                    <div style="display:flex; gap:10px;">
                        <a href="product-detail.html?id=${doc.id}" class="btn-wsp" style="background:#444;">Detalles</a>
                        <a href="https://wa.me/TUNUMERO?text=Hola, precio de ${p.nombre}" class="btn-wsp">WhatsApp</a>
                    </div>
                </div>
            </div>
        `;
    });
}

document.addEventListener('DOMContentLoaded', cargarCatalogo);