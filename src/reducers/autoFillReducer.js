import {
    GET_SECTIONS_FAIL, GET_SECTIONS_INIT, GET_SECTIONS_SUCCESS
} from "../actions";

const initialState = {
    gettingSections: false, sections: [], error: ""
};

export const autoFillReducer = ( state = initialState, action ) => {
    debugger;
    switch( action.type ){
        case GET_SECTIONS_INIT:
            return { ...state, gettingSections: true };
        case GET_SECTIONS_SUCCESS:
            return {
                ...state, sections: action.payload, gettingSections: false
            };
        case GET_SECTIONS_FAIL:
            return { ...state, gettingSections: false, error: action.payload };
        
        default:
            return state;
    }
};
