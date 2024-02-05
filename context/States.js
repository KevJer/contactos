import React, { useMemo, useReducer } from "react";
import { UserReducer } from "./Reducer";
import { HANLDE_INFORMATION } from "./Types";
import { UserContext } from "./Contex";


export const UserState = ({ children }) => {

    const initialValues = useMemo(
        () => ({
            user: null
        })
    );

    const hanldeInformation = React.useCallback((data) => {
        dispatch({ type: HANLDE_INFORMATION, payload: data });
    }, []);


    return (
        <UserContext.Provider
            value={{ ...state, ...{ hanldeInformation } }}>
            {children}
        </UserContext.Provider>
    );
};

