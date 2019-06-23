import {
    SUBSCRIBE, UNSUBSCRIBE
} from "../actions/index";
import { ISubscriptions } from "../types/SubscriptionsInterface";
import { IAction } from "../types/ActionInterface";
import Logger from '../utils/logger';

const log = Logger( "Subscription Reducers" );

const initialState: IState = {
    subscriptions: {}
};

export const subscriptionReducer = ( state: IState = initialState,
                                     action: IAction ): IState => {
    
    switch ( action.type ) {
        case SUBSCRIBE:
            log.info( action.payload.name, null,
                "Subscribe" );
            if ( state.subscriptions[ action.payload.name ] ) {
                const unsubscribe = state.subscriptions[ action.payload.name ];
                unsubscribe();
            }
            state.subscriptions[ action.payload.name ] =
                action.payload.subscription;
            return { subscriptions: { ...state.subscriptions } };
        case UNSUBSCRIBE:
            log.info( action.payload, null, "Unsubscribe" );
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
