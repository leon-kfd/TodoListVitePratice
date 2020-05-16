<template>
  <div class="todo-list-card">
    <div class="head">
      <div class="title"
           @click="showDatePicker = !showDatePicker">{{weekDay}}</div>
      <div class="subtitle"
           @click="showDatePicker = !showDatePicker">{{formatterDate}}</div>
      <div class="picker"
           :class="{active: showDatePicker}">
        <DatePicker :date="date" />
      </div>
    </div>
    <ul class="list">
      <li class="list-item"
          v-for="(item,index) in todoList"
          :key="item.content+index">
        <input type="checkbox"
               name="todo"
               :checked="item.isChecked" />
        <div class="text"
             v-if="!item.isEditing"
             @click="handleChecked(item)">{{item.content}}</div>
        <input type="text"
               class="edit"
               v-focus
               v-else
               :value="editingValue"
               @blur="handleEditSubmit($event, item,index)"
               @keyup.enter="handleEditSubmit($event,item,index)" />
        <div class="button"
             @click="handleChecked(item)"></div>
        <div class="close"
             @click="handleRemove(index)">
          <svg viewBox="0 0 1024 1024"
               width="20"
               height="20">
            <path d="M510.8096 420.3008l335.296-335.296 90.5088 90.5088-335.296 335.296 335.296 335.296-90.5088 90.5088-335.296-335.296-335.296 335.296-90.5088-90.5088 335.296-335.296-335.296-335.296 90.5088-90.5088z"></path>
          </svg>
        </div>
        <div class="wrapper">
          <svg viewBox="0 0 98.5 98.5"
               width="20"
               height="20">
            <path class="checkmark"
                  fill="none"
                  stroke-width="8"
                  stroke-miterlimit="10"
                  d="M81.7,17.8C73.5,9.3,62,4,49.2,4
          C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3" />
          </svg>
        </div>
      </li>
    </ul>
    <div class="add"
         v-if="showAddBtn"
         @click="handleAdd">
      <svg viewBox="0 0 1024 1024"
           width="20"
           height="20">
        <path d="M510.8096 420.3008l335.296-335.296 90.5088 90.5088-335.296 335.296 335.296 335.296-90.5088 90.5088-335.296-335.296-335.296 335.296-90.5088-90.5088 335.296-335.296-335.296-335.296 90.5088-90.5088z"></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { Todo, getTodoList, setTodoList } from '../model/todo'
import DatePicker from './DatePicker.vue'
const weekArr: string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Firday',
  'Saturday'
]
export default {
  name: 'Card',
  components: {
    DatePicker
  },
  directives: {
    focus(el) {
      if (document.activeElement !== el) {
        el.focus()
      }
    }
  },
  props: {
    date: String,
    showAddBtn: Boolean
  },
  setup(props) {
    const store = useStore()

    const state = {
      editingValue: ref(''),
      showDatePicker: ref(false)
    }

    let todoList = reactive([])
    watch(
      () => props.date,
      val => {
        todoList.length = 0
        todoList.push(...getTodoList(props.date))
        // state.showDatePicker.value = false
      },
      {
        immediate: true
      }
    )

    const weekDay = computed(() => weekArr[new Date(props.date).getDay()])
    const formatterDate = computed((): string => {
      const arr: string[] = new Date(props.date).toDateString().split(' ')
      return `${arr[1]} ${arr[2]}, ${arr[3]}`
    })
    const handleChecked = (item: Todo): void => {
      item.isChecked = !item.isChecked
      setTodoList(props.date, todoList)
      store.commit('refreshTodoListDateArr')
    }
    const handleRemove = (index: number): void => {
      todoList.splice(index, 1)
      setTodoList(props.date, todoList)
      store.commit('refreshTodoListDateArr')
    }
    const handleAdd = (): void => {
      state.editingValue.value = ''
      todoList.push({
        content: '',
        isChecked: false,
        isEditing: true
      })
    }
    const handleEditSubmit = ($event: any, item: Todo, index: number): void => {
      if (item.isEditing) {
        if ($event.currentTarget.value) {
          item.content = state.editingValue.value = $event.currentTarget.value
          item.isEditing = false
        } else {
          todoList.splice(index, 1)
        }
        setTodoList(props.date, todoList)
        store.commit('refreshTodoListDateArr')
      }
    }
    return {
      weekDay,
      formatterDate,
      todoList,
      handleChecked,
      handleRemove,
      handleAdd,
      handleEditSubmit,
      ...state
    }
  }
}
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css?family=Fredericka+the+Great|Zilla+Slab:300,400');
$white: #fff;
$main-color: #643a7a;
.todo-list-card {
  width: 350px;
  height: 600px;
  border-radius: 4px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.6);
  margin: 20px auto;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  background: #fff;
  .head {
    padding: 20px 0 0;
    margin: 0 30px;
    // border-bottom: 1px solid rgba($main-color, 0.5);
    user-select: none;
    .title {
      font-family: 'fredericka the great', cursive;
      font-weight: 500;
      text-align: center;
      font-size: 2.5rem;
      color: rgba(rgba($main-color, 0.5), 0.8);
      height: 3.2rem;
      line-height: 3.2rem;
      cursor: pointer;
    }
    .subtitle {
      font-family: 'zilla slab', serif;
      height: 1.2rem;
      line-height: 1.2rem;
      font-size: 0.9rem;
      text-align: center;
      letter-spacing: 0.5px;
      cursor: pointer;
    }
    .picker {
      margin-top: 20px;
      padding-top: 15px;
      border-top: 1px solid rgba($main-color, 0.5);
      height: 0;
      max-height: 0;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.38, -0.21, 1, 2.33);
      &.active {
        max-height: 270px;
        height: 100%;
        padding-bottom: 15px;
        border-bottom: 1px solid rgba($main-color, 0.5);
        transition: all 0.4s cubic-bezier(0.38, -0.21, 1, 2.33);
      }
    }
  }
  .list {
    list-style: none;
    padding: 4px 0 10px 40px;
    margin-bottom: 30px;
    font-weight: 300;
    overflow-y: auto;
    height: 100%;
    flex: 1;
    .list-item {
      position: relative;
      display: flex;
      flex-wrap: nowrap;
      margin: 24px 0;
      padding-right: 40px;
      .text {
        flex: 1;
        width: 100%;
        font-size: 1rem;
        color: $main-color;
        font-weight: 500;
        cursor: pointer;
        transition: color 0.3s ease-in-out;
        user-select: none;
        padding-right: 5px;
      }
      .edit {
        flex: 1;
        width: 100%;
        margin-right: 12px;
        height: 20px;
        font-size: 16px;
        outline: none;
        border: none;
        box-shadow: 0 1px 0 rgba($main-color, 0.35);
        color: $main-color;
      }
      .button {
        position: relative;
        z-index: 2;
        box-sizing: border-box;
        width: 20px;
        height: 20px;
        border: 1px solid fade-out($main-color, 0.5);
        border-radius: 50%;
        cursor: pointer;
      }
      .close {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 10px;
        opacity: 0;
        display: none;
        cursor: pointer;
        path {
          fill: rgba(rgba($main-color, 0.5), 0.35);
        }
        &:hover {
          path {
            fill: rgba(rgba($main-color, 0.5), 0.65);
          }
        }
      }
      &:hover {
        .close {
          display: block;
          animation: closeFadeIn 0.4s forwards;
        }
      }
      .checkmark {
        position: absolute;
        stroke: rgba($main-color, 0.5);
        fill: none;
        stroke-dashoffset: 340;
        stroke-dasharray: 360;
        display: block;
        stroke-width: 8;
        opacity: 0;
      }
      input[type='checkbox'] {
        display: none;
      }
      .wrapper {
        position: absolute;
        width: 20px;
        height: 20px;
        right: 40px;
      }
      input:checked ~ {
        .text {
          color: rgba($main-color, 0.5);
          text-decoration: line-through;
        }
        .wrapper .checkmark {
          animation: dash 0.5s ease-out forwards;
          opacity: 1;
        }
        .button {
          opacity: 0;
        }
      }
    }
  }
  .add {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0 0 10px $main-color;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 50%);
    background: $main-color;
    transition: box-shadow 0.4s ease-in-out;
    z-index: 9999;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-around;
    svg {
      transform: rotate(45deg);
      path {
        fill: #f0f0f0;
      }
    }
    &:hover {
      box-shadow: 0 0 20px $main-color;
      transition: box-shadow 0.4s ease-in-out;
    }
  }
}
@keyframes dash {
  0% {
    stroke-dashoffset: 340;
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes closeFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@media screen and (max-width: 400px) {
  .todo-list-card {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.6);
    margin: 0;
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    background: #fff;
    .add {
      transform: translate(-50%, -10px);
    }
    .list {
      margin-bottom: 60px;
      .list-item {
        .close {
          display: block;
          animation: closeFadeIn 0.4s forwards;
        }
      }
    }
  }
}
</style>