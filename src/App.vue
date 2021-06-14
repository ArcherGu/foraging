<template>
    <main h="full">
        <Header />

        <Empty v-if="planList.length === 0" p="x-5" />

        <div v-show="planList.length > 0" class="swiper-container main-swiper" ref="mySwiper">
            <div class="swiper-wrapper">
                <div
                    v-for="plan in planList"
                    class="swiper-slide"
                    :key="plan.id"
                    w="xs sm:sm md:md lg:lg xl:xl"
                >
                    <PlanCard :plan="plan" @delete="deletePlan" @save="savePlan" />
                </div>
            </div>
        </div>

        <Footer @random="getRandomPlan" @add="addPlan" :isEmpty="isEmpty" />
    </main>
</template>

<script setup lang="ts">
import { Swiper } from 'swiper';
import { computed, nextTick, ref, onMounted } from 'vue';
import random from 'random';
import { v4 as uuidv4 } from 'uuid';
import { usePlanList } from './composition/usePlanList';
import { useSwiper } from './composition/useSwiper';
import type { Plan } from './types';
import { promiseTimeout } from "@vueuse/core";
import { registerSW } from 'virtual:pwa-register';
onMounted(() => {
    registerSW();
});

const mySwiper = ref();
let swiper: Swiper;

useSwiper(mySwiper, {
    slidesPerView: 'auto',
    centeredSlides: true,
    mousewheel: true,
    grabCursor: true,
    updateOnWindowResize: true,
    init: false
}, async (newSwiper) => {
    await promiseTimeout(250);
    swiper = newSwiper;
    swiper.init();
});

const { planList, save } = usePlanList(async () => {
    await nextTick();
    swiper?.update();
    swiper?.slideTo(0, 1000);
});

const isEmpty = computed(() => planList.value.length === 0);

const addPlan = () => {
    planList.value.unshift({
        id: uuidv4(),
        name: "",
        type: 'Breakfast',
        item: []
    });
}

const deletePlan = (id: string) => {
    const index = planList.value.findIndex(e => e.id === id);
    if (index > -1) {
        swiper.removeSlide(index);
        planList.value.splice(index, 1);
    }

    save();
}

const savePlan = (plan: Plan) => {
    const index = planList.value.findIndex(e => e.id === plan.id);
    planList.value.splice(index, 1, plan);

    save();
}

const getRandomPlan = () => {
    if (!swiper || planList.value.length === 0) return;
    const randomIndex = random.int(0, planList.value.length - 1);
    swiper.slideTo(randomIndex, 1000);
}

</script>

<style>
</style>