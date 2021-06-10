import { ref, watch } from "vue";
import { Fn } from "@vueuse/core";
import { Plan } from "../types";
import { getLocalStorage, setLocalStorage } from "../utils/storage";

export function usePlanList(updateCallback: Fn) {
    const key = 'plan-list';
    const planList = ref(getLocalStorage<Plan[]>(key, []));

    const save = () => {
        setLocalStorage(key, planList.value);
    };

    watch(
        planList.value,
        updateCallback
    );

    return {
        planList,
        save
    };
}