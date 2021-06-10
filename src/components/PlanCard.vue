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
            <span text="4xl">{{ plan?.name }}</span>
            <PlanCardCtrl position="absolute bottom-10 right-0" @delete="deletePlan" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { defineProps, defineEmit } from "vue";
import type { Plan } from "../types";
import Swal from 'sweetalert2'

const props = defineProps({
    plan: Object as PropType<Plan>,
});
const emit = defineEmit(['delete']);

const deletePlan = async () => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this Plan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    })

    if (result.isConfirmed) {
        emit('delete', props.plan?.id)
    }
}


</script>

<style>
.plan-card {
    max-width: 74ch;
    transition: all 0.3s ease-in-out;
}
</style>