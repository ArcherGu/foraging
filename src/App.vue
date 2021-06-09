<template>
    <main h="full">
        <Header />

        <div class="swiper-container" h="full" ref="mySwiper" p="y-20">
            <div class="swiper-wrapper">
                <div v-for="plan in planList" class="swiper-slide">
                    <PlanCard :plan="plan" />
                </div>
            </div>
        </div>

        <Footer @random="getRandomPlan" />
    </main>
</template>

<script setup lang="ts">
import Swiper from 'swiper';
import { ref, watch } from 'vue';
import random from 'random';
import { unrefElement, promiseTimeout } from "@vueuse/core";

const planList = ["1", "2", "3", "4", "5", "6"];
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
    if (!swiper) return;
    const randomIndex = random.int(0, planList.length - 1);
    swiper.slideTo(randomIndex, 1000);
}

</script>

<style>
</style>