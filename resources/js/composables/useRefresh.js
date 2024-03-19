export function useRefresh() {
    let refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken || refreshToken == 'null' || refreshToken == 'undefined') {
        let accessToken = localStorage.getItem('access_token')
        if (!accessToken || accessToken == 'null' || accessToken == 'undefined') {
            return 'Algo de errado aconteceu com o token anterior'
        } else {
            refreshToken = localStorage.getItem('access_token')
        }
    }
    axios.post('/api/v1/spotify/refresh', [
        refreshToken
    ], { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
    ).then(response => {
        localStorage.setItem('refresh_token', response.data.refresh_token)
        localStorage.setItem('access_token', response.data.access_token)
    }).catch(errors => {
        console.log(errors)
    })
}
