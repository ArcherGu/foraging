<template>
    <div
        ref="myCtrl"
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
        <button
            @click="showCtrl"
            h="full"
            position="flex"
            items="center"
            w="10"
            justify="center"
            border="rounded-1/2"
        >
            <uil-setting text="gray-400" v-show="!isCtrlShow" />
            <uil-times text="gray-400" v-show="isCtrlShow" />
        </button>

        <button
            v-show="isCtrlShow"
            @click="emit('edit')"
            h="full"
            position="flex"
            items="center"
            w="10"
            justify="center"
            border="rounded-1/2"
        >
            <uil-edit-alt text="blue-400" />
        </button>

        <button
            v-show="isCtrlShow"
            @click="emit('delete')"
            h="full"
            position="flex"
            items="center"
            w="10"
            justify="center"
            border="rounded-1/2"
        >
            <uil-trash-alt text="red-400" />
        </button>
    </div>
</template>

<script setup lang="ts">
import { promiseTimeout } from "@vueuse/core";
import { ref, defineEmit } from "vue";
const myCtrl = ref();

const isCtrlShow = ref(false)

const emit = defineEmit(['delete', 'edit']);

const showCtrl = async () => {
    isCtrlShow.value = !isCtrlShow.value;
    if (isCtrlShow.value) {
        await promiseTimeout(5000);
        isCtrlShow.value = false;
    }
}

</script>

<style>
.plan-card-ctrl {
    transition: all 0.3s ease-in-out;
}
</style>