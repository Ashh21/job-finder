
const JobData = require('../models/jobModel')

const createJob = async (req, res, next) => {
    try {
        const { companyName, logoUrl, jobPosition, salary, jobType, jobPref, location, jobDescription, aboutCompany, skillsRequired, information, } = req.body

        if (!companyName || !logoUrl || !jobPosition || !salary || !jobType || !jobPref || !location || !jobDescription || !aboutCompany || !skillsRequired || !information) {
            return res.status(400).json({
                message: 'All fields required! '
            })
        }

        const newJob = await JobData.create({
            ...req.body, userId: req.user._id, updatedAt: null, skillsRequired: skillsRequired.split(',').filter(e => e.length !== 0).map(e => e.trim()),
        })
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
        const skills = typeof req.body.skills === 'string' ? req.body.skills.split(/\s*,\s*/).map(skill => skill.trim().toLowerCase()) : req.body.skills;

        const job = await JobData.findByIdAndUpdate(id, { $set: { ...req.body, skillsRequired: skills }, updatedAt: Date.now(), }).lean()

        res.status(200).json({
            job,
            message: "success"

        })
    }
    catch (err) {
        next(err)
    }
}

const getAllJobs = async (req, res, next) => {
    try {
        const jobs = await JobData.find()
        if (!jobs) {
            return res.status(404).json({
                message: 'Job not found',
            })
        }
        res.status(200).json({
            jobs
        })
    }
    catch (err) { next(err) }
}

const getFilterdData = async (req, res, next) => {
    try {
        const filters = {}
        if (req.query.skillsRequired) {
            filters.skillsRequired = { $in: req.query.skillsRequired.split(',').map(e => e.trim()) }
        }

        if (req.query.jobPosition) {
            filters.jobPosition = req.query.jobPosition
        }

        const filteredJobs = await JobData.find(filters);
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

module.exports = { createJob, updateJob, getAllJobs, getFilterdData, getJobDetails }