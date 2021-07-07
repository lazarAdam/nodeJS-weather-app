const path = require('path')
const express = require('express')
const hbs = require('hbs')
const util = require('./util')

// start an express app
const app = express()

// get the port from the environment variable is exist else use 3000
const port =process.env.PORT || 3000

const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set the template engine to handle bars (HBS) for dynamic content
app.set('view engine', 'hbs')

//set a custom path to the views dir along custom name (the default name is views
// , default dir is views too and it must br in the root dir of the project )
app.set('views', viewsPath)

// set the dir where partials live which serve as content that can be plugged into our templates like header, footer,...
hbs.registerPartials(partialsPath)

// set the statically served content dir
app.use(express.static(publicDir))


/**
 * Dynamic content: listing each each view route for the views like  index.hbs, about.hbs,.... located in templates dir
 * also adding properties that can be accessed on each hbs template
 */


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'adam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'adam'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        name: 'adam'
    })
})


/**
 * serving JSON format data
 */
app.get('/weather', (req, resp) => {

    if (!req.query.address) {

        return resp.send({
            error: 'you must provide an address'
        })
    }

    util.geocode(req.query.address, (error, {lat, longi, location} = {}) => {

        if (error) {
            return resp.send(error)
        }

        util.forecast(lat, longi, (error, forecastData) => {
            if (error){
                return resp.send(error)
            }

            resp.send({
                location,
                forecastData
            })
        })
    })
})


// handling a specific 404 to a rout also rendering partial page 404.

app.get('/help/*', (req, res) => {

    res.render('404', {
        error: 'help article not found'
    })
})

// handling 404. which is any route that it didn't match none of the routes above (must be listed as the last get call)
app.get('*', (req, res) => {
    res.render('404', {
        error: 'Error 404. Page Not Found!'
    })
})

// start the server by listening to requests on the defined port at the top of this file
app.listen(port, () => {
    console.log('Server is up on port: '+port)
})