import userService from '../services/users'

const userReducer = (state = {loggedIn: '', users: []}, action) => {
    switch(action.type){
        case 'USER_LOGGED_IN':
            return {...state, loggedIn: action.data}
        case 'USER_LOGGED_OUT':
            return {...state, loggedIn: ''}
        case 'USERS':
            console.log('iran');
            
            return {...state, users: action.data}
        default: return state
    }
}

export const userLoggedInAction = (content) => {
    return {
        type: 'USER_LOGGED_IN',
        data: content
    }
}

export const userLoggedOutAction = () => {
    return {
        type: 'USER_LOGGED_OUT'
    }
}

export const getUsersAction = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'USERS',
            data: users
        })

    }
}

export default userReducer