import { Commands } from './../model/Commands';
import { data } from './../data';
import * as inquirer from 'inquirer';
import TodoItems from '../model/TodoItems';
import TodoCollections from '../service/TodoCollections';

class TodoConsole {
    private todoCollections: TodoCollections;

    constructor() {
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

        this.todoCollections.getTodoItems(true).forEach((item) => item.printDetails());
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
            if(answer['command'] !== Commands.Quit) {
                this.promptUser();
            }
        })
    }
}

export default TodoConsole;