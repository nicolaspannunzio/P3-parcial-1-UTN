# Food Store - Evaluación Parcial I

**Institución:** Universidad Tecnológica Nacional
**Carrera:** Tecnicatura Universitaria en Programación
**Materia:** Programación III
**Alumno:** Nicolás A. Pannunzio
**Año:** 2026

## 📝 Descripción Breve del Proyecto

Este proyecto es la evolución interactiva de la aplicación "Food Store", desarrollada como primera evaluación parcial de la cátedra. Consiste en una SPA frontend interactiva que simula un catálogo de comidas con sistema de autenticación y carrito de compras.

**Funcionalidades principales implementadas:**
- **Seguridad y Rutas:** Sistema de Login funcional con validación de credenciales estáticas y un "Guardia de Rutas" (`checkAuhtUser`) que protege el acceso al catálogo y redirige a los usuarios según su rol (`admin` o `client`).
- **Catálogo Dinámico:** Renderizado de productos desde una estructura de datos local, con buscador en tiempo real por nombre y filtrado por categorías.
- **Carrito de Compras:** Gestión completa de un carrito interactivo utilizando `localStorage` para la persistencia de datos. Permite agregar productos, sumar/restar cantidades, eliminar ítems, calcular subtotales dinámicos y vaciar la selección.

*Nota: El proyecto fue desarrollado exclusivamente con HTML5, CSS3, JavaScript y TypeScript, utilizando Vite como entorno de desarrollo, cumpliendo con la restricción de no utilizar frameworks.*

---

## 🚀 Instrucciones para ejecutarlo

Para levantar este proyecto de manera local, es necesario contar con [Node.js](https://nodejs.org/) instalado en el sistema. Se recomienda el uso de **pnpm** como gestor de paquetes.

**Paso 1: Clonar el repositorio y acceder a la carpeta**
\`\`\`bash
git clone https://github.com/nicolaspannunzio/P3-parcial-1-UTN.git
cd P3-parcial-1-UTN
\`\`\`

**Paso 2: Instalar las dependencias**
Es fundamental ejecutar este comando para reconstruir la carpeta `node_modules`.
\`\`\`bash
pnpm install
\`\`\`
*(Si no tienes pnpm instalado, puedes instalarlo previamente con `npm install -g pnpm` o utilizar `npm install`)*.

**Paso 3: Levantar el servidor de desarrollo**
\`\`\`bash
pnpm dev
\`\`\`

**Paso 4: Acceder a la aplicación**
Una vez inicializado el servidor, Vite indicará la URL local en la terminal. Abre tu navegador e ingresa a:
👉 `http://localhost:5173`

*(Para probar el sistema, puedes ingresar con las credenciales por defecto configuradas en el código base, asegurándote de seleccionar el rol "Cliente" para acceder a la vista de la tienda).*

---

## 📁 Estructura del Proyecto

```text
/
├── src/
│   ├── pages/         # Contiene las páginas de la aplicación
│   │   ├── admin/     # Páginas solo para administradores
│   │   ├── auth/      # Páginas de autenticación (login, registro)
│   │   └── store/     # Páginas de la tienda (catálogo y carrito)
│   ├── types/         # Define las interfaces y tipos (IUser, Product, etc.)
│   └── utils/         # Lógica reutilizable
│       ├── auth.ts          # Función principal de verificación de rutas
│       ├── localStorage.ts  # Funciones para leer/escribir en localStorage
│       └── navigate.ts      # Función para redirigir al usuario
├── package.json       # Dependencias y scripts
└── README.md          # Este archivo