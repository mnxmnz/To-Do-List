import { data } from "./data";
import TodoItems from "./TodoItems";
import TodoCollections from "./TodoCollections";

const sampleTodos: TodoItems[] = data.map(
    (items) => new TodoItems(items.id, items.task, items.complete) 
);

const myTodoCollections = new TodoCollections("My To Do List", sampleTodos);

myTodoCollections.addTodo("React 학습하기")
myTodoCollections.addTodo("Redux 학습하기");

myTodoCollections.markComplete(3, true);

console.log(`${myTodoCollections.userName}`);

myTodoCollections.removeComplete();

myTodoCollections.getTodoItems(true).forEach((item) => item.printDetails());
console.log("==========================================")
myTodoCollections.getTodoItems(false).forEach((item) => item.printDetails());
