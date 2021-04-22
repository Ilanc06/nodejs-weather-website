const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')
const chalk = require('chalk')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Getting all Express features into the app component
const app = express()


// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialPath, function (err) {});


// Setup static directory to serve
app.use(express.static(publicDirectory))





// Rendering pages using hbs this one is for Index page the root one since the string is ''
app.get('', (req, res) => {
    res.render('index', {
        title: 'This is the Weather App',
        name: 'Ilan Cohen'
    })
})


// Rendering pages using hbs this one is for About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'A little about me',
        name: 'Ilan Cohen'
    })
})



// Rendering pages using hbs this one is for Help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is the Help Page',
        help_text: 'This is some help text for example',
        name: 'Ilan Cohen'
    })
})



// app.com/weather
app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an valid address'
        })
    }
    geoCode(req.query.address, (errorGeo, {latitude, longitude, location} = {}) => {
    
        if(errorGeo){
            return res.send({
                Error: errorGeo
        })}
        else {
        forecast(latitude, longitude, (errorForecast, dataForecast) => { 
    
            if(!errorForecast){
                res.send({
                   forecast: dataForecast, location,
                   address: req.query.address
                })
                
              
            }
            else {
             return res.send({
                 Error: errorForecast
            }) 
          }})
    }})
})


app.get('/products', (req, res) => {
    
    if(!req.query.search) {
    return res.send({
        error: 'You must provide a search term'
    })
    }
    console.log(req.query.search);
    res.send({

       products: []
       
    })
})


// Rendering pages using hbs this one is for Help unknown page
app.get('/help/*', (req,res) => {
    res.render('404',{
        title: 'Help article not found',
        name: 'Ilan Cohen'
    })
})


// Rendering pages using hbs this one is for any page other than the one set up
app.get('*', (req,res) => {
res.render('404',{
    title: 'Page Not found',
    name: 'Ilan Cohen'
})
})

app.listen(3000, () => {
console.log('Server Start properly on port 3000');

})