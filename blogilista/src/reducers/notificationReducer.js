const notificationReducer = (state = '', action) => {
    switch(action.type){
        case 'NOTIFICATION':            
            return [action.data.message]
        case 'CLEAR':
            return ''
        default:
            return state
    }
}

export const notificationAction = (content) => {
    return {
        type: 'NOTIFICATION',
        data: {
            message: content
        }
    }
}

export const clearNotificationAction = () => {
    return {
        type: 'CLEAR'
    }
}

export default notificationReducer