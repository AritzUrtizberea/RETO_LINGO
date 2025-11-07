<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PalabraController;
use App\Http\Controllers\RankingController;



// Redirige la ruta raíz.
Route::get('/', function () {
    // Si el usuario no está autenticado, lo enviamos al login.
    if (!auth()->check()) {
        return redirect()->route('login');
    }
    // Si el usuario ya está autenticado, lo enviamos al juego.
    return redirect()->route('juego.index');
});

Route::get('/ranking', [RankingController::class, 'index'])->name('ranking.index');
Route::post('/ranking', [RankingController::class, 'store'])->name('ranking.store');

Route::get('/palabras', [PalabraController::class, 'index'])->name('palabras.index');

Route::get('/palabrasRandom/{cantidad?}', [PalabraController::class, 'indexRandom'])->name('palabras.indexRandomw');
// Mantienes la ruta /dashboard por si la necesitas, protegida
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


//Ruta que verifica si la palabra dada en la ruta existe en la tabla 'palabras' y devuelve json
Route::get('/verificarPalabra/{palabra}', [PalabraController::class, 'verificarPalabra'])
         ->middleware(['auth', 'verified'])
         ->name('palabras.verificarPalabra');

Route::middleware('auth')->group(function () {
    // Rutas de Perfil (ya existentes)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // 🎯 NUEVA RUTA DEL JUEGO LINGO
    // Esta ruta está protegida por el middleware 'auth'
    Route::get('/juego', function () {
        return view('juego'); // Carga src/resources/views/juego.blade.php
    })->name('juego.index');
    
});

require __DIR__.'/auth.php';