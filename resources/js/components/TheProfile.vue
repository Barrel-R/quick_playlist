<script async setup>
import { onMounted } from 'vue';
import { useSpotifyAuth } from '../composables/useSpotifyAuth'

const { code, profileData, loading, error, fetchProfileData } = useSpotifyAuth()

onMounted(() => {
    if (!localStorage.getItem('code')) {
        localStorage.setItem('code', code)
    }

    fetchProfileData()
})

</script>
<template>
    <div>
        {{ profileData ?? 'nope' }}
    </div>
</template>
