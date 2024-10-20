import { Space } from "../types/space";
import { Tool } from "../types/tool";
import { SpaceAction } from "./spacesActions";

export interface SpaceState {
    spaces: Space[];
    tools: Tool[];
};

const initialState: SpaceState = {
    spaces: [],
    tools: [],
};

export const spacesReducer = (state = initialState, action: SpaceAction) => {
    switch (action.type) {
        case 'ADD_SPACE':
            return { ...state, spaces: [...state.spaces, action.space] };
        case 'DELETE_SPACE':
            return { ...state, spaces: state.spaces.filter(space => space.id !== action.spaceId) };
        case 'UPDATE_SPACE':
            return { ...state, spaces: state.spaces.map(space => space.id === action.space.id ? action.space : space) };
        case 'ADD_SUBSPACE':
            return { ...state, spaces: state.spaces.map(space => space.id === action.parentSpaceId ? { ...space, subSpaces: [...space.subSpaces, action.subSpace] } : space) };
        case 'DELETE_SUBSPACE':
            return { ...state, spaces: state.spaces.map(space => space.id === action.parentSpaceId ? { ...space, subSpaces: space.subSpaces.filter(subSpace => subSpace.id !== action.subSpaceId) } : space) };
        case 'UPDATE_SUBSPACE':
            return { ...state, spaces: state.spaces.map(space => space.id === action.parentSpaceId ? { ...space, subSpaces: space.subSpaces.map(subSpace => subSpace.id === action.subSpace.id ? action.subSpace : subSpace) } : space) };
        case 'ADD_TOOL':
            return { ...state, tools: [...state.tools, action.tool] };
        case 'DELETE_TOOL':
            return { ...state, tools: state.tools.filter(tool => tool.id !== action.toolId) };
        case 'UPDATE_TOOL':
            return { ...state, tools: state.tools.map(tool => tool.id === action.tool.id ? action.tool : tool) };
        case 'SET_SPACES':
            return { ...state, spaces: action.spaces };
        case 'SET_TOOLS':
            return { ...state, tools: action.tools };
        default:
            return state;
    }
};