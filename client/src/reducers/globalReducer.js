import { ADD_USER } from '../settings/storeConstants';

const userReducer = (state, action) => {
    switch (action.type) {
        case ADD_USER:
            console.log(action)
            //const newState = Object.assign({}, state, { user: { name: action.name} });
            return state;
   
        default:
            return state;
    }
}

export default userReducer;