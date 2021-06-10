<template>
    <div class="plan-viewer" h="full" w="full" p="6">
        <div text="5xl" m="10">{{ plan.name }}</div>

        <div class="swiper-container random-swiper" ref="randomSwiper" p="y-20" position="relative">
            <div class="swiper-wrapper">
                <div v-for="item in plan.item" class="swiper-slide" :key="item.name">
                    <span text="3xl">{{ item.name }}</span>
                </div>
            </div>
        </div>

        <div position="flex" items="center" justify="center" w="full" m="t-10">
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
import { defineProps, ref, computed } from "vue";
import { useSwiper } from "../composition/useSwiper";
import type { Plan } from "../types";
import { promiseTimeout } from "@vueuse/core";

const props = defineProps({
    plan: {
        type: Object as PropType<Plan>,
        required: true
    }
});

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
    }
}, (newSwiper) => {
    swiper = newSwiper;
    swiper.autoplay.stop();
});

const isRunning = ref(false);
const randomIt = async () => {
    if (isRunning.value) {
        return;
    }

    isRunning.value = true;

    swiper.autoplay.start();

    const randomTime = random.int(10, 20);

    await promiseTimeout(randomTime * 1000)

    swiper.autoplay.stop();

    isRunning.value = false;
}

</script>

<style>
</style>