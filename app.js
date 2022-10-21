const todoTemplate = document.querySelector("[data-todo]").content.cloneNode(true).children[0]
const todoList = document.querySelector("#todoList")
const todoForm = document.querySelector("#todoForm")
const userTodoInput = document.querySelector("#userTodoInput")

todoForm.addEventListener("submit",(evt)=>{
    evt.preventDefault()
    const userTodoText = userTodoInput.value
    const todoTitle = todoTemplate.querySelector("#todoTitle")
    todoTitle.textContent = userTodoText
    todoList.append(todoTemplate)
})