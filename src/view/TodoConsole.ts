import { Commands } from './../model/Commands';
import { data } from './../data';
import * as inquirer from 'inquirer';
import TodoItems from '../model/TodoItems';
import TodoCollections from '../service/TodoCollections';

class TodoConsole {
    private todoCollections: TodoCollections;

    private showCompleted: boolean;

    constructor() {
        this.showCompleted = true;

        const sampleTodos: TodoItems[] = data.map(
            (item) => new TodoItems(item.id, item.task, item.complete)
        );

        this.todoCollections = new TodoCollections("My To Do List", sampleTodos);
    }

    displayTodoList(): void {
        console.log(
            `=======${this.todoCollections.userName}=======` +
            `(${this.todoCollections.getItemCounts().incomplete} Items To Do)`
        )

        this.todoCollections.getTodoItems(this.showCompleted).forEach((item) => item.printDetails());
    }

    promptUser(): void {
        console.clear();
        this.displayTodoList();

        inquirer.prompt({
            type: "list",
            name: "command",
            message: "Choose option",
            choices: Object.values(Commands),
        }).then((answer) => {
            switch(answer['command']) {
                case Commands.Toggle:
                    this.showCompleted = !this.showCompleted;
                    this.promptUser();
                    break;
                case Commands.Add:
                    this.promptAdd();
                    break;
                case Commands.Purge:
                    this.todoCollections.removeComplete();
                    this.promptUser();
                    break;
                case Commands.Complete:
                    if(this.todoCollections.getItemCounts().incomplete > 0) {
                        this.promptComplete();
                    } else {
                        this.promptUser();
                    }
                    break;
            }
        })
    }

    promptAdd(): void {
        console.clear();

        inquirer.prompt({
            type: "input",
            name: "add",
            message: "Enter Task: "
        }).then((answers) => {
            if(answers["add"] !== "") {
                this.todoCollections.addTodo(answers["add"]);
            }

            this.promptUser();
        })
    }

    promptComplete(): void {
        console.clear();
        inquirer.prompt({
            type: "checkbox",
            name: "complete",
            message: "Mark Tasks Complete",
            choices: this.todoCollections.getTodoItems(this.showCompleted).map((item) => ({
                name: item.task,
                value: item.id,
                checked: item.complete
            }))
        }).then((answers) => {
            let completedTasks = answers["complete"] as number[];
            this.todoCollections.getTodoItems(true).forEach((item) => 
            this.todoCollections.markComplete(
                item.id,
                completedTasks.find((id) => id === item.id) != undefined
            ))
            this.promptUser();
        })
    }
}

export default TodoConsole;