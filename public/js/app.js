const weatherForm = document.querySelector('form')
const searchValue = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const dataValue = searchValue.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    if(dataValue.length > 0){
        fetch('/weather?address='+ dataValue).then((response) => {
    response.json().then((data) => {
     if(data.Error){
       return  messageTwo.textContent = data.Error , messageOne.textContent = ''
              
               
               
     } else {
        messageOne.textContent = "You've requested the Weather Forecast for the following Location : " + data.location + 
        " - The current Temperature is : " + data.forecast.Temperature + " Celsius Degree ,the Wind Speed is : " + data.forecast.Wind_Speed + " ,the temperature Feels Like : " + data.forecast.Feels_Like + " Celsius Degree"

        
     }
   
    })
})
    }
    else {
        messageTwo.textContent = 'Please Enter an Value before Submitting'
        messageOne.textContent = ''
    }
})



