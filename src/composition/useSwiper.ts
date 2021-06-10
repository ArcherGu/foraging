import { MaybeElementRef, tryOnUnmounted, unrefElement, useEventListener } from '@vueuse/core';
import Swiper from 'swiper';
import type { SwiperOptions } from 'swiper';
import { watch } from 'vue';

type Callback = (swiper: Swiper) => any;

export function useSwiper(target: MaybeElementRef, options: SwiperOptions, initCallback?: Callback) {
    let swiper: Swiper | undefined;

    watch(target as any, () => {
        const el = unrefElement(target);
        if (!el) return;

        swiper = new Swiper(el, options);

        initCallback && initCallback(swiper);
    }, {
        flush: 'post',
    });

    tryOnUnmounted(() => swiper?.destroy());

    useEventListener('resize', () => swiper?.update());

    return {
        swiper
    };
}