const form = document.querySelector('form')
const search = document.querySelector('input')

const msg1 = document.querySelector('#message1')
const msg2 = document.querySelector('#message2')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('http://api.weatherstack.com/current?access_key=0aeb2e9c62a8cdf650a7d942c3e4e9a0&query=' + encodeURIComponent(location))
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    msg1.textContent = 'Error occured'
                    msg2.textContent = error
                } else {
                    msg1.textContent = JSON.stringify(data.location.name + "," + data.location.country)
                    msg2.textContent = JSON.stringify(data.current.weather_descriptions);
                }
            })
        }).catch((error) => {
            msg1.textContent = 'Error occured'
            msg2.textContent = (error);
        })

})