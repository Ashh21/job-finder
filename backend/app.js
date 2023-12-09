const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const routes = require('./routes/routes')
const { errorHandler } = require('./errorhandler/errorHandler')

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', async (req, res, next) => {
    try {
        res.status(200).json({
            serverName: "job-listing-server",
            time: new Date(),
            status: 'active'
        })
    }
    catch (error) {
        next(error)
    }
})

app.use('/api', routes) 
app.use((req, res, next) => {
    const err = new Error('route not found')
    err.status = 404
    next(err)
})

app.use(errorHandler)

app.listen(process.env.PORT, () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log('server running successfully'))
        .catch((err) => console.error(err))
    console.log('server listening to port ', process.env.PORT)
}) 