import { Space } from "./space";

export type Tool = {
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    spaceId: number | null,
    space: Space | null,
};