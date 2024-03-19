<?php

use App\Http\Controllers\Api\SpotifyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::post('/spotify/refresh', [SpotifyController::class, 'refreshToken']);
    Route::get('/spotify/token', [SpotifyController::class, 'getToken']);
    Route::get('/spotify/profile', [SpotifyController::class, 'getProfile']);
    Route::get('/spotify/artist/{artistId}', [SpotifyController::class, 'getArtist']);
    Route::get('/spotify/playlists', [SpotifyController::class, 'getPlaylists']);
    Route::get('/spotify/weekly-songs', [SpotifyController::class, 'getWeeklySongs']);
    Route::get('/spotify/monthly-songs', [SpotifyController::class, 'getMonthlySongs']);
    Route::get('/spotify/all-time-songs', [SpotifyController::class, 'getAllTimeSongs']);
});
