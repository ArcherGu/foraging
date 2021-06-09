<template>
    <div
        class="plan-card-ctrl flex"
        :w="isCtrlShow ? '30' : '10'"
        bg="light-200"
        h="10"
        border="1 rounded-l-3xl"
        shadow="sm"
        items="center"
        text="2xl"
        overflow="hidden"
    >
        <div
            @click="showCtrl"
            h="full"
            position="flex"
            items="center"
            w="10"
            justify="center"
            cursor="pointer"
            border="rounded-1/2"
        >
            <uil-setting text="gray-400" v-show="!isCtrlShow" />
            <uil-times text="gray-400" v-show="isCtrlShow" />
        </div>

        <div
            v-show="isCtrlShow"
            h="full"
            position="flex"
            items="center"
            w="10"
            justify="center"
            cursor="pointer"
            border="rounded-1/2"
        >
            <uil-edit-alt text="blue-400" />
        </div>

        <div
            v-show="isCtrlShow"
            h="full"
            position="flex"
            items="center"
            w="10"
            justify="center"
            cursor="pointer"
            border="rounded-1/2"
        >
            <uil-trash-alt text="red-400" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isCtrlShow = ref(false)

const showCtrl = () => {
    isCtrlShow.value = !isCtrlShow.value
}
</script>

<style>
.plan-card-ctrl {
    transition: all 0.3s ease-in-out;
}
</style>