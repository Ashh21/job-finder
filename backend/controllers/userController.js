const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const create = async (req, res, next) => {
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
            message: "user registered successfully"
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

        if (!email || !email.match(/\S+@\S+\.\S+/)) {
            return res.status(401).json({
                message: 'InvalidEmail'
            })
        }
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
        const { jwttoken } = req.headers.authorization
        const user = await jwt.verify(jwttoken, process.env.JWT_SECRET_KEY)
        req.user = user
        next()
    }
    catch (error) {
        next(error)
    }
}

module.exports = { create, login, authentication }