const express = require("express")
const mongoose = require("mongoose")
const listEndpoints = require("express-list-endpoints")
const cors = require("cors")
const { join } = require("path")
const usersRouter = require("./services/users")



//error handlers
const { notFoundHandler,
    unauthorizedHandler,
    forbiddenHandler,
    badRequestHandler,
    genericErrorHandler
} = require("./errorHandlers")

const server = express()

server.use(cors())
const port = process.env.PORT || 5000

const staticFolderPath = join(__dirname, "../public")
server.use(express.static(staticFolderPath))


server.use(express.json())

server.use("/users", usersRouter )

server.use(badRequestHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(forbiddenHandler)
server.use(genericErrorHandler)

console.log(listEndpoints(server))

mongoose.set("debug", true)

mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(server.listen(port, () => {
    console.log("running on port", port)
    }))
.catch(error => console.log(error))