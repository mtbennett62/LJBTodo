import { TodoItem } from "./todo";

export type TaskSession = {
    id: number;
    startDate: Date;
    endDate: Date;
    todoItems: TodoItem[];
};