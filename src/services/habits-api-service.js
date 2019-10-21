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

  updateHabit(habitTitle,habitId,percentArr,dateIdArr){ 
    const obj =  {
      'habit_id': habitId,
      'habit_title': habitTitle,
      'dates' : []
    };
    console.log(percentArr, dateIdArr);
    dateIdArr.forEach( (id, idx) => {
      obj.dates.push( {'date_id' : id,'percentage':parseInt(percentArr[idx])} );
    });

    console.log(JSON.stringify(obj));

    return fetch(`${config.API_ENDPOINT}/habits`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(obj)
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  deleteHabit(habitId){
    fetch(config.API_ENDPOINT + `/habits/${habitId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => 
      console.log(res.json()))
      //res.json())
  }

}

export default HabitsApiService
