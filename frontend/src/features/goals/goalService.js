import axios from 'axios'

const API_URL = '/api/goals/'

// Create new goals
const createGoal = async(goalData, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, goalData, config)

    // if(response.data){
    //     localStorage.setItem('goal', JSON.stringify(response.data))
    // }
    return response.data
}


// get user goals
const getGoals = async(token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    // if(response.data){
    //     localStorage.setItem('goal', JSON.stringify(response.data))
    // }
    return response.data
}

// delete user goals
const deleteGoal = async(goalId, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + goalId, config)

    // if(response.data){
    //     localStorage.setItem('goal', JSON.stringify(response.data))
    // }
    return response.data
}

const goalService = {
    createGoal,
    getGoals,
    deleteGoal
}

export default goalService