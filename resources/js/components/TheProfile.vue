<script async setup>
import { onMounted, ref } from 'vue';
import { useSpotifyAuth } from '../composables/useSpotifyAuth'
import { useRefresh } from '../composables/useRefresh'

const { code, loading, error } = useSpotifyAuth()

const profileData = ref(null)

function fetchProfile() {
    let accessToken = localStorage.getItem('access_token')
    axios.get('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    }).then(response => {
        profileData.value = response.data
        return response.data
    }).catch(errors => {
        console.log(errors)
        if (errors.response.data.error.status === 401) {
            useRefresh()
        }
    })
}

onMounted(() => {
    if (!localStorage.getItem('code') && code) {
        localStorage.setItem('code', code)
    }
    fetchProfile()
})

</script>
<template>
    <div>
        {{ profileData ?? 'nope' }}
        <div>
            {{ error }}
        </div>
        <div v-if="loading">
            is loading
        </div>
    </div>
</template>
