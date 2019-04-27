const request = require('request');

const forecast = (latitude, longtitude, callback) => {
    const url = `https://api.darksky.net/forecast/a567d307b6ed4e0629dde7a324d0ee0d/${encodeURIComponent(latitude)},${encodeURIComponent(longtitude)}?units=si`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location')
        } else {
            callback(`It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chance of rain.`);
        }
    })
}

module.exports = {
    forecast
};
