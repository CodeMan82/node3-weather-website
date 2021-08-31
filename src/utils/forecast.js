const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d39587aa3d6817e340b8c1b895156df2&query=' + latitude + ',' + longitude + '&units=f';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Error ' + body.error.code + '. ' + body.error.type + ' - ' + body.error.info, undefined)
        } else {
            let location = body.location.name + ', ' + body.location.region
            let conditions =  body.current.weather_descriptions[0];
            let temperature = body.current.temperature;
            let feelslike = body.current.feelslike;
            let forecastData = body.current.weather_descriptions[0] + ' and ' + body.current.temperature + ' degrees out.  It feels like ' + body.current.feelslike + ' degrees out.'
            callback(undefined, { location, conditions, temperature, forecastData });
        }
    });
}

module.exports = forecast;