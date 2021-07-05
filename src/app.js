const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/WeatherServices');

const app = express(); 
const dirpath = path.join(__dirname,'../public');
const viewpath = path.join(__dirname,'../templates/views');
const partialpath = path.join(__dirname,'../templates/partials');

app.use(express.static(dirpath));
app.set('view engine', 'hbs');
app.set('views',viewpath);
hbs.registerPartials(partialpath);

app.get('/', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Unknown',
    });
})
app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About page',
        name: 'Unknown'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        helptext: 'this is help page',
        title: 'Help page',
        name:'Unknown',
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide address for weather',
        })
    }
    console.log(req.query.address);
    geocode(req.query.address,(error,{latitude, longitude, location}={}) => {
        if(error)
            return res.send({error});
        forecast(longitude,latitude, (error, {weatherdes, temp, precip}={}) => {
            if(error)
                return res.send({error});
            res.send({
                forecast: weatherdes,
                temperature: temp,
                location,
                precip: precip,
                address: req.query.address,
            })
        })
    })    
})

app.get('/help/*',(req, res) => { 
    res.render('error',{
        title: '404',
        name: 'Unknown',
        error: 'Help article not found',
    })
})

app.get('*',(req, res) => {
    res.render('error',{
        title: '404',
        name: 'Unknown',
        error: 'Page not found'
    });
})



app.listen(3000,() => {
    console.log('server is running on port 3000');
})