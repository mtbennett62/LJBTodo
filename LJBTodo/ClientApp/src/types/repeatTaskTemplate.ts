import { Category } from "./category";
import { Frequency } from "./enums/frequency";
import { Priority } from "./priority";

export type RepeatTaskTemplate = {
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

    customFrequencyDays: number | undefined;
    frequency: Frequency;
    mostRecentCompletion: Date;
}