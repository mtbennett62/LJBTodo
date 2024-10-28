import { Category } from "./category";
import { Priority } from "./priority";
import { Comment } from "./comment";

export type TaskBase = {
    id: number;
    userGuid: string;
    name: string;
    description?: string;
    estimatedHours?: number;
    categoryId?: number;
    category?: Category;
    comments?: Comment[];
    priorityId: number;
    priority?: Priority;
    escalations?: any[];
};

export type TodoItem = TaskBase & {
    isComplete: boolean;
    dueDate: Date;
    includedUsers?: any[];
};
