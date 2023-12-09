const JobData = require('../models/jobModel')

const createJob = async (req, res, next) => {
    try {
        const { companyName, logoUrl, jobPosition, salary, jobType, jobPref, location, jobDescription, aboutCompany, skillsRequired, information, } = req.body

        if (!companyName || !logoUrl || !jobPosition || !salary || !jobType || !jobPref || !location || !jobDescription || !aboutCompany || !skillsRequired || !information) {
            return res.status(400).json({
                message: 'All fields required'
            })
        }
        const newJob = await JobData.create(req.body)
        res.status(200).json({
            message: 'Job created successfully',
            newJob
        })
    }
    catch (err) {
        next(err)
     }


}


module.exports = { createJob }