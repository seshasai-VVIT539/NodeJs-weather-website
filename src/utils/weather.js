const request = require('postman-request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0aeb2e9c62a8cdf650a7d942c3e4e9a0&query=' + encodeURIComponent(address)

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weatherbit', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body)
        }
    })

}
module.exports = forecast