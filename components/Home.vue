<template>
  <div class="wrapper">
    <Card v-for="(item,index) in dateArr"
          :key="item"
          :date="item"
          :showAddBtn="index === ~~(DAY_NUM / 2)"
          :class="`date${index+1}`" />
  </div>
  <button @click="handlePrev">Prev</button>
  <button @click="handleNext">Next</button>
</template>

<script lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { DateFormat, DateCompute } from '../utils/helper.ts'
import Card from './Card.vue'
export default {
  name: 'Main',
  components: {
    Card
  },
  setup() {
    const DAY_NUM = 5
    const oneDay = 24 * 60 * 60 * 1000
    let nowDate = ref(DateFormat(new Date()))
    let dateArr = computed(() => {
      const i = ~~(DAY_NUM / 2)
      let date = DateCompute(nowDate.value, 'substract', oneDay * i)
      return Array.from({ length: DAY_NUM }, (item, index) =>
        DateFormat(DateCompute(date, 'add', oneDay * index))
      )
    })
    const handlePrev = () =>
      (nowDate.value = DateFormat(
        DateCompute(nowDate.value, 'substract', oneDay)
      ))
    const handleNext = () =>
      (nowDate.value = DateFormat(DateCompute(nowDate.value, 'add', oneDay)))
    return {
      dateArr,
      handlePrev,
      handleNext,
      DAY_NUM
    }
  }
}
</script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
  max-width: 1080px;
  margin: 0 auto;
  .date1 {
    transform: scale(0.8) translateX(100%);
    z-index: 8;
  }
  .date2 {
    transform: scale(0.9) translateX(50%);
    z-index: 9;
  }
  .date3 {
    z-index: 10;
  }
  .date4 {
    transform: scale(0.9) translateX(-50%);
    z-index: 9;
  }
  .date5 {
    transform: scale(0.8) translateX(-100%);
    z-index: 8;
  }
}
</style>