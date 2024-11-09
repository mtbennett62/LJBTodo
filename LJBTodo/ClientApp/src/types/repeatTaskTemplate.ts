import { Frequency } from "./enums/frequency";
import { TaskBase } from "./todo";

export interface RepeatTaskTemplate extends TaskBase {
    customFrequencyDays: number | undefined;
    frequency: Frequency;
    mostRecentCompletion: Date | undefined;
}