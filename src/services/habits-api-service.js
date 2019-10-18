import TokenService from '../services/token-service'
import config from '../config'

const HabitsApiService = {

  getHabitsList() {
    return fetch(`${config.API_ENDPOINT}/habits`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
        
      )
      
  },
  postHabit(habitTitle) {
    return fetch(`${config.API_ENDPOINT}/habits`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        habit_title: habitTitle,
        
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  updateHabit(habitTitle,percentage){
    return fetch(`${config.API_ENDPOINT}/habits`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        habit_title: habitTitle,
        percentage:percentage,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }

}

export default HabitsApiService
