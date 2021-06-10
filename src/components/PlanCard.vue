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
            <PlanEditor
                v-if="isEdit"
                :plan="plan"
                @delete="deletePlan"
                @cancel="cancelEdit"
                @confirm="confirmEdit"
            />

            <template v-else>
                <PlanViewer :plan="plan" />

                <PlanCardCtrl
                    position="absolute bottom-10 right-0"
                    @delete="deletePlan"
                    @edit="editPlan"
                />
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { defineProps, defineEmit, ref, watch } from "vue";
import type { Plan } from "../types";
import Swal from 'sweetalert2'

const props = defineProps({
    plan: {
        type: Object as PropType<Plan>,
        required: true
    }
});

const emit = defineEmit(['delete', 'save']);

const isEdit = ref(false);

watch(
    () => props.plan,
    () => {
        if (!props.plan?.name) {
            isEdit.value = true;
        }
    },
    { immediate: true }
)

const deletePlan = async () => {
    if (props.plan?.name) {
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
    else {
        emit('delete', props.plan?.id)
    }
}

const editPlan = () => {
    isEdit.value = true;
}

const cancelEdit = () => {
    isEdit.value = false;
}

const confirmEdit = (newPlan: Plan) => {
    emit('save', newPlan);
    isEdit.value = false;
}
</script>

<style>
.plan-card {
    max-width: 74ch;
    transition: all 0.3s ease-in-out;
}
</style>