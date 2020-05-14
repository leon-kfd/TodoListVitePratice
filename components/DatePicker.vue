<template>
  <div class="date-picker">
    <div class="calendar__date">
      <div class="calendar__head prev"
           @click="handlePrevClick">
        <svg viewBox="0 0 1024 1024"
             width="20"
             height="20">
          <path d="M754.739998 129.124869 677.034219 62.024635 266.002818 515.097548 672.169421 958.024379 749.894643 890.904703 408.017252 515.097548Z"
                p-id="4143"></path>
        </svg>
      </div>
      <div class="calendar__head content">{{labelMonth}}</div>
      <div class="calendar__head next"
           @click="handleNextClick">
        <svg viewBox="0 0 1024 1024"
             width="20"
             height="20">
          <path d="M754.739998 129.124869 677.034219 62.024635 266.002818 515.097548 672.169421 958.024379 749.894643 890.904703 408.017252 515.097548Z"
                p-id="4143"></path>
        </svg>
      </div>
      <div class="calendar__day"
           v-for="(item,index) in weekStrArr"
           :key="item + index">{{item}}</div>
      <div class="calendar__number"
           :class="{
             'not-this-month': item.month!==selectedMonth,
             'active': item.value === date,
             'tips': hasTodoListDates.includes(item.value)
            }"
           v-for="item in dayList"
           :key="item.value"
           @click="handleClickDay(item)">{{item.label}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, getCurrentInstance, onMounted, watch } from 'vue'
import moment from 'moment/dist/moment.js'
export default {
  name: 'DatePicker',
  props: {
    date: String
  },
  setup(props) {
    const instance: any = getCurrentInstance()
    const ctx = instance.ctx

    let yearAndMonth = ref('')
    watch(
      () => props.date,
      val => {
        yearAndMonth.value = moment(val).format('YYYY-MM')
      },
      {
        immediate: true
      }
    )

    const weekStrArr = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    const dayList = computed(() => {
      const monthFirstDay = moment()
        .month(moment(yearAndMonth.value).month())
        .startOf('month')
      let startIndexDay = moment()
        .week(moment(monthFirstDay).week())
        .startOf('week')
      let list = []
      for (let i = 0; i < 35; i++) {
        let label = ~~startIndexDay.format('DD')
        let value = startIndexDay.format('YYYY-MM-DD')
        let month = ~~startIndexDay.format('MM')
        list.push({ label, value, month })
        startIndexDay.add(1, 'days')
      }
      return list
    })
    const selectedMonth = computed(
      () => ~~moment(yearAndMonth.value).format('MM')
    )
    const labelMonth = computed(() =>
      moment(yearAndMonth.value).format('MMM, YYYY')
    )

    const hasTodoListDates = computed(() => ctx.$store.state.todoListDateArr)

    onMounted(() => {
      ctx.$store.commit('refreshTodoListDateArr')
    })

    const handleClickDay = item => {
      const { value, month } = item
      ctx.$store.commit('changeSelectedDate', value)
    }
    const handlePrevClick = () => {
      yearAndMonth.value = moment(yearAndMonth.value)
        .subtract(1, 'month')
        .format('YYYY-MM')
    }
    const handleNextClick = () => {
      yearAndMonth.value = moment(yearAndMonth.value)
        .add(1, 'month')
        .format('YYYY-MM')
    }
    return {
      weekStrArr,
      dayList,
      selectedMonth,
      labelMonth,
      hasTodoListDates,
      handleClickDay,
      handlePrevClick,
      handleNextClick
    }
  }
}
</script>
<style scoped lang="scss">
$main-color: #643a7a;
.calendar__date {
  display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(25px, 1fr));
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
  box-sizing: border-box;
  font-family: 'zilla slab', serif;
  .calendar__head {
    &.prev,
    &.next,
    &.content {
      cursor: pointer;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      user-select: none;
      path {
        fill: #889;
      }
    }
    &.content {
      grid-column: 2 / 7;
      cursor: default;
    }
    &.next {
      svg {
        transform: rotate(180deg);
      }
    }
  }
  .calendar__day {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    font-weight: 600;
    color: #262626;
  }
  .calendar__number {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 25px;
    color: #262626;
    cursor: pointer;
    position: relative;
    &:not(.not-this-month):hover,
    &.active {
      background-color: $main-color;
      color: #fff !important;
      font-weight: 700;
    }
    &.not-this-month {
      color: #889;
      cursor: pointer;
    }
    &.tips:after {
      content: '';
      position: absolute;
      top: 1px;
      right: 1px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: $main-color;
      box-shadow: 0 0 1px $main-color;
    }
  }
}
</style>