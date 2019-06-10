import { Action } from "../types/ActionInterface";

export const action = ( type: string, payload:any = undefined ): Action => {
    if( payload ){
        return { type, payload };
    }
    return { type };
};