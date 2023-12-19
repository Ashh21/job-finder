const mongoose = require('mongoose')

const Schema = mongoose.Schema

const jobSchema = new Schema({
    companyName: { type: String, required: true, },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    logoUrl: { type: String, required: true },
    jobPosition: { type: String, required: true },
    salary: { type: String, required: true },
    jobType: { type: String, enum: ['full-time', 'part-time'], required: true },
    jobPref: { type: String, enum: ['Remote', 'Office'], required: true },
    location: { type: String, required: true },
    jobDescription: { type: String, required: true },
    aboutCompany: { type: String, required: true },
    skillsRequired: { type: [String], required: true },
    information: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('JobData', jobSchema)