import {action} from "./action";

export const SUBSCRIBE = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";

export const subscribe = (name: string, subscription: Function) => dispatch => {
    dispatch(action(SUBSCRIBE, {name, subscription}));
} ;

export const unsubscribe = (name: string) => dispatch => {
    dispatch(action(UNSUBSCRIBE, name));
};