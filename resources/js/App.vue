<script setup>
import TheNavbar from './components/TheNavbar.vue';

</script>
<template>
    <header>
        <TheNavbar />
    </header>
    <main class="min-h-screen bg-stone-800">
        <h1 class="text-xl font-bold">
            <router-view />
        </h1>
    </main>
</template>
