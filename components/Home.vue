<template>
  <div class="wrapper">
    <Card :date="selectedDate"
          :showAddBtn="true" />
  </div>
</template>

<script lang="ts">
import { ref, computed, getCurrentInstance } from 'vue'
import Card from './Card.vue'
export default {
  name: 'Main',
  components: {
    Card
  },
  setup(props) {
    const instance: any = getCurrentInstance()
    const ctx = instance.ctx
    const selectedDate = computed(() => ctx.$store.state.selectedDate)
    return {
      selectedDate
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
  margin: 0 auto;
}
</style>