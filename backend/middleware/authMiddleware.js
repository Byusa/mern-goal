const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User =  require('../models/userModel')

const NOT_AUTHORIZED_MSG = 'Not authorized'

const protect = asyncHandler(async (req, res, next) => {
    let token
    // Get the authorization header, make sure its a Bearer token eg: Bearer sdTOKENfadfds
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
        ){
        try{
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get user from the token
            req.user = await User.findById(decoded.id).select("-password") // without including password

            if(!req.user){
                throw new Error(NOT_AUTHORIZED_MSG)
            }

            next()  // to call next piece of middleware
        } catch (error){
            console.log(error)
            res.status(401)
            throw new Error(NOT_AUTHORIZED_MSG)
        }
    }
    if (!token){
        res.status(401)
        throw new Error(NOT_AUTHORIZED_MSG)
    }
})
module.exports  = { protect }