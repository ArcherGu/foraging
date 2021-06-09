<template>
    <main h="full">
        <Header />

        <Empty v-if="planList.length === 0" p="x-5" />

        <div v-else class="swiper-container" h="full" ref="mySwiper" p="y-20">
            <div class="swiper-wrapper">
                <div v-for="plan in planList" class="swiper-slide">
                    <PlanCard :plan="plan" />
                </div>
            </div>
        </div>

        <Footer @random="getRandomPlan" :isEmpty="isEmpty" />
    </main>
</template>

<script setup lang="ts">
import Swiper from 'swiper';
import { computed, ref, watch } from 'vue';
import random from 'random';
import { unrefElement, promiseTimeout } from "@vueuse/core";

// const planList = ["1", "2", "3", "4", "5", "6"];

const isEmpty = computed(() => planList.length === 0);

const planList: any[] = [];
const mySwiper = ref();
let swiper: Swiper;

watch(
    mySwiper,
    async () => {
        const el = unrefElement(mySwiper);
        if (!el) return;

        swiper = new Swiper(el, {
            loop: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 30,
            init: false
        });

        await promiseTimeout(500);
        swiper.init();
    }
)

const getRandomPlan = () => {
    if (!swiper || planList.length === 0) return;
    const randomIndex = random.int(0, planList.length - 1);
    swiper.slideTo(randomIndex, 1000);
}

</script>

<style>
</style>