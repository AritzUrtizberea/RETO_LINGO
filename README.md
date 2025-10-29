# 🎯 Lingo

Un pequeño proyecto en desarrollo para crear un **juego de palabras tipo Lingo**.  
La idea es ir practicando lógica de programación, control de versiones con Git y GitHub,  
y mejorar poco a poco mis habilidades como desarrollador.

---

## 🚀 Objetivos del proyecto

- Practicar (**programación en JavaScript/Python**).
- Mejorar en el uso de **Git y GitHub**.
- Crear una base para un futuro **juego completo de Lingo**.

---

## 📂 Estructura inicial

/lingo-project
├── .git/                     <-- Carpeta de Git
├── .gitignore                <-- Ignora archivos (node_modules, vendor, .env)
├── README.md                 <-- Descripción general del proyecto
├── docker-compose.yml        <-- Orquestador de servicios (DAW)
│
├── backend/                  <-- Proyecto Laravel (DWES)
│   ├── app/                  <(Controladores, Modelos, etc.)
│   ├── database/             (Migraciones, Seeders)
│   ├── routes/               (api.php, web.php para autenticación)
│   ├── public/               (Punto de entrada de Laravel: index.php)
│   ├── resources/            (Vistas de Laravel, si se usan para login)
│   ├── ...                   (Resto de carpetas de Laravel)
│   └── .env.example          (Variables de entorno del backend)
│
├── frontend/                 <-- Aplicación Cliente (DIW / DWC)
│   ├── index.html            <-- Punto de entrada de la SPA
│   ├── css/
│   │   ├── main.css          (Estilos principales, Grid, Flex)
│   │   └── responsive.css    (Media queries)
│   ├── js/
│   │   ├── main.js           (Lógica principal, estado del juego)
│   │   ├── api.js            (Funciones fetch para comunicarse con el backend)
│   │   ├── auth.js           (Gestión de login/logout)
│   │   └── ui.js             (Manipulación del DOM, animaciones)
│   └── assets/
│       ├── images/           (Logos, iconos)
│       └── sounds/           (Efectos de sonido)
│
├── docker/                   <-- Configuraciones de Docker (DAW)
│   ├── nginx/
│   │   └── lingo.local.conf  <-- Config. Nginx (sirve 'frontend' y hace proxy a 'backend')
│   ├── php/
│   │   └── Dockerfile        <-- Dockerfile para el servicio de PHP-FPM
│   └── mysql/
│       └── init.sql          (Script inicial para crear la BBDD si es necesario)
│
└── docs/                     <-- Entregables de documentación (SSII, DIW)
    ├── presupuesto_servidor.pdf  (SSII)
    ├── guia_estilo.pdf           (DIW)
    ├── documentacion_tecnica.pdf (General: Wireframes, Arquitectura, Despliegue)
    ├── wireframes/               (Capturas o enlace Figma)
    └── video_resumen.mp4         (Resumen final)
