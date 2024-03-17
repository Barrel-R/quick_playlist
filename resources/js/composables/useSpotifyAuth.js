import { ref } from 'vue'

export async function useSpotifyAuth() {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    const loading = ref(false)
    const error = ref(null)
    const token = ref(localStorage.getItem('access_token'))

    async function authenticate() {
        if (!code) {
            redirectToAuthCodeFlow();
        } else {
            if (!token.value) {
                await exchangeCodeForToken(code)
            }
        }
    }

    async function redirectToAuthCodeFlow() {
        const verifier = generateCodeVerifier(128);
        const challenge = await generateCodeChallenge(verifier);

        localStorage.setItem("verifier", verifier);

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", "http://localhost:8000/callback");
        params.append("scope", "user-read-private user-read-email");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;

        return verifier
    }

    function generateCodeVerifier(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    async function generateCodeChallenge(codeVerifier) {
        const data = new TextEncoder().encode(codeVerifier);
        const digest = await window.crypto.subtle.digest('SHA-256', data);
        return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');
    }

    async function exchangeCodeForToken() {
        const verifier = localStorage.getItem('verifier') ? localStorage.getItem('verifier') : redirectToAuthCodeFlow()
        axios.post('https://accounts.spotify.com/api/token', {
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'http://localhost:8000/callback',
            client_id: clientId,
            code_verifier: verifier,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(response => {
            console.log(response.data)
            localStorage.setItem('access_token', response.data.access_token)
            token.value = response.data.access_token
            return response.data.access_token
        }).catch(errors => {
            console.log(errors)
            error.value = errors.response.data.error.message
        })
    }

    function refreshToken() {
        const refreshToken = localStorage.getItem('refresh_token')
        const url = 'https://accounts.spotify.com/api/token'

        axios.post(url, {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => {
            console.log('refresh success')
            console.log(response.data)
            localStorage.setItem('refresh_token', response.data.refresh_token)
            localStorage.setItem('access_token', response.data.access_token)
        }).catch(errors => {
            console.log('refresh error')
            console.log(errors)
        })
    }

    authenticate()

    return {
        code,
        loading,
        error,
        refreshToken
    }
}
