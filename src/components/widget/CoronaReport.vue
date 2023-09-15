<template>
  <div>
    <!-- start: widget content -->
    <div class="flex flex-wrap border border-grey-30 rounded p-4">
      <!-- section 1 -->
      <!-- start: widget title -->
      <div class="mb-3 lg:mb-0 lg:pb-3 lg:w-1/5 w-full lg:border-r border-grey-30">
        <h3 ref="title-widget" class="font-bold font-sans text-sm ">
          Total Kasus COVID-19 di Indonesia
        </h3>
      </div>
      <!-- end: widget title -->
      <!-- start: looping covid data items -->
      <div
        v-for="(item, key) in covid"
        :key="key"
        :class="{
          'border-l pl-4' : isEven(key+1),
          'border-b md:border-b-0' : key < 2,
          'md:border-l ' : key > 0
        }"
        class="py-2 md:py-0 w-1/2 md:w-1/4 lg:w-1/5 md:pl-6 border-grey-30"
      >
        <div class="w-full">
          <div class="flex">
            <div class="pr-2 text-xs font-bold md:text-base font-sans" :class="`${item.color}`">
              {{ item.label }}
            </div>
            <div class="pl-2 text-xs text-grey-50 font-sans">
              {{ cummulativeFormat(formatNumber(item.interval)) }}
            </div>
          </div>
          <span class="font-bold text-xl font-sans" :class="`${item.color}`">
            {{ formatNumber(item.total) }}
          </span>
        </div>
      </div>
      <!-- end: looping covid data items -->
    </div>
    <!-- end: widget content -->
    <div class="flex flex-col lg:flex-row md:flex mt-2">
      <div ref="link-berita-selengkapnya" class="w-full lg:w-1/5 pb-2">
        <a :href="`${apiHost}/label/covid-19`" class="text-xs font-bold underline text-brand-1 gtm-home-wgt-covid">
          Berita Selengkapnya
        </a>
      </div>
      <div ref="update-time" class="flex lg:justify-end items-center w-full lg:w-4/5 lg:text-right">
        <p v-if="updateTime" class="font-sans lg:inline-block lg:align-baseline lg:ml-2 text-sm">
          <span>Pembaruan per</span>
          {{ updateTime }}
          <span>| Sumber : BNPB, KawalCOVID19.id, dan pemberitaan Kompas | '+' menunjukkan jumlah penambahan kasus hari ini</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDateFormat } from '@vueuse/core'
interface ApiResult {
  "id": number,
  "Hari_Ke": number,
  "Kasus_Baru": number,
  "Jumlah_Kasus": number,
  "Dalam_Perawatan": number,
  "Sembuh": number,
  "Sembuh_Kumulatif": number,
  "Meninggal": number,
  "Meninggal_Kumulatif": number,
  "status": number,
  "modifieddate": string,
  "createddate": string,
  "tanggal": string
}
// this is `type-based declaration`
const props = defineProps<{
  data: ApiResult
}>()
console.log({data:props.data});

const apiHost = 'https://www.kompas.id'
const updateTime = useDateFormat(props.data.modifieddate ,'d MMMM YYYY HH:mm', { locales: 'id' })
const error = ref({})

// functions
const iterator = (covid:ApiResult) => {
  return [
    {
      label: 'Positif',
      color: 'text-orange-50',
      interval: covid.Kasus_Baru,
      total: covid.Jumlah_Kasus
    },
    {
      label: 'Meninggal',
      color: 'text-red-40',
      interval: covid.Meninggal,
      total: covid.Meninggal_Kumulatif
    },
    {
      label: 'Dirawat',
      color: 'text-blue-40',
      // dirawat = positif - (sembuh + meninggal )
      interval: covid.Kasus_Baru - (covid.Sembuh + covid.Meninggal),
      total: covid.Dalam_Perawatan
    },
    {
      label: 'Sembuh',
      color: 'text-green-40',
      interval: covid.Sembuh,
      total: covid.Sembuh_Kumulatif
    }
  ]
}
const isEven = (num:number) => {
  return num % 2 === 0
}
const cummulativeFormat = (num: number | string) => {
  let toNumber = typeof num === 'string' ? parseInt(num) : num;
  return Math.sign(toNumber) === -1 ? `${toNumber}` : `+ ${toNumber}`;
}

const formatNumber = (num:number) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

const covid = iterator(props.data)
</script>
