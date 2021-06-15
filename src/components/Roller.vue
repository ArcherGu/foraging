<template>
    <div class="roller-container" ref="roller">
        <div :class="['roller-wrapper', { 'running': isRunning }]">
            <div
                v-for="(item, index) in randomItems"
                :class="['roller-item', { 'active': index === activeIndex }]"
                w="full"
                :key="index"
                :style="`transform: rotateX(${(rotate) * index}deg) translateZ(${translateZ}px)`"
            >
                <span text="3xl" class="item-text">{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { promiseTimeout, unrefElement } from "@vueuse/core";
import type { PropType } from "vue";
import { ref, defineProps, computed, defineEmit, watch } from "vue";
import type { PlanItem } from "../types";

const props = defineProps({
    items: {
        type: Object as PropType<PlanItem[]>,
        required: true
    },
    trigger: {
        type: Date,
        required: true
    }
});
const emit = defineEmit(['finished']);

const randomItems = ref<PlanItem[]>([]);

watch(
    () => props.items,
    () => {
        if (props.items.length < 6) {
            randomItems.value = [...props.items, ...props.items];
        }
        else {
            randomItems.value = [...props.items]
        }
    },
    { immediate: true }
)

const roller = ref();
const height = ref(0);
const itemsDeg: any[] = [];
watch(
    roller,
    () => {
        const el = unrefElement(roller) as HTMLElement;
        if (!el) return;

        const rollerItemEls = Array.from(el.getElementsByClassName('roller-item'));
        if (rollerItemEls.length > 0) {
            height.value = rollerItemEls[0].clientHeight;
        }

        itemsDeg.length = 0;
        randomItems.value.forEach((item, index) => {
            itemsDeg[index] = {
                from: index === 0 ? 0 : itemsDeg[index - 1].to,
                to: index === 0 ? rotate.value : itemsDeg[index - 1].to + rotate.value,
                name: item.name
            }
        });
    }
)

const activeIndex = ref<number | null>(0);
const duration = ref(3000);
const targetDeg = ref(0);
const currentDeg = ref(0);
const rotate = computed(() => 360 / randomItems.value.length);
const translateZ = computed(() => (height.value / 2) / Math.tan((rotate.value / 2 / 180) * Math.PI));
const isRunning = ref(false);

const start = () => {
    // 取得随机角度 (预设至少跑5圈)
    let randomDeg = (Math.random() * 360) + (360 * 5)
    randomDeg -= randomDeg % rotate.value // 减去余数，避免有高低不一的情况
    targetDeg.value = randomDeg

    // 开始转动
    isRunning.value = true;
    activeIndex.value = null;
}

const stop = () => {
    // 把结束时的角度设定为当前角度
    currentDeg.value = targetDeg.value % 360;
    // 现实选中的项目(结束角度 + 单个的角度/2)
    let itemName = null
    const endDeg = (currentDeg.value > 0 ? (360 - currentDeg.value) : 0) + (rotate.value / 2)
    itemsDeg.forEach((item, index) => {
        if (endDeg >= item.from && endDeg <= item.to) {
            itemName = item.name;
            activeIndex.value = index
        }
    });

    // 转动结束
    isRunning.value = false;
    emit('finished', itemName)
}

watch(
    () => props.trigger,
    async () => {
        start();
        await promiseTimeout(duration.value + 200)
        stop();
    }
)

</script>

<style scoped>
.roller-container {
    height: 9rem;
    position: relative;
    --roller-duration: v-bind(duration + "ms");
    --roller-target-deg: v-bind(targetDeg + "deg");
    --roller-current-deg: v-bind(currentDeg + "deg");
}

.roller-container::before {
    @apply border-4 rounded-2xl;
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0px;
    z-index: 10;
}

.roller-wrapper {
    perspective: 999999px;
    position: relative;
    user-select: none;
    display: flex;
    align-items: center;
    width: calc(100% - 8px);
    margin-left: auto;
    margin-right: auto;
    transform-style: preserve-3d;
    transform: rotateX(var(--roller-current-deg));
}

.roller-wrapper .roller-item {
    @apply bg-light-200;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4rem;
    z-index: 9;
}

.roller-wrapper .roller-item .item-text {
    transition: all 0.5s ease-in-out;
}

.roller-wrapper .roller-item.active .item-text {
    @apply border-4 border-amber-400 rounded-xl px-4 bg-light-200;
    z-index: 2;
}

.roller-wrapper .roller-item.active::before {
    @apply border-t-4 border-amber-400;
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    top: calc(50% - 2px);
    left: 0px;
    z-index: 0;
}

.roller-wrapper.running {
    transition: var(--roller-duration) ease-in-out;
    transform: rotateX(var(--roller-target-deg));
}
</style>