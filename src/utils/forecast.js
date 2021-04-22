const request = require('postman-request');




const forecast = (Latitude, Longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e4162cecef919d371afbcb4a1859e3fd&query=' + Latitude + ',' + Longitude + '&units=m'
    request({url, json: true}, (error, { body }) => {
    
        if(error) {
        callback('Unable to reach out and connect with Weather Services', undefined);
        }
        else if(body.error) {
        callback('Unable to find location, please double check your Input', undefined);
        }
        else {
        callback(undefined, {
            Temperature: body.current.temperature,
            Wind_Speed: body.current.wind_speed,
            Feels_Like: body.current.feelslike

        });
         
        }});
        
}


module.exports = forecast;




// const urlWeather = 'http://api.weatherstack.com/current?access_key=e4162cecef919d371afbcb4a1859e3fd&query=Jerusalem&units=m'

// request({url: urlWeather, json: true}, (error, response) => {
    
//     if(error) {
//         console.log('Unable to reach out and connect with Weather Services');
//     }
//      else if(response.body.error) {
//       console.log('Unable to find location, please double check your Input');
//     }
//     else {
//     console.log(response.body.current);
 
// }});
