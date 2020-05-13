export interface Todo {
  content: string;
  isChecked: boolean;
  isEditing?: boolean;
}

export const getTodoList = (date: string): Todo[] => {
  try {
    return JSON.parse(localStorage.getItem(date)) || []
  } catch {
    return []
  }
}

export const setTodoList = (date: string, todoList: Todo[]): void => {
  if (todoList.length > 0) {
    localStorage.setItem(date, JSON.stringify(todoList))
  } else {
    localStorage.removeItem(date)
  }
}