import { MaybeElementRef, tryOnUnmounted, unrefElement } from '@vueuse/core'
import { Swiper } from 'swiper'
import { watch } from 'vue'
import { SwiperOptions } from 'swiper/types/swiper-options'

type Callback = (swiper: Swiper) => any

export function useSwiper(target: MaybeElementRef, options: SwiperOptions, initCallback?: Callback) {
  let swiper: Swiper | undefined

  watch(target as any, () => {
    const el = unrefElement(target)
    if (!el) return

    swiper = new Swiper(el as HTMLElement, options)

    initCallback && initCallback(swiper)
  }, {
    flush: 'post',
  })

  tryOnUnmounted(() => swiper?.destroy())

  return {
    swiper
  }
}