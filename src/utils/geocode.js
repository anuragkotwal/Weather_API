const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?limit=4&access_token=pk.eyJ1IjoiY29vZGVyLTEwMSIsImEiOiJja3FneDBuZWkxNWpwMndwZ2hzZm9pbmVsIn0.gDbXPsUyN5s0agySC4WTMQ';
    console.log(url);
    request({url, json: true},(error, {body}={}) =>{
        if(error) {
            callback('Unable to connect location services!',undefined);
        }else if(body.features.length === 0)  {
            callback('Unable to find location!',undefined);
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode