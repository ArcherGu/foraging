<template>
    <div class="plan-viewer">{{ plan }}</div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { defineProps } from "vue";
import type { Plan } from "../types";

const props = defineProps({
    plan: {
        type: Object as PropType<Plan>,
        required: true
    }
});
</script>

<style>
</style>