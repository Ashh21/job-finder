const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Users = require('../models/userModel')

const create = async (req, res, next) => {
    try {
        const { name, email, mobile, password } = req.body
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({
                message: 'please fill all required fields'
            })
        }

        const existingUser = await Users.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                message: "email is already registered"
            })
        }

        const encryptPassword = await bcrypt.hash(password, 10)
        const user = await Users.create({
            name, email, mobile, password: encryptPassword
        })

        const jwttoken = jwt.sign({ email, _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
        res.status(200).json({
            jwttoken,
            reacruiterName: user.name,
            message: `${user.name} registered successfully`
        })
        // res.redirect()
    }
    catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(401).json({
                message: 'Email and password required'
            })
        }

        if (!email.match(/\S+@\S+\.\S+/)) {
            return res.status(401).json({
                message: 'InvalidEmail'
            })
        }
        const user = await Users.findOne({ email })

        if (!user) {
            return res.status(403).json({
                message: 'Incorrect credentials! user not found'
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (isPasswordMatched) {
            const token = { _id: user._id, email: user.email }
            const jwttoken = jwt.sign(token, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
            return res.status(200).json({
                message: "Login successful",
                jwttoken,
                reacruiterName: user.name
            })
            // res.redirect()
        }
        else {
            res.status(403).json({
                message: 'Incorrect password! Please try again'
            })
        }
    }
    catch (error) {
        next(error)
    }
}

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            res.status(401).json({
                message: "please provide a valid token"
            })
        }
        const user = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = user
        next()
    }
    catch (error) {
        next(error)
    }
}

module.exports = { create, login, authentication }