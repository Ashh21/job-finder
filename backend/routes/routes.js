const express = require('express')
const { create, login, authentication } = require('../controllers/userController')
const { createJob, updateJob } = require('../controllers/jobController')

const router = express.Router()

router
    .post('/register', create)
    .post('/login', login)
    .post('/job', authentication, createJob,)




module.exports = router 