const express = require('express');
const res = require('express/lib/response');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World!!");
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});


//api/posts/:year
app.get('/api/posts/:year/:moth', (req, res) => {
    res.send(req.params);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//app.post() create
//app.put() update
//app.delete() delete