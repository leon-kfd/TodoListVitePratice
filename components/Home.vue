<template>
  <div class="wrapper">
    <Card :date="selectedDate"
          :showAddBtn="true" />
  </div>
</template>

<script>
import { ref, computed, getCurrentInstance } from "vue";
// import { DateFormat } from "../utils/helper.ts";
import Card from "./Card.vue";
export default {
  name: "Main",
  components: {
    Card
  },
  setup (props, context) {
    const { ctx } = getCurrentInstance()
    const selectedDate = computed(() => ctx.$store.state.selectedDate)
    return {
      selectedDate
    };
  }
};
</script>
<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-around;
  max-width: 1080px;
  margin: 0 auto;
}
</style>