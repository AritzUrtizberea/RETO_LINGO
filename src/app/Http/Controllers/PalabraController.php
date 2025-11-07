<?php

namespace App\Http\Controllers;

use App\Models\Palabra;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
class PalabraController extends Controller
{

     public function verificarPalabra(String $palabra): JsonResponse
    {
        $existe = Palabra::where('palabra',$palabra)->exists();
               
        return response()->json(['palabra_buscada' => $palabra,'existe' => $existe]);
        //return view('palabras.verificar', ['existe' => $existe]);
    }

    

    public function indexRandom($cantidad = 1)
    {
    $palabras = Palabra::inRandomOrder()->take($cantidad)->get();
        
    return view('palabras.index', ['palabras' => $palabras ]);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $palabras = Palabra::all();
        return view('palabras.index', ['palabras' => $palabras]);
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Palabra $palabra)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Palabra $palabra)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Palabra $palabra)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Palabra $palabra)
    {
        //
    }
}
