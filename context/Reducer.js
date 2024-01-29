import { HANLDE_INFORMATION } from "./Types";



export const UserReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case HANLDE_INFORMATION:
            return { ...state, user: payload }
        default:
            return { ...state }
    }

}