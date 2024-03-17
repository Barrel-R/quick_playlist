<script setup>
import axios from 'axios'
import { onMounted } from 'vue';

const localURL = 'http://localhost:8000'
const triviumId = '278ZYwGhdK6QTzE3MFePnP?si=gi3zD6jOT2Cjv7KJMHjyew'

function getTrivium() {
    const url = '/api/v1/spotify/artist/' + triviumId
    const uri = `${localURL}${url}`

    axios.get(uri)
        .then(response => {
            console.log(response.data)
        })
        .catch(errors => {
            console.log(errors)
        })
}



onMounted(() => {
    getTrivium()
})

</script>
<template>
    <h1 class="text-xl font-bold">Playlists</h1>
</template>
