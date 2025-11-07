<x-guest-layout>
    <x-auth-session-status class="mb-4" :status="session('status')" />

    {{-- AÑADIDO: Título visible en el lingo-auth-contenedor --}}

    <form method="POST" action="{{ route('login') }}" class="lingo-auth-form">
        @csrf

        <div class="lingo-form-group">
            <x-input-label for="email" :value="__('Email')" />
            {{-- Clases de Tailwind eliminadas/simplificadas en los inputs --}}
            <x-text-input id="email" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div class="lingo-form-group">
            <x-input-label for="password" :value="__('Password')" />

            <x-text-input id="password"
                          type="password"
                          name="password"
                          required autocomplete="current-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <div class="lingo-remember-me">
            <label for="remember_me" class="inline-flex items-center">
                <input id="remember_me" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" name="remember">
                <span class="ms-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
            </label>
        </div>

        <div class="lingo-auth-actions">
            
            {{-- 1. ENLACE DE REGISTRO AÑADIDO/MOVIDO --}}
            @if (Route::has('register'))
                <a class="lingo-auth-link" href="{{ route('register') }}">
                    {{ __('¿No tienes cuenta? Regístrate aquí') }}
                </a>
            @endif

            {{-- 2. Enlace de Olvidó Contraseña --}}
            @if (Route::has('password.request'))
                <a class="lingo-auth-link" href="{{ route('password.request') }}">
                    {{ __('Forgot your password?') }}
                </a>
            @endif

            {{-- 3. Botón de Login --}}
            <button type="submit" class="lingo-auth-button">
                {{ __('Log in') }}
            </button>
        </div>
    </form>
</x-guest-layout>