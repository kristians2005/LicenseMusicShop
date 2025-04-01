<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WelcomeController extends Controller
{

    public function index()
    {
        $user = auth()->user();

        return Inertia::render('Welcome', [
            'auth' => [
                'user' => $user,
                'role' => $user ? $user->role : null,
            ],
        ]);
    }

}
