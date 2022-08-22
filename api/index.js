const express = require('express');
const { jsonpholderRouter }  = require('./jsonPlaceholder');
const { authRouter } = require('./auth');

const app = express();
app.use(express.json())

app.get('/', (request, response) => {
    response.status(200).send({ message: "home" })
})

app.get('/status', (request, response) => {
    response.status(200).send({ message: "OK" })
});

app.use('/auth', authRouter);
app.use('/json_placeholder', jsonpholderRouter);

app.listen((5111), () => {
    console.log("Listening on port 5111")
})