<template>
    <div class="plan-viewer" h="full" w="full" p="6">
        <div h="1/4" position="flex relative" items="center" z="15" bg="light-200">
            <div text="5xl" m="r-2">
                <noto-v1-bread v-if="plan.type === 'Breakfast'" />
                <noto-v1-hamburger v-else-if="plan.type === 'Lunch'" />
                <noto-v1-curry-rice v-else-if="plan.type === 'Dinner'" />
                <noto-v1-teacup-without-handle v-else-if="plan.type === 'Afternoon Tea'" />
                <noto-v1-popcorn v-else-if="plan.type === 'Supper'" />
                <noto-v1-shortcake v-else-if="plan.type === 'Dessert'" />
                <noto-v1-shallow-pan-of-food v-else />
            </div>

            <div>
                <div text="4xl" :style="`color: ${planNameColor}`">{{ plan.name }}</div>
                <div text="md gray-400 center">{{ plan.type }}</div>
            </div>

            <div m="l-auto">
                <span text="5xl violet-400 center">{{ plan.item.length }}</span>

                <span text="lg gray-400" m="l-1">items</span>
            </div>
        </div>

        <Roller
            v-if="plan.item.length > 0"
            :trigger="trigger"
            :items="plan.item"
            @finished="handleFinished"
            p="y-20"
            position="relative"
        />

        <div
            class="random-ctrl"
            position="flex relative"
            items="center"
            justify="center"
            w="full"
            z="15"
            bg="light-200"
        >
            <button class="btn" bg="purple-500" @click="randomIt" :disabled="isRunning">
                <ph-play-bold v-show="!isRunning" />

                <uil-spinner v-show="isRunning" class="spinner" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { defineProps, defineEmit, ref, watch, computed } from "vue";
import type { Plan } from "../types";
import Swal from 'sweetalert2';

const props = defineProps({
    plan: {
        type: Object as PropType<Plan>,
        required: true
    }
});

const emit = defineEmit(['running']);

const isRunning = ref(false);
const trigger = ref(new Date());
const randomIt = () => {
    if (isRunning.value) {
        return;
    }
    trigger.value = new Date();
    isRunning.value = true;
}

const handleFinished = (name: string) => {
    isRunning.value = false;
    const chosedItem = props.plan.item.find(e => e.name === name);
    return Swal.fire({
        title: chosedItem?.name + " 🎉",
        text: props.plan.name,
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
    });
}

watch(
    isRunning,
    () => {
        emit('running', isRunning.value)
    }
)

const planNameColor = computed(() => {
    let color = "#06b6d4";
    switch (props.plan.type) {
        case 'Breakfast':
            color = "#14b8a6"
            break;
        case 'Lunch':
            color = "#eab308"
            break;
        case 'Dinner':
            color = "#ec4899"
            break;
        case 'Afternoon Tea':
            color = "#84cc16"
            break;
        case 'Supper':
            color = "#ef4444"
            break;
        case 'Dessert':
            color = "#d946ef"
            break;
        default:
            break;
    }

    return color;
});

</script>

<style>
</style>