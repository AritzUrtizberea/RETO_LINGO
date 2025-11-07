{{-- CAMBIO CLAVE: Usar <x-guest-layout> en lugar de <x-app-layout> para evitar la barra de navegación superior --}}
<x-guest-layout>
    {{-- Contenedor principal con espaciado vertical y centrado --}}
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            
            {{-- Tarjeta de contenido (contenedor blanco) --}}
            <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg p-6 lg:p-8">
                
                <h1 class="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
                    🏆 Ranking Estático del Juego
                </h1>

                {{-- Contenedor y Tabla --}}
                <div class="overflow-x-auto mb-8">
                    <table class="min-w-full divide-y divide-gray-200 border border-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Posición</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tiempo (segundos)</th>
                                <th scope="col" class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acierto</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            @foreach ($rankings as $index => $ranking)
                                <tr class="@if($index < 3) bg-yellow-50 font-medium @else hover:bg-gray-50 @endif">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        @if($index == 0) 🥇 @elseif($index == 1) 🥈 @elseif($index == 2) 🥉 @endif
                                        {{ $index + 1 }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $ranking->nombre }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $ranking->tiempo }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                                        @if ($ranking->acierto)
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">✅ Sí</span>
                                        @else
                                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">❌ No</span>
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                {{-- GRUPO DE BOTONES --}}
                <div class="flex space-x-4 mt-6"> 
                    
                    {{-- Botón 2: Jugar de Nuevo (Verde) --}}
                    <button><a href="{{ url('/') }}" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Jugar de Nuevo
                    </a></button>

                    {{-- Botón 3: Cerrar Sesión (Rojo) --}}
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Salir (Logout)
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-guest-layout>