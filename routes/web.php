<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\WelcomeController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');


//all guests and auth can access this route
Route::get('/songs', [SongController::class, 'index'])->name('songs.index');

Route::get('/license', function () {
    return Inertia::render('Info/License');
})->name('License');
Route::get('/about', function () {
    return Inertia::render('Info/About');
})->name('About');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');



    Route::middleware(RoleMiddleware::class . ':artist,admin')->group(function () {

        //song create, edit, update, destroy
        Route::get('/songs/create', [SongController::class, 'create'])->name('songs.create');
        Route::post('/songs/create/store', [SongController::class, 'store'])->name('songs.store');
        Route::get('/songs/{song}/edit', [SongController::class, 'edit'])->name('songs.edit');
        Route::patch('/songs/{song}/update', [SongController::class, 'update'])->name('songs.update');
        Route::delete('/songs/{song}/destroy', [SongController::class, 'destroy'])->name('songs.destroy');
    });

    Route::middleware(RoleMiddleware::class . ':admin')->group(function () {

    });


});

require __DIR__ . '/auth.php';
