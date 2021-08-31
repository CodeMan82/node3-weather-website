const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY29kZW1hbjgyIiwiYSI6ImNrc3cyZWVmMDAxcngyeG94N3o1OG8xdXIifQ.Tls6gqjOemKhBtDbEYOA4g&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location! Try another search.', undefined)
        } else {
            let location = body.features[0].place_name;
            let latitude = body.features[0].center[1];
            let longitude = body.features[0].center[0];
            callback(undefined, { latitude, longitude, location });
        }
    });
}

module.exports = geocode;