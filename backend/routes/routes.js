const express = require('express')
const { create, login, authentication } = require('../controllers/userController')
const { createJob, updateJob, getFilterdData, getJobDetails } = require('../controllers/jobController')

const router = express.Router()

router
    .post('/register', create)
    .post('/login', login)
    .post('/job', authentication, createJob,)
    .patch('/job/:id', authentication, updateJob,)
    .get('/job', authentication, getFilterdData)
    .get('/job/:id', authentication, getJobDetails)



module.exports = router 