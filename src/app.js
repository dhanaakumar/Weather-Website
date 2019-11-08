const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geoCode = require('./utils/geoCode.js');



const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewpath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewpath);

app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'created by dhana'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'created by dhana'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: ' How can I help you?',
        name: 'created by dhana'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide as the address'
        })
    }
    

        geoCode(req.query.address, (error, response) => {
          if (error) {
            return res.send({error: error});
          }
          forecast(response.latitude, response.longitude, (error, forecastData) => {
            if (error) {
              return res.send({error:error});
            }
            res.send({
                forecast: forecastData,
                location: response.location,
                address: req.query.address
            })
          });
        });
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        errorMessage: 'Help Article is not available',
        name: 'created by dhana'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        errorMessage: 'Page not found',
        name: 'created by dhana'
    })
})


app.listen(3000, () => {
    console.log('Server is up and running')
})