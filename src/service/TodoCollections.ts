import TodoItems from "../model/TodoItems"
import { ItemCounts } from './../model/ItemCounts';

class TodoCollections {
    private nextId: number = 1

    private itemMap: Map<number, TodoItems>;

    constructor(public userName: string, public todoItems: TodoItems[] = []) {
        this.itemMap = new Map<number, TodoItems>();
        todoItems.forEach((item) => this.itemMap.set(item.id, item));
    }

    getTodoById(id: number): TodoItems | undefined {
        return this.itemMap.get(id);
    }

    addTodo(task: string): number {
        while(this.getTodoById(this.nextId)) {
            this.nextId++;
        }

        this.itemMap.set(this.nextId, new TodoItems(this.nextId, task));

        return this.nextId;
    }

    getTodoItems(includeComplete: boolean): TodoItems[] {
        return [...this.itemMap.values()].filter(
            (item) => includeComplete || !item.complete
        );
    }

    removeComplete():void {
        this.itemMap.forEach((item) => {

            if(item.complete) {
                this.itemMap.delete(item.id);
            }
        })
    }

    getItemCounts(): ItemCounts {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length
        }
    }

    markComplete(id: number, complete: boolean): void {
        const todoItems = this.getTodoById(id);

        if(todoItems) {
            todoItems.complete = complete;
        }
    }
}

export default TodoCollections;