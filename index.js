const axios = require("axios")
const express = require("express")
const nock = require("nock")

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
            host: "jsonplaceholder.typicode.com",
            port: "8002"

        }})
        res.status(toDoResponse.status)
        res.json(toDoResponse.data)
    }catch(err) {
        next(err)
    }
})

nock('http://jsonplaceholder.typicode.com:8002', {allowUnmocked: true}).persist()
    .get('/todos')
    .reply(200, [{
      id: 1,
      title: 'mockTodo',
      completed: false
    }])
    .get(resource => resource.includes('/comments'))
    .query({postId: 1})
    .reply(200, [{
      "postId": 1,
      "id": 1,
      "name": "dummy email",
      "email": "Eliseo@gardner.biz",
      "body": "dummy body"
    }])

app.listen(3000, () => console.log("Server started on port 3000!"))