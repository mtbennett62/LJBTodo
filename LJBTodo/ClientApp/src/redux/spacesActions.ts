import { Space } from "../types/space";
import { Tool } from "../types/tool";

export type SpaceAction = | { type: 'ADD_SPACE', space: Space } | { type: 'DELETE_SPACE', spaceId: number } 
| { type: 'UPDATE_SPACE', space: Space } | { type: 'ADD_SUBSPACE', parentSpaceId: number, subSpace: Space } 
| { type: 'DELETE_SUBSPACE', parentSpaceId: number, subSpaceId: number } | { type: 'UPDATE_SUBSPACE', parentSpaceId: number, subSpace: Space } 
| { type: 'ADD_TOOL', spaceId: number, tool: Tool } | { type: 'DELETE_TOOL', spaceId: number, toolId: number } 
| { type: 'UPDATE_TOOL', spaceId: number, tool: Tool } | { type: 'SET_SPACES', spaces: Space[] } | { type: 'SET_TOOLS', tools: Tool[] };

export const addSpace = (space: Space): SpaceAction => {
    return { type: 'ADD_SPACE', space };
};

export const deleteSpace = (spaceId: number): SpaceAction => {
    return { type: 'DELETE_SPACE', spaceId };
};

export const updateSpace = (space: Space): SpaceAction => {
    return { type: 'UPDATE_SPACE', space };
};

export const addSubSpace = (parentSpaceId: number, subSpace: Space): SpaceAction => {
    return { type: 'ADD_SUBSPACE', parentSpaceId, subSpace };
};

export const deleteSubSpace = (parentSpaceId: number, subSpaceId: number): SpaceAction => {
    return { type: 'DELETE_SUBSPACE', parentSpaceId, subSpaceId };
};

export const updateSubSpace = (parentSpaceId: number, subSpace: Space): SpaceAction => {
    return { type: 'UPDATE_SUBSPACE', parentSpaceId, subSpace };
};

export const addTool = (spaceId: number, tool: Tool): SpaceAction => {
    return { type: 'ADD_TOOL', spaceId, tool };
};

export const deleteTool = (spaceId: number, toolId: number): SpaceAction => {
    return { type: 'DELETE_TOOL', spaceId, toolId };
};

export const updateTool = (spaceId: number, tool: Tool): SpaceAction => {
    return { type: 'UPDATE_TOOL', spaceId, tool };
};

export const setSpaces = (spaces: Space[]): SpaceAction => {
    return { type: 'SET_SPACES', spaces };
};

export const setTools = (tools: Tool[]): SpaceAction => {
    return { type: 'SET_TOOLS', tools };
};

