
export type Space = {
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    parentSpaceId: number | null,
    subSpaces: Space[],
};