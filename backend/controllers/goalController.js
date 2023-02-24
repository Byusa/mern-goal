const asyncHandler = require('express-async-handler')
// @desc   Get goals
// @route  GET /api/goals
// access Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get goals" })
})

// @desc   Set goals
// @route  POST /api/goals
// access Private
const setGoals = asyncHandler (async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(201).json({ message: "Set goals" })
})

// @desc   Update goals
// @route  PUT /api/goals/:id
// access Private
const updateGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update goal ${req.params.id}` })
})

// @desc   Get goals
// @route  DELETE /api/goals/:id
// access Private
const deleteGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}
