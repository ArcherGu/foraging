<template>
    <div class="plan-viewer" h="full" w="full" p="6">
        <div h="1/4" position="flex" items="center">
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

        <div class="swiper-container random-swiper" ref="randomSwiper" p="y-20" position="relative">
            <div class="swiper-wrapper">
                <div v-for="item in plan.item" class="swiper-slide" :key="item.name">
                    <span text="3xl">{{ item.name }}</span>
                </div>
            </div>
        </div>

        <div class="random-ctrl" position="flex" items="center" justify="center" w="full">
            <button class="btn" bg="purple-500" @click="randomIt" :disabled="isRunning">
                <ph-play-bold v-show="!isRunning" />

                <uil-spinner v-show="isRunning" class="spinner" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import random from "random";
import { Swiper } from "swiper";
import type { PropType } from "vue";
import { defineProps, defineEmit, ref, watch, computed } from "vue";
import { useSwiper } from "../composition/useSwiper";
import type { Plan } from "../types";
import { promiseTimeout } from "@vueuse/core";
import Swal from 'sweetalert2';

const props = defineProps({
    plan: {
        type: Object as PropType<Plan>,
        required: true
    }
});

const emit = defineEmit(['running'])

const randomSwiper = ref();
let swiper: Swiper;
useSwiper(randomSwiper, {
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    direction: 'vertical',
    allowTouchMove: false,
    autoplay: {
        delay: 50,
        disableOnInteraction: false,
    },
    init: false
}, async (newSwiper) => {
    await promiseTimeout(500);
    swiper = newSwiper;
    swiper.init();
    swiper.autoplay.stop();
});

const isRunning = ref(false);
const randomIt = async () => {
    if (isRunning.value) {
        return;
    }

    isRunning.value = true;

    swiper.autoplay.start();

    const randomTime = random.int(5, 10);

    await promiseTimeout(randomTime * 1000)

    swiper.autoplay.stop();

    isRunning.value = false;

    const index = swiper.activeIndex % props.plan.item.length;
    const chosedItem = props.plan.item[index];

    return Swal.fire({
        title: chosedItem.name + " 🎉",
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