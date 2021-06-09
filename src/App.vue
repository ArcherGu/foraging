<template>
    <main h="full">
        <Header />

        <div class="swiper-container" h="full" ref="mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <PlanCard />
                </div>
                <div class="swiper-slide">
                    <PlanCard />
                </div>
                <div class="swiper-slide">
                    <PlanCard />
                </div>
            </div>
        </div>

        <Footer />
    </main>
</template>

<script setup lang="ts">
import Swiper from 'swiper';
import { nextTick, ref, watch } from 'vue';
import { unrefElement, promiseTimeout } from "@vueuse/core";

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

const onInit = () => {
    console.log("!2312")
}

</script>

<style>
</style>