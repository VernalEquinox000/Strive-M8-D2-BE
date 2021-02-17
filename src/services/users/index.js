const express = require("express")
const UserModel = require("./schema")
const {basic, admin} = require("../authTools")


const usersRouter = express.Router()

usersRouter.get("/", basic, admin, async (req, res, next) => {
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

usersRouter.put("/me", basic, async (req, res, next) => {
    try {
        const updates = Object.keys(req.body)
        console.log(updates)

        updates.forEach(update => req.user[update] = req.body[update])
        //console.log(req.body[update])
        await req.user.save()
        res.send(req.user)
        res.send(updates)
        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
}
)

usersRouter.delete("/me", basic, async (req, res, next) => {
    try {
        await req.user.deleteOne()
        res.status(204).send("sayounara")
        
    } catch (error) {
        console.log(error)
        next(error)
        
    }
})

module.exports = usersRouter