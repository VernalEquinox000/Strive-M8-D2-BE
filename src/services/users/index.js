const express = require("express")
const UserModel = require("./schema")
const {basic} = require("../authTools")


const usersRouter = express.Router()

usersRouter.get("/", basic, async (req, res, next) => {
    try {
        const users = await UserModel.find()
        res.send(users)
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}
)

usersRouter.get("/me", basic, async (req, res, next) => {
    try {
        res.send(req.user)
        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}
)

usersRouter.post("/register", async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body)
        const { _id } = await newUser.save()
        
        res.status(201).send(_id)
        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}
)

usersRouter.get("/", async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}
)

usersRouter.get("/", async (req, res, next) => {
    try {
        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
})

module.exports = usersRouter