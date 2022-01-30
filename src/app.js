const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/weather')

const app = express()

//define paths for express
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view path
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app Home page',
        name: 'Sesha Sai'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'title of about page',
        name: 'Sesha Sai'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'title of help page',
        name: 'Seshu'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address should be specified'
        })
    }
    forecast(req.query.address, (error, forecastData = {}) => {
        if (error) {
            return res.send({ error: error })
        }
        res.send({
            location: forecastData.location,
            temperature: forecastData.current.temperature,
            weather_description: forecastData.current.weather_descriptions
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help page',
        name: 'Sesha Sai',
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sesha Sai',
        error: 'page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})