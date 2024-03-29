const nock = require("nock")

const start = () => {
    //Nock mock when your http call has a proxy configuration
    nock('http://149.129.239.170:8002', {allowUnmocked: true}).persist()
    .get(resource => resource.includes('/comments'))
    .query({postId: 1})
    .reply(200, [{
    "postId": 1,
    "id": 1,
    "name": "dummy email",
    "email": "Eliseo@gardner.biz",
    "body": "dummy body"
    }])

    // Normal nock mock
    nock('https://jsonplaceholder.typicode.com', {allowUnmocked: true}).persist()
    .get('/todos')
    .reply(200, [{
    id: 1,
    title: 'mockTodo',
    completed: false
    }])
}

module.exports = { start }