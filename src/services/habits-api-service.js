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
      .catch(error=>{
        console.error({error})
      })
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
      .catch(error=>{
        console.error({error})
      })
  },

  updateHabit(habitTitle,habitId,percentArr,dateIdArr,dates){ 
    const obj =  {
      'habit_id': habitId,
      'habit_title': habitTitle,
      'dates' : []
    };
    
    dateIdArr.forEach( (id, idx) => {
      obj.dates.push( {'date_id' : id,'percentage':parseInt(percentArr[idx]),'date_added':dates[idx]} );
    });

    

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
      .catch(error=>{
        console.error({error})
      })
  },

  deleteHabit(habitId){
    return fetch(config.API_ENDPOINT + `/habits/${habitId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
  )
  .catch(error=>{
    console.error({error})
  }) 
   
  

}
}

export default HabitsApiService;
