import TodoItems from "./TodoItems"

class TodoCollections {
    private nextId: number = 1

    constructor(public userName: string, public todoItems: TodoItems[] = []) {}

    getTodoById(id: number): TodoItems | undefined {
        return this.todoItems.find((item) => item.id === id);
    }

    addTodo(task: string): number {
        while(this.getTodoById(this.nextId)) {
            this.nextId++;
        }

        this.todoItems.push(new TodoItems(this.nextId, task));

        return this.nextId;
    }

    markComplete(id: number, complete: boolean): void {
        const todoItems = this.getTodoById(id);

        if(todoItems) {
            todoItems.complete = complete;
        }
    }
}

export default TodoCollections;