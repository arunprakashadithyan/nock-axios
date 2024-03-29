const axios = require("axios")
const express = require("express")
const mockServer = require("./mock_server")

const app = express();

app.get("/todos", async (req, res, next) => {
    try {
        const toDoResponse = await axios.get('https://jsonplaceholder.typicode.com/todos')
        res.status(toDoResponse.status)
        res.json(toDoResponse.data)
    }catch(err) {
        next(err)
    }
})

app.get("/comments", async (req, res, next) => {
    try {
        const toDoResponse = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${req.query.postId}`, {
        proxy: {
            protocol: "http",
            host: "149.129.239.170",
            port: "8002"

        }})
        res.status(toDoResponse.status)
        res.json(toDoResponse.data)
    }catch(err) {
        next(err)
    }
})

mockServer.start()
app.listen(3000, () => console.log("Server started on port 3000!"))
