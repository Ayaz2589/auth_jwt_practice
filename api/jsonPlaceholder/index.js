const express = require('express');
const axios = require('axios');
const checkAuth = require("../middleware/checkAuth");

const jsonpholderRouter = express.Router();

jsonpholderRouter.get('/posts', checkAuth, async (request, response) => {
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        response.send({ data: res.data })
    } catch (error) {
        response.send({ error });
    }
});

jsonpholderRouter.get('/comments', checkAuth, async (request, response) => {
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/comments');
        response.send({ data: res.data })
    } catch (error) {
        response.send({ error });
    }
});

jsonpholderRouter.get('/albums', checkAuth, async (request, response) => {
    try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/albums');
        response.send({ data: res.data })
    } catch (error) {
        response.send({ error });
    }
});

jsonpholderRouter.post('/posts', async (request, response) => {
    try {
        const res = await axios.post('https://jsonplaceholder.typicode.com/posts', { body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 2,
          })}, {
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });
        response.send({ data: res.data })
    } catch (error) {
        response.send({ error });
    }
});

module.exports = { jsonpholderRouter };
