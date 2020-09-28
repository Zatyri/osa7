const userReducer = (state = null, action) => {
    switch(action.type){
        case 'USER_LOGGED_IN':
            return action.data
        case 'USER_LOGGED_OUT':
            return null
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

export default userReducer