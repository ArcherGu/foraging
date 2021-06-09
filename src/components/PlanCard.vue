<template>
    <div h="full">
        <div
            class="plan-card"
            bg="light-200"
            border="1 rounded-3xl"
            h="full"
            w="xs sm:sm md:md lg:lg xl:xl"
            shadow="xl"
        >
            <span text="4xl">{{ props.plan }}</span>
            <PlanCardCtrl position="absolute bottom-10 right-0" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
    plan: String
});

</script>

<style>
.plan-card {
    max-width: 74ch;
    transition: all 0.3s ease-in-out;
}
</style>