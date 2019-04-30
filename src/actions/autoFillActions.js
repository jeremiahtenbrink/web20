import firebase, { store } from "../firebase/firebase";

export const GET_SECTIONS_INIT = "GET_SECTIONS_INIT";
export const GET_SECTIONS_SUCCESS = "GET_SECTIONS_SUCCESS";
export const GET_SECTIONS_FAIL = "GET_SECTIONS_FAIL";

export const getSections = () => dispatch => {
    debugger;
    dispatch( { type: GET_SECTIONS_INIT } );
    store.collection( "autoFill/web/sections" ).get().then( ( sections ) => {
            let sectionsObject = {};
            sections.forEach( section => {
                sectionsObject[ section.id ] = section.data();
            } );
            dispatch( {
                type: GET_SECTIONS_SUCCESS, payload: sectionsObject,
            } );
        } ).
        catch( err => {
            dispatch( { type: GET_SECTIONS_FAIL, payload: err } );
        } );
};