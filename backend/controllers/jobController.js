const { JsonWebTokenError } = require('jsonwebtoken')
const JobData = require('../models/jobModel')

const createJob = async (req, res, next) => {
    try {
        const { companyName, logoUrl, jobPosition, salary, jobType, jobPref, location, jobDescription, aboutCompany, skillsRequired, information, } = req.body

        if (!companyName || !logoUrl || !jobPosition || !salary || !jobType || !jobPref || !location || !jobDescription || !aboutCompany || !skillsRequired || !information) {
            return res.status(400).json({
                message: 'All fields required! '
            })
        }
        let skillsArray = skillsRequired
        if (typeof skillsRequired === String) {
            skillsArray = skillsRequired.split(',').map(e => e.trim())
        }

        const newJob = await JobData.create({ ...req.body, userId: req.user._id, skillsRequired: skillsArray, updatedAt: null, })
        res.status(200).json({
            message: 'Job created successfully',
            newJob
        })
    }
    catch (err) {
        next(err)
    }
}

const updateJob = async (req, res, next) => {
    try {
        const { id } = req.params
        const { companyName, logoUrl, jobPosition, salary, jobType, jobPref, location, jobDescription, aboutCompany, skillsRequired, information } = req.body

        if (!companyName || !logoUrl || !jobPosition || !salary || !jobType || !jobPref || !location || !jobDescription || !aboutCompany || !skillsRequired || !information) {
            return res.status(400).json({
                message: 'All fields required! '
            })
        }
        const job = await JobData.findByIdAndUpdate(id, { $set: req.body, updatedAt: Date.now() }).lean()
        res.status(200).json({
            job
        })
    }
    catch (err) {
        next(err)
    }
}

const getFilterdData = async (req, res, next) => {
    try {
        const { skillsRequired } = req.query;
        if (!skillsRequired || !skillsRequired.trim() === '') {
            return res.status(404).json({
                message: "SkillsRequired and jobTitle parameter is missing!"
            })
        }

        const filter = {
            skillsRequired: { $in: skillsRequired.split(',').map(e => e.trim()) },
        }

        const filteredJobs = await JobData.find(filter);
        res.status(200).json(filteredJobs);

    }
    catch (err) {
        next(err)
    }
}

const getJobDetails = async (req, res, next) => {
    try {
        const { id } = req.params
        console.log(id)
        if (!id) {
            return res.status(404).json({
                message: 'Invalid id!, Job not found'
            })
        }
        const job = await JobData.findById(id)
        res.status(200).json({
            job
        })
    }
    catch (err) {
        next(err)
    }
}

module.exports = { createJob, updateJob, getFilterdData, getJobDetails }