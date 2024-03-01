<script setup>
import { ref } from "vue";
import Menubar from "primevue/menubar";
import Dropdown from "primevue/dropdown";
import { useRouter } from "vue-router";

const router = useRouter()

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        href: '/'
    },
    {
        label: 'Playlists',
        href: '/playlists',
    },
    {
        label: 'Top Songs',
        icon: 'pi pi-list',
        items: [
            {
                label: 'Weekly',
                icon: 'pi pi-bolt',
                href: '/top-songs/weekly'
            },
            {
                label: 'Monthly',
                icon: 'pi pi-calendar',
                href: '/top-songs/monthly'
            },
            {
                label: 'All Time',
                icon: 'pi pi-clock',
                href: '/top-songs/all'
            },
        ]
    },
]);

</script>

<template>
    <div class="w-full flex bg-gray-600 items-center justify-between">
        <Menubar class="rounded-none bg-gray-600" :model="items">
            <template #item="{ item, props, hasSubmenu, root }">
                <a @click="!hasSubmenu ? router.push(item.href) : ''" class="flex items-center" v-bind="props.action">
                    <span :class="item.icon" />
                    <span v-if="item.label === 'Playlists'">
                        <svg class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 8 8"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8 0c-5 0-6 1-6 1v4.09c-.15-.05-.33-.09-.5-.09-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5v-3.97c.73-.23 1.99-.44 4-.5v2.06c-.15-.05-.33-.09-.5-.09-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5v-5.5z">
                            </path>
                        </svg>
                    </span>
                    <span class="ms-2">{{ item.label }}</span>
                    <i v-if="hasSubmenu"
                        :class="['pi pi-angle-down', { 'pi-angle-down ms-2': root, 'pi-angle-right ms-auto': !root }]">
                    </i>
                </a>
            </template>
        </Menubar>
        <div>
            <Dropdown placeholder="user" class="me-5 bg-gray-600">
            </Dropdown>
        </div>
    </div>
</template>
