const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const { default: mongoose } = require('mongoose')

const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/health', async (req, res,) => {
    try {
        res.status(200).json({
            serverName: "job-listing-server",
            time: new Date(),
            status: 'active'
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
})

app.listen(process.env.PORT, () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log('server running successfully'))
        .catch((err) => console.error(err))
    console.log('server listening to port ' + process.env.PORT)
})