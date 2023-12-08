const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const create = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body
        const encryptPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name, email, mobile, password: encryptPassword
        })
        const jwttoken = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
        await user.save()
        res.status(200).json({
            user,
            jwttoken,
            toast: "user registered successfully"
        })
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(403).json({
                message: 'Incorrect credentials! user not found'
            })
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if (isPasswordMatched) {
            const token = { userId: user._id, email: user.email }
            const jwttoken = jwt.sign(token, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
            return res.status(200).json({
                message: "Login successful",
                jwttoken,
            })
        }
        else {
            res.status(403).json({
                message: 'Incorrect credentials! Please try again'
            })
        }
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const authentication = async (req, res, next) => {
    try {
        const { jwttoken } = req.headers
        const user = await jwt.verify(jwttoken, process.env.JWT_SECRET_KEY)
        req.user = user
        next()
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = { create, login, authentication }