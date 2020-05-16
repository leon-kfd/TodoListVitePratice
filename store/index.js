import Vuex from 'vuex'
import moment from "../utils/moment.js";

export default Vuex.createStore({
  state: {
    selectedDate: moment().format("YYYY-MM-DD"),
    todoListDateArr: []
  },
  mutations: {
    changeSelectedDate (state, date) {
      state.selectedDate = date
    },
    refreshTodoListDateArr (state) {
      let todoListMap = JSON.parse(localStorage.getItem('_todoList')) || {}
      state.todoListDateArr = Object.keys(todoListMap).filter(
        key => todoListMap[key].length > 0
      )
    }
  },
  actions: {
  },
  modules: {
  }
})