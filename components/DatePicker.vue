<template>
  <div class="date-picker">
    <div class="calendar__head">
      <div></div>
    </div>
    <div class="calendar__date">
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
import { ref, computed, getCurrentInstance, onMounted } from "vue";
import moment from "moment/dist/moment.js";
export default {
  name: "DatePicker",
  props: {
    date: String
  },
  setup(props) {
    const instance: any = getCurrentInstance();
    const ctx = instance.ctx;

    const weekStrArr = ["S", "M", "T", "W", "T", "F", "S"];
    const dayList = computed(() => {
      const yearAndMonth = moment(props.date).format("YYYY-MM");
      const monthFirstDay = moment()
        .month(moment(yearAndMonth).month())
        .startOf("month");
      let startIndexDay = moment()
        .week(moment(monthFirstDay).week())
        .startOf("week");
      let list = [];
      for (let i = 0; i < 35; i++) {
        let label = ~~startIndexDay.format("DD");
        let value = startIndexDay.format("YYYY-MM-DD");
        let month = ~~startIndexDay.format("MM");
        list.push({ label, value, month });
        startIndexDay.add(1, "days");
      }
      return list;
    });
    const selectedMonth = computed(() => ~~moment(props.date).format("MM"));

    const hasTodoListDates = computed(() => ctx.$store.state.todoListDateArr);

    onMounted(() => {
      ctx.$store.commit("refreshTodoListDateArr");
    });

    const handleClickDay = item => {
      const { value, month } = item;
      if (month === selectedMonth.value) {
        ctx.$store.commit("changeSelectedDate", value);
      }
    };
    return {
      weekStrArr,
      dayList,
      selectedMonth,
      hasTodoListDates,
      handleClickDay
    };
  }
};
</script>
<style scoped lang="scss">
$main-color: #643a7a;
.calendar__date {
  display: grid;
  // grid-template-columns: repeat(auto-fit, minmax(25px, 1fr));
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 10px;
  box-sizing: border-box;
  font-family: "zilla slab", serif;
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
    }
    &.tips:after {
      content: "";
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