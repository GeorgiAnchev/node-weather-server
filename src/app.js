const express = require('express');
const path = require('path');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(path.join(__dirname, '../public'));

const port = process.env.PORT || 3000;


const app = express();
const publicDirPath = path.join(__dirname, '../public');
app.set('view engine', 'hbs');
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.send('Hello express!')
})


app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/about', (req, res) => {
    res.send('<h1>I am a title</h1>')
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode.geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error });
        }

        forecast.forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.send('i hlqb')
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})