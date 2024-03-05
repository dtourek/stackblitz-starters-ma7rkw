import {createContext, useReducer} from "react";
import {initStore, storeReducer} from "../hooks/useStore";

export const StoreContext = createContext([])
export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(storeReducer, initStore);

    return (<StoreContext.Provider value={[state, dispatch]}>{children}</StoreContext.Provider>)
}
