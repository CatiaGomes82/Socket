import { ADD_USER } from '../settings/storeConstants';

export const addCurrentUser = (value) => ({
    type: ADD_USER,
    value
});