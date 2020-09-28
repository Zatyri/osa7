import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
    try{
        const users = await axios.get(baseUrl)
        return users.data
    }catch(error){
        console.log(error.message);
        
    }
}

export default {getAll}