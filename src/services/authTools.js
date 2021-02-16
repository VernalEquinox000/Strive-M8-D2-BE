const UserModel = require("./users/schema")

const atob = require("atob")

const basicAuth = async (req, res, next) => {
    
    if (!req.headers.authorization) {
        const error = new Error("provide basic auth")
        error.httpStatusCode = 401
        next(error)
    } else {
        const [username, password] = atob(req.headers.authorization.split("")[1]).split(":")
        
        const user = await UserModel.findByCredentials(username, password)
        if (!user) {
            const error = new Error("wrong wrong wrong credentials")
            error.httpStatusCode = 401
            next(error)
        } else {
            req.user = user
        } next()
    }
    
    }

module.exports = {
        basic: basicAuth,
    }
    
