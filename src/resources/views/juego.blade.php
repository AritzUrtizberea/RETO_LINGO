<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    {{-- AÑADIDO: Token CSRF para peticiones AJAX seguras (Paso 8) --}}
    <meta name="csrf-token" content="{{ csrf_token() }}"> 

    {{-- MODIFICADO: Usando asset() para el CSS --}}
    <link rel="stylesheet" href="{{ asset('css/Lingo.css') }}">
    <title>Lingo</title>
    
</head>
<body>

    <header>
        <div>
            <img src="{{ asset('assets/Lingo.jpg') }}"></a>
        </div>
        <h1 class="titulo">Lingo</h1>
        
        {{-- AÑADIDO: FORMULARIO DE CERRAR SESIÓN --}}
        @auth
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="logout-button">
                    Cerrar Sesión ({{ Auth::user()->name }})
                </button>
            </form>
        @endauth
        
    </header>
    <nav>
        <button title="Botón deshabilitado">Estadisticas</button>
        
        <button title="Botón deshabilitado">Idioma</button>
        <a href="{{ route('ranking.index') }}" style="text-decoration: none;">
        <button>Ver Ranking</button>
        </a>
    </nav>

    <main>
        <div id="contenedor" class = "c panelJuego">
            <h2>Panel de Juego</h2>
        </div>
        <div id="contenedorTeclado" class = "c teclaoJuego">
            <h2>Teclado</h2>
        </div>
        <div id="contenedorContador">
                <span id="tiempo">15</span>
        </div>
    </main>

    <dialog id="finPartida" data-ranking-url="{{ route('ranking.index') }}">
    <h1>Fin de partida</h1>
    <h2 id="resultado"></h2>
    <div>
        <button onclick="volverAJugar()">Volver a jugar</button>
        <button onclick="salir()">Salir</button>
        <button onclick="mostrarEstadisticas()">Estadisticas</button>
    </div>
</dialog>

    <footer>
        <div>Aritz Urtizberea</div>
        <div>Irun</div>
        <div>ikdgu@plaiaundi.net</div>
    </footer>
    
    {{-- MODIFICADO: Usando asset() para el script JS --}}
   <script>
    const RANKING_URL = "{{ route('ranking.index') }}"; 
</script>
    <script src="{{ asset('js/Lingo.js') }}"></script>
</body>
</html>