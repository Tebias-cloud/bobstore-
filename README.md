# Bob Store: Catálogo de Productos

Bob Store es una vitrina web y catálogo de productos exclusivo integrado directamente con los servicios en la nube de **Google Firebase (BaaS)** de forma serverless.

La aplicación permite a los usuarios navegar por un catálogo dinámico y consultar detalles de productos para compras directas vía WhatsApp, mientras que expone un panel administrativo privado para la creación, edición, y eliminación de registros de inventario.

---

## 🏗️ Arquitectura y Funcionamiento

El proyecto está diseñado bajo una arquitectura estática sin dependencias de compiladores locales, cargando los módulos directamente desde CDN.

*   **Autenticación (`admin.html`):** Los administradores acceden al panel mediante credenciales procesadas por **Firebase Authentication**. La sesión se valida asíncronamente con el observador `onAuthStateChanged`.
*   **Base de Datos (`Firestore`):** Los productos se almacenan en una colección de Firestore llamada `"productos"`. Cada registro incluye el nombre, precio, descripción, arreglo de URLs de imágenes y fecha del servidor (`serverTimestamp`).
*   **Optimización de Imágenes (Canvas):** El administrador comprime las imágenes antes de subirlas al servidor empleando la API de Canvas nativa de JavaScript. Redimensiona el ancho de los archivos a un máximo de 1200px y los exporta en formato JPEG con un 75% de calidad.
*   **Almacenamiento (`Firebase Storage`):** Las imágenes optimizadas se guardan en Firebase Storage dentro de la carpeta `productos/`, generando URLs públicas que se inyectan en Firestore.

---

## ⚙️ Uso y Despliegue Local

### Requisitos Previos
*   Un servidor web local para servir los módulos ES6 (por ejemplo, Live Server en VS Code o Python simple HTTP server).

### Instrucciones de Ejecución
1.  Clona el repositorio en tu espacio de trabajo.
2.  Levanta un servidor web desde la raíz del proyecto para evitar errores de CORS con módulos locales:
    ```bash
    python -m http.server 8080
    ```
3.  Abre `http://localhost:8080` en tu navegador.

### Despliegue en Producción (Firebase Hosting)
Este proyecto está preparado para ser desplegado en Firebase Hosting empleando el archivo [firebase.json](file:///c:/Users/Esteban/Desktop/proyectosT/bobstore-/firebase.json):
1.  Instala las herramientas de Firebase CLI globales:
    ```bash
    npm install -g firebase-tools
    ```
2.  Inicia sesión y selecciona tu proyecto:
    ```bash
    firebase login
    firebase use --add
    ```
3.  Despliega la aplicación:
    ```bash
    firebase deploy
    ```

---

## 📁 Estructura del Proyecto

*   **[index.html](file:///c:/Users/Esteban/Desktop/proyectosT/bobstore-/index.html):** Página de inicio de la tienda. Carga y renderiza de forma asíncrona la lista de productos de Firestore.
*   **[product-detail.html](file:///c:/Users/Esteban/Desktop/proyectosT/bobstore-/product-detail.html):** Vista detallada del producto. Incluye la galería interactiva con cambio de miniatura y enlace directo a WhatsApp.
*   **[admin.html](file:///c:/Users/Esteban/Desktop/proyectosT/bobstore-/admin.html):** Panel administrativo. Permite autenticarse, cargar nuevas imágenes comprimidas a Storage y actualizar campos del catálogo.
*   **[js/firebase-config.js](file:///c:/Users/Esteban/Desktop/proyectosT/bobstore-/js/firebase-config.js):** Módulo de configuración de Firebase que inicializa Firestore y Storage con las credenciales del cliente.
*   **[css/style.css](file:///c:/Users/Esteban/Desktop/proyectosT/bobstore-/css/style.css):** Hoja de estilos con variables de color CSS adaptadas para interfaz en modo oscuro.

---

## 🔒 Recomendación de Seguridad Crítica

Las credenciales del SDK de Firebase en [js/firebase-config.js](file:///c:/Users/Esteban/Desktop/proyectosT/bobstore-/js/firebase-config.js#L9-L17) son públicas y visibles en el cliente. Por ello, la integridad de la base de datos depende exclusivamente de las **Reglas de Seguridad** configuradas en la consola de Firebase.

### Regla Sugerida para Firestore:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /productos/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Regla Sugerida para Firebase Storage:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /productos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
