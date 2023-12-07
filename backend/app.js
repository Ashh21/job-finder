const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')



const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.status(200).json({ message: "success" })
}) 

app.listen(process.env.PORT, () => {
    console.log('server running sucessfully on port ' + process.env.PORT)
})