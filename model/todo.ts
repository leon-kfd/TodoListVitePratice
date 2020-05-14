export interface Todo {
  content: string;
  isChecked: boolean;
  isEditing?: boolean;
}

export const getTodoList = (date: string): Todo[] => {
  try {
    const todoListMap = JSON.parse(localStorage.getItem('_todoList')) || {}
    return todoListMap[date] || []
  } catch {
    return []
  }
}

export const setTodoList = (date: string, todoList: Todo[]): void => {
  let todoListMap = JSON.parse(localStorage.getItem('_todoList')) || {}
  if (todoList.length > 0) {
    todoListMap[date] = todoList
    localStorage.setItem('_todoList', JSON.stringify(todoListMap))
  } else {
    delete todoListMap[date]
    localStorage.setItem('_todoList', JSON.stringify(todoListMap))
  }
}