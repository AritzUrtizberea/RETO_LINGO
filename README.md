# 🎯 Lingo

Un juego de adivinanza de palabras, similar al clásico Lingo o al moderno Wordle, desarrollado como un proyecto web completo.

Lo que comenzó como un ejercicio de lógica de programación ha evolucionado a una aplicación robusta que combina un backend de **PHP (Laravel)** con un frontend dinámico usando **JavaScript, HTML/CSS, y vistas de Blade**, todo gestionado en un entorno **Docker**.

## ✨ Características del Juego

* **Palabras de 5 Letras:** El objetivo es adivinar la palabra oculta.
* **5 Intentos:** Tienes 5 filas (intentos) para acertar.
* **Partidas Ilimitadas:** Al terminar una partida (ganes o pierdas), se genera una nueva palabra aleatoria para que puedas seguir jugando.
* **Ranking:** ¡Compite por el mejor tiempo! Los jugadores más rápidos aparecen en la clasificación.

### ⚠️ Reglas Especiales

1.  **Reto de 30 Segundos:** ¡Cada fila tiene un temporizador de **30 segundos**! Si se agota el tiempo antes de enviar tu palabra, pierdes ese intento.
2.  **Diccionario Estricto:** Si la palabra que introduces no existe en el diccionario del juego, pierdes el intento automáticamente.

### 🎨 Paleta de Pistas
* 🟩 **Verde:** La letra está en la palabra y en la posición correcta.
* 🟨 **Amarillo:** La letra está en la palabra, pero en una posición incorrecta.
* 🟥 **Rojo:** La letra no se encuentra en ninguna parte de la palabra.

---

## 🛠️ Stack Tecnológico

Este proyecto está construido con las siguientes tecnologías:

* **Backend:** **PHP 8+ / Laravel Framework**, que gestiona toda la lógica de negocio, las rutas, y la API del juego.
* **Frontend:** **JavaScript** (para la lógica del juego, el temporizador y la interactividad), **HTML5**, **CSS3** y plantillas **Blade** de Laravel para renderizar las vistas.
* **Base de Datos:** **MySQL**, donde se almacenan las palabras, partidas y el ranking.
* **Gestión de BD:** **phpMyAdmin**, incluido en el entorno Docker para una fácil administración y visualización de la base de datos.
* **Entorno de Desarrollo:** **Docker** y Docker Compose.
* **Servidor Web:** **Apache** (configurado como parte del entorno Docker).

---

## 🚀 Instalación y Puesta en Marcha (Local)

Este proyecto está 100% dockerizado para una configuración rápida y aislada.

Toda la información detallada para levantar el entorno, instalar dependencias y poner en marcha el proyecto se encuentra en nuestra **documentación de Docker** dentro de este repositorio.

> **➡️ Consulta la guía de instalación completa aquí: [Montaje_docker.docx](https://github.com/AritzUrtizberea/RETO_LINGO/blob/main/docs/Montaje_docker.docx)**

A modo de resumen, el proceso de instalación implica:

1.  Configurar los archivos de entorno (`.env` y `/src/.env`) a partir de los ficheros `.example`.
2.  Usar Docker Compose para levantar todos los contenedores (Apache, PHP, MySQL, phpMyAdmin).
3.  Acceder al contenedor de la aplicación para ejecutar los comandos de instalación de Laravel (ej. `composer install`, `php artisan key:generate`, `php artisan migrate`) y de frontend (`npm install`, `npm run dev`).

---

## 📂 Estructura del Proyecto

La organización del código sigue la estructura estándar de un proyecto Laravel, con una capa de Docker por encima.
📁 RETO_LINGO/ ├── .docker/ <-- Configuración de los contenedores Docker (PHP, Apache). ├── docs/ <-- Documentación (Wireframes, Manual de Usuario, Doc. Docker). ├── src/ <-- El corazón de la aplicación Laravel. │ ├── app/ <-- Lógica (Modelos, Controladores, Servicios). │ ├── database/ <-- Migraciones y Seeders de la BD (MySQL). │ ├── public/ <-- Punto de entrada (index.php) y assets públicos. │ ├── resources/ <-- Vistas (Blade), JS (Vite) y CSS. │ ├── routes/ <-- Definición de rutas (web.php, api.php). │ └── ... ├── .gitignore <-- Ignora /vendor, /node_modules, etc. ├── docker-compose.yml <-- Orquestador de los servicios Docker. ├── Dockerfile <-- Definición del contenedor principal de la app. └── README.md <-- Este archivo.
