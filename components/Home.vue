<template>
  <div class="wrapper">
    <Card v-for="(item,index) in dateArr"
          :key="item"
          :date="item"
          :class="`date${index+1}`" />
  </div>
</template>

<script lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { DateFormat } from '../utils/helper.ts'
import Card from './Card.vue'
export default {
  name: 'Main',
  components: {
    Card
  },
  setup() {
    let nowDate = ref(DateFormat(new Date()))
    let dateArr = computed(() => {
      const DAY_NUM = 5
      const i = ~~(DAY_NUM / 2) + 1
      const oneDay = 24 * 60 * 60 * 1000
      let date = new Date(nowDate.value)
      date.setTime(date.getTime() - oneDay * i)
      return Array.from({ length: DAY_NUM }, () =>
        DateFormat(new Date(date.setTime(date.getTime() + oneDay)))
      )
    })
    return {
      dateArr
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