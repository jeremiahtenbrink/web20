export interface IAuthReducer {
    isLoading: boolean,
    gettingUser: boolean,
    editingUser: boolean,
    uid: null | string,
    displayName: null | string,
    newUser: boolean,
    token: string,
    error: string,
    user: {}
}