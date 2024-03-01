import { createRouter, createWebHistory } from "vue-router";

import TheHome from '@/components/TheHome.vue'
import TheLogin from '@/components/TheLogin.vue'
import ThePlaylists from '@/components/ThePlaylists.vue'
import WeeklySongs from '@/components/WeeklySongs.vue'
import MonthlySongs from '@/components/MonthlySongs.vue'
import AllSongs from '@/components/AllSongs.vue'

const routes = [
    { path: '/', component: TheHome },
    { path: '/login', component: TheLogin },
    { path: '/playlists', component: ThePlaylists },
    { path: '/top-songs/weekly', component: WeeklySongs },
    { path: '/top-songs/monthly', component: MonthlySongs },
    { path: '/top-songs/all', component: AllSongs },
]

export default createRouter({
    history: createWebHistory(),
    routes
})
