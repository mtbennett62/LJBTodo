import { Category } from "./category";
import { Priority } from "./priority";

export type TodoItem = {
    id: number;
    userGuid: string;
    name: string;
    isComplete: boolean;
    dueDate: Date;
    description?: string;
    priorityId: number;
    priority?: Priority;
    escalations?: any[];
    includedUsers?: any[];
    estimatedHours?: number;
    categoryId?: number;
    category?: Category;
};
