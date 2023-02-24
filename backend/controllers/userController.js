const jwt = require('jsonwebtoken') // for creating and verufying JWT
const bcrypt = require('bcryptjs') // for hashing passwords
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc  Register new user
// @route POST /api/users
// access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    if(!name || !email || !password ){
        res.status(400)
        throw new Error('Please fill in all fields')
    }
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exist')
    }
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
    res.status(200).json(user)
})

// @desc  Authenticate a user
// @route POST /api/login
// access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if( !email || !password ){
        res.status(400)
        throw new Error('Please fill in all fields')
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})


// @desc  Get user data
// @route GET /api/users/me
// access Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
    // if(!req.body.name || !req.body.email || !req.body.password ){
    //     res.status(400)
    //     throw new Error('Please add values')
    // }
    // const user = await User.create({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    // })
    const user = 'getMe'
    res.status(200).json(user)
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,  {
        expiresIn: '30d', // this assign the token with that id and will expire in 30 days
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}