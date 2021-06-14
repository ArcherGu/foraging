<template>
    <div
        class="plan-card"
        bg="light-200"
        border="1 rounded-3xl"
        h="full"
        w="xs sm:sm md:md lg:lg xl:xl"
        shadow="xl"
        position="relative"
    >
        <transition-group
            name="fade"
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut"
            mode="out-in"
        >
            <PlanEditor
                v-if="isEdit"
                :plan="plan"
                key="editor"
                @delete="deletePlan"
                @cancel="cancelEdit"
                @confirm="confirmEdit"
            />

            <div v-else key="viewer" h="full" w="full">
                <PlanViewer :plan="plan" @running="setRunning" />

                <PlanCardCtrl
                    v-show="!isRunning"
                    position="absolute bottom-10 -right-px"
                    @delete="deletePlan"
                    @edit="editPlan"
                />
            </div>
        </transition-group>
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

const isRunning = ref(false);
const setRunning = (v: boolean) => {
    isRunning.value = v;
}
</script>

<style>
.plan-card {
    max-width: 74ch;
    transition: all 0.3s ease-in-out;
}
</style>