const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/7d3d11f90e1caf2d1ae9db578e6c4e89/'+lat+','+long;
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find the location', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary +' It is currently ' + body.currently.temperature + ' degress out. The highest today was '+ body.daily.data[0].temperatureHigh+' with low of ' +body.daily.data[0].temperatureLow+'.There is a ' + body.currently.precipProbability +'% chance of rain.')
        }
    })

}

module.exports = forecast;