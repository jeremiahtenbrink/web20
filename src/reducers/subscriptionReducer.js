import {
    SUBSCRIBE, UNSUBSCRIBE
} from "../actions/index";

const initialState = {
    subscriptions: {}
};
export const subscriptionReducer = ( state = initialState, action ) => {
    
    switch( action.type ){
        case SUBSCRIBE:
            
            if( state.subscriptions[ action.payload.name ] ){
                const unsubscribe = state.subscriptions[ action.payload.name ];
                unsubscribe();
            }
            state.subscriptions[ action.payload.name ] = action.payload.subscription;
            return { subscriptions: { ...state.subscriptions } };
        case UNSUBSCRIBE:
            
            const unSubScribe = state.subscriptions[ action.payload ];
            if( unSubScribe ){
                unSubScribe();
            }
            delete state.subscriptions[ action.payload ];
            return {
                subscriptions: { ...state.subscriptions },
            };
        default:
            return { ...state };
    }
    
};