import { IUser } from "./UserInterface";

export interface IAuthReducer {
    isLoading: boolean;
    gettingUser: boolean;
    getUserFailed: boolean;
    editingUser: boolean;
    uid: null | string;
    displayName: null | string;
    newUser: boolean;
    token: string;
    error: string;
    user: null | IUser;
}