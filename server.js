const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');

const app = express();

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/data', (req, res, next)=> res.send({ random: Math.random() }));
app.listen(port, ()=> console.log(`listening on port ${port}`));