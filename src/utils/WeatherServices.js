const request = require('request');

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=321d51ce5d8b2dd6cb9f260779b8f7b1&query='+latitude+','+longitude;
    console.log(url);
    request({url, json: true},(error, {body}={}) =>{
        if(error) {
            callback('Unable to connect to weather services!',undefined);
        }else if(body.error){
            callback('Unable to find location!',undefined);
        }else{
            callback(undefined,{
                weatherdes: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                precip: body.current.precip,
                feeltemp: body.current.feelslike,
            })
            //callback(undefined,body.current.weather_descriptions[0]+'. It is curently '+ body.current.temperature+' degrees out. It feels like '+ body.current.feelslike+' degrees out.',)
        }
    })
}

module.exports = forecast