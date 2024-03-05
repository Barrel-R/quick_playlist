<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SpotifyController extends Controller
{
    public function getToken()
    {
        $response = Http::asForm()
            ->post('https://accounts.spotify.com/api/token', [
                'grant_type' => 'client_credentials',
                'client_id' => env('VITE_SPOTIFY_CLIENT_ID'),
                'client_secret' => env('SPOTIFY_CLIENT_SECRET'),
            ]);

        return $response;
    }

    public function getPlaylists(string $userId)
    {
        $token = $this->getToken();
    }

    public function getArtist(string $artistId)
    {
        $token = $this->getToken()['access_token'];

        $response = Http::withToken($token)
            ->get('https://api.spotify.com/v1/artists/' . $artistId);

        return $response->json();
    }

    public function getWeeklySongs()
    {
    }

    public function getMonthlySongs()
    {
    }

    public function getAllTimeSongs()
    {
    }
}
