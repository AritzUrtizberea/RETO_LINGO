<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Lingo - Autenticación</title>

        {{-- ELIMINAMOS la carga de Tailwind/Breeze CSS por defecto --}}
        {{-- @vite(['resources/css/app.css', 'resources/js/app.js']) --}}

        {{-- ¡AÑADIDO! Tu CSS nativo para el look de Lingo --}}
        <link rel="stylesheet" href="{{ asset('css/lingo-auth.css') }}">
    </head>
    
    {{-- APLICAMOS el estilo del body definido en lingo-auth.css --}}
    <body>
        
        {{-- ELIMINAMOS las clases complejas de Tailwind y usamos una simple para tu CSS --}}
        <div class="lingo-auth-contenedor">
            
            <div class="lingo-auth-header">
                {{-- Esto cargará el application-logo.blade.php (tu logo Lingo) --}}
                <x-application-logo />
                <h1>Bienvenido a Lingo</h1>
            </div>

            {{-- El slot cargará el contenido de login.blade.php o register.blade.php --}}
            {{ $slot }}
        </div>
    </body>
</html>