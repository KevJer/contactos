import React, { Children, useMemo, useReducer } from "react";
import { UserReducer } from "./Reducer";
import { HANLDE_INFORMATION } from "./Types";
import { UserContext } from "./Contex";




export const UserState = ({ Children }) => {

    const initialValues = useMemo(
        () => ({
            user: null
        })
    );

    const [state, dispatch] = useReducer(UserReducer, initialValues)
    const hanldeInformation = React.useCallback((data) => {
        dispatch({ type: HANLDE_INFORMATION, payload: data });
    }, []);

    return (
        <UserContext.Provider
            value={{ ...state, ...{ hanldeInformation } }}>
            {Children}
        </UserContext.Provider>
    )
}