const UserModel = require("./users/schema")

const atob = require("atob")

const basicAuth = async (req, res, next) => {
    
    if (!req.headers.authorization) {
        const error = new Error("provide basic auth")
        error.httpStatusCode = 401
        next(error)
    } else {
        // BAsic lksadjslakduas89d7as98

        const [method, token] = req.headers.authorization.split(" ")
        console.log(method)
        const decoded = atob(token)
        console.log(decoded)
        const [username, password] = decoded.split(":")
       
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
    
const adminOnly = async (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        const error = new Error("admins only")
        error.httpStatusCode = 403
        next(error)
    }
}

module.exports = {
    basic: basicAuth,
    admin: adminOnly
    }
    
