import TodoItems from "./TodoItems"

const data = [
    { id: 1, task: "장보기", complete: true },
    { id: 2, task: "TS 학습하기", complete: false },
];

console.log("My To Do List");

for (let i = 0; i < data.length; i++) {
    let items = new TodoItems(data[i].id, data[i].task, data[i].complete);
    items.printDetails();
}