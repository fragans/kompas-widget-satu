<template>
  <div v-if="show">
    <div v-if="dayLeft" class="flex flex-col lg:flex-row mb-5 overflow-hidden rounded-xl w-full">
      <div class="bg-blue-60 flex flex-col md:flex-row justify-center items-center shrink-0 py-3 px-6">
        <div class="flex flex-row items-center ">
          <div class="bg-yellow-40 h-3 w-3 lg:h-4 lg:w-4 live-pulse mr-3" />
          <span class="text-3xl lg:text-4xl font-bold text-yellow-40">
            <span class="text-white">
              {{ dayLeft }}
            </span>
            HARI
          </span>
        </div>
        <div class="border border-blue-50 h-auto md:h-10 my-3 mx-0 md:my-0 md:mx-3 w-full md:w-auto" />
        <div class="flex flex-row items-center text-white">
          <div class="flex shrink-0">
            <p class="text-sm">
              MENUJU <b>PEMILU SERENTAK</b><br>
              14 FEBRUARI 2024
            </p>
          </div>
          <div class="ml-4 lg:ml-1">
            <img src="https://d3w4qaq4xm1ncv.cloudfront.net/assets/img/logos/logo-maskot-kpu.png" width="96" height="40">
          </div>
        </div>
      </div>
      <div class="bg-blue-10 flex flex-row justify-center lg:justify-between items-center px-6 w-full">
        <div class="hidden lg:block leading-tight text-grey-60">
          Ikuti informasi terkini dan terlengkap seputar pemilu serentak 2024.
        </div>
        <button href="https://kpu.go.id" target="_blank" bold class="transition duration-300 ease-in text-brand-1 hover:text-blue-40 shrink-0">
          Kunjungi kpu.go.id
          <!-- <font-awesome-icon class="ml-3 text-xs" :icon="['fas', 'arrow-right']" /> -->
        </button>
      </div>
    </div>
  </div>
  <div v-else class="h-36 md:h-44 lg:h-20 mb-5 overflow-hidden rounded-xl w-full">
    <div class="bg-blue-40 h-full flex grow">
      <!-- <k-progress /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { isMatch } from 'date-fns'
import { differenceInDays } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

const show = ref(false)
const dayLeft = ref<number | string>(0)
let interval: ReturnType<typeof setInterval> | null = null


const generateDay =  () => {
  show.value = true
  dayLeft.value = dayCount('2024-02-14')
  
  if (typeof dayLeft.value !== 'number') return
  if (dayLeft.value <= 0) {
    clearInterval(interval!)
    dayLeft.value = 0
  }
}
const dayCount = (str:string) => {
  if (!str) {
    return -1; // Return -1 for invalid input.
  }

  if (str && !isMatch(str, 'yyyy-MM-dd HH:mm:ss') && !isMatch(str, 'yyyy-MM-dd')) {
    return -1; // Return -1 for invalid date format.
  }
  const targetDate = new Date(str)
  const getDateNow = new Date()
  return differenceInDays(targetDate, utcToZonedTime(getDateNow, 'Asia/Jakarta'))
}

onMounted(() => {
  interval = setInterval(generateDay, 1000)
})
onBeforeUnmount(() => {
  
})
</script>
<style lang="postcss" scoped>
.live-pulse{
  @apply items-center;
  @apply self-center;
  @apply inline-block;
  @apply relative;
  @apply rounded-full;
  box-shadow: 0 0 0 rgb(255 255 255);
  animation: pulse 1.5s infinite;
  animation-iteration-count:infinite; 
}

.live-pulse.red{
  @apply bg-red-50;
  @apply mr-2;
  @apply w-1;
  @apply h-1;
}

.live-pulse.red:after{
  @apply border-2;
  @apply border-red-50;
}

.live-pulse.white{
  @apply bg-white;
  @apply mr-2;
  @apply w-1;
  @apply h-1;
}

.live-pulse.white:after{
  @apply border-2;
  @apply border-white;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
    -webkit-box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
    -moz-box-shadow:0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    -webkit-box-shadow:  0 0 0 10px rgba(255, 255, 255, 0);
    -moz-box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    -webkit-box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    -moz-box-shadow:0 0 0 0 rgba(255, 255, 255, 0);
  }
}
</style>
