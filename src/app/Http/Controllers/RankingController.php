<?php

namespace App\Http\Controllers;

use App\Models\Ranking;
use Illuminate\Http\Request;

class RankingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rankings = Ranking::all();
        return view('rankings.index', ['rankings' => $rankings]);
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // 1. **Validación de Datos**
    $validatedData = $request->validate([
        'nombre' => 'required|string|max:255',
        'tiempo' => 'required|integer|min:0',
        'acierto' => 'required|boolean', // O 'required|in:0,1' si lo mandas como número
    ]);

    // 2. **Crear y Guardar el Registro**
    $ranking = Ranking::create($validatedData);
    
    // 3. **Responder a la Petición JS**
    // Una respuesta JSON es típica para peticiones AJAX
    return response()->json([
        'message' => 'Ranking guardado con éxito',
        'ranking' => $ranking
    ], 201); // 201 Created es el código estándar para recursos creados
}

    /**
     * Display the specified resource.
     */
    public function show(Ranking $ranking)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ranking $ranking)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ranking $ranking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ranking $ranking)
    {
        //
    }
}
