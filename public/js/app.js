const form = document.querySelector('form')
const search = document.querySelector('input')

const msg1 = document.querySelector('#message1')
const msg2 = document.querySelector('#message2')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    fetch('/weather?address=' + encodeURIComponent(location))
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    msg1.textContent = 'Error occured'
                    msg2.textContent = error
                } else {
                    msg1.textContent = JSON.stringify(data.location.name + "," + data.location.country)
                    msg2.textContent = JSON.stringify(data.temperature + "," + data.weather_description);
                }
            })
        }).catch((error) => {
            msg1.textContent = 'Error occured'
            msg2.textContent = (error);
        })

})