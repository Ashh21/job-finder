const express = require('express')
const { create, login, authentication } = require('../controllers/userController')
const { createJob, updateJob, getFilterdData, getJobDetails, getAllJobs } = require('../controllers/jobController')

const router = express.Router()

router
    .post('/register', create)
    .post('/login', login)
    .post('/job', authentication, createJob,)
    .patch('/job/:id', authentication, updateJob,)
    .get('/jobs', getAllJobs)
    .get('/job', getFilterdData)
    .get('/job/:id', getJobDetails)


module.exports = router  