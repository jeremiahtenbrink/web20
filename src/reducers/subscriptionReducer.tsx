import {
    SUBSCRIBE, UNSUBSCRIBE
} from "../actions/index";
import { ISubscriptions } from "../types/SubscriptionsInterface";
import { IAction } from "../types/ActionInterface";

const initialState: IState = {
    subscriptions: {}
};

export const subscriptionReducer = ( state: IState = initialState,
                                     action: IAction ): IState => {
    
    switch ( action.type ) {
        case SUBSCRIBE:
            console.log( "subscribing to ", action.payload.name );
            if ( state.subscriptions[ action.payload.name ] ) {
                const unsubscribe = state.subscriptions[ action.payload.name ];
                unsubscribe();
            }
            state.subscriptions[ action.payload.name ] =
                action.payload.subscription;
            return { subscriptions: { ...state.subscriptions } };
        case UNSUBSCRIBE:
            console.log( "unsubscribe from", action.payload );
            const unSubScribe = state.subscriptions[ action.payload ];
            if ( unSubScribe ) {
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

interface IState {
    subscriptions: ISubscriptions;
}
