<template>
    <div class="plan-editor" h="full" w="full" p="6">
        <div class="form-item">
            <label class="form-item__label">Plan Name :</label>
            <div class="form-item__content">
                <div class="input">
                    <input
                        v-model="planCopy.name"
                        class="input__inner"
                        type="text"
                        autocomplete="off"
                        placeholder="Please input plan name"
                    />
                </div>
            </div>
        </div>

        <div class="form-item">
            <label class="form-item__label">Type :</label>
            <div class="form-item__content type">
                <div class="select">
                    <select v-model="planCopy.type" class="select__inner">
                        <option v-for="option in typeOptions" :value="option">{{ option }}</option>
                    </select>

                    <uil-angle-down class="select_arrow" />
                </div>
            </div>
        </div>

        <div class="form-item" h="1/2">
            <label class="form-item__label">List :</label>
            <div max="h-8/12" overflow="x-auto" ref="itemListRef">
                <div
                    class="form-item__content list"
                    v-for="(item, index) in planCopy.item"
                    :key="index"
                    position="flex"
                    items="center"
                >
                    <div w="full" position="flex">
                        <span w="6" text="left">{{ index + 1 }}.</span>
                        <div class="input">
                            <input
                                v-model="item.name"
                                class="input__inner"
                                type="text"
                                autocomplete="off"
                                placeholder="Please input item name"
                            />
                        </div>
                    </div>

                    <div w="10" position="flex" items="center" justify="center">
                        <button
                            class="btn xs-btn no-shadow"
                            bg="pink-500"
                            @click="deleteItem(index)"
                        >
                            <uil-times />
                        </button>
                    </div>
                </div>
            </div>
            <div w="full" position="flex" justify="center" m="t-3">
                <button class="btn rect-btn no-shadow" bg="teal-400" @click="addItem">
                    <mdi-plus />
                </button>
            </div>
        </div>

        <div
            position="bottom-0 left-0 right-0 flex"
            w="full"
            items="center"
            justify="center"
            m="t-10"
        >
            <button
                class="btn round-btn sm-btn no-shadow"
                bg="light-blue-400"
                m="r-5"
                @click="confirm"
            >
                <uil-check />
            </button>

            <button class="btn round-btn sm-btn no-shadow" bg="rose-500" m="l-5" @click="cancel">
                <uil-times />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Plan } from "../types";
import type { PropType } from "vue";
import { defineProps, defineEmit, watch, ref, toRaw, reactive, nextTick } from "vue";
import Swal from 'sweetalert2'
import { unrefElement } from "@vueuse/core";

const props = defineProps({
    plan: {
        type: Object as PropType<Plan>,
        required: true
    }
});

const emit = defineEmit(['delete', 'cancel', 'confirm']);

const typeOptions = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Afternoon Tea',
    'Supper',
    'Dessert',
    'Other'
]

let planCopy: Plan;
const isNew = ref(false);

watch(
    () => props.plan,
    () => {
        if (props.plan) {
            planCopy = reactive<Plan>(JSON.parse(JSON.stringify(toRaw(props.plan))));

            if (!planCopy.name) {
                isNew.value = true;
            }
        }
    },
    { immediate: true }
)

const itemListRef = ref();
const addItem = async () => {
    planCopy.item.push({
        name: ""
    });

    await nextTick()
    const el = unrefElement(itemListRef);
    if (!el) return;
    el.scrollTop = el.scrollHeight;
}

const deleteItem = (index: number) => {
    planCopy.item.splice(index, 1)
}


const itemCheck = (): string | null => {
    planCopy.item = planCopy.item.filter(e => {
        e.name = e.name.trim();
        return !!e.name
    });

    for (let i = 0; i < planCopy.item.length; i++) {
        const itemA = planCopy.item[i];
        for (let j = i + 1; j < planCopy.item.length; j++) {
            const itemB = planCopy.item[j];
            if (itemA.name === itemB.name) {
                return `There are duplicate items.[No.${i + 1} and No.${j + 1}]`;
            }
        }
    }

    if (planCopy.item.length < 3) {
        return 'Please input at least three items'
    }

    return null
}

const confirm = () => {
    if (!planCopy.name.trim()) {
        return Swal.fire({
            title: 'Error!',
            text: 'Please input plan name',
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
        });
    }

    const result = itemCheck();
    if (result) {
        return Swal.fire({
            title: 'Error!',
            text: result,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
        });
    }

    emit('confirm', toRaw(planCopy));
}

const cancel = async () => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Nothing will be saved',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, do it!',
        cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
        emit(isNew.value ? 'delete' : 'cancel');
    }
}
</script>

<style>
</style>