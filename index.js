const express = require('express');
const app = express();
const tds=require('./todos.js')

app.use(express.json());
app.use(express.urlencoded());

app.get('/todo',(req, res, next) =>{
    const toDos = tds.readToDos('todos.json');
    if (toDos.length < 1)
        res.send('there are no toDOs in your list');
    res.json(toDos);
})


app.get('/todo/:id', (req, res, next) => {
    const toDos = tds.readToDos('todos.json');
    if (toDos.length < 1)
        res.send('there are no toDOs in your list');
    if (!toDos.find((value) => { return value.id == req.params.id }))
        res.send("this id dose not match any item");
    res.json(toDos.find((value)=>{return value.id==req.params.id}));
})

app.post('/todo/:title', (req, res, next) => {
    if (req.params.title)
    {
        const title = req.params.title;
        const toDos = tds.readToDos('todos.json');
        toDos.push({ "id": (toDos[(toDos.length) - 1].id) + 1, "title": title });
        tds.writeToDos('todos.json', toDos);
        res.send('added');
    }
})


app.delete('/todo/:id', (req, res, next) => {
    const toDos = tds.readToDos('todos.json');
    const id = +(req.params.id);
    if (toDos.find((value) => { return value.id === id; })) {
        const id = req.params.id;
        let newTds = toDos.filter((value) => { return value.id !== +id });
        tds.writeToDos('todos.json', newTds);
        res.send('deleted');
    } else res.end("no data matched");
})

app.patch('/todo/:id/:title', (req, res, next) => {
    if (req.params.id && req.params.title)
    {
        const id = +(req.params.id);
        const title = req.params.title;
        const toDos = tds.readToDos('todos.json');
        if (toDos.find((value) => { return value.id === id }))
        {
            toDos.find((value) => { return value.id === id }).title = title;
            tds.writeToDos('todos.json', toDos);
            res.send('done');
        } else res.end("no data matched");
        
    }
})

app.post('*', (req, res, next) => {
    res.status(404).end("Not found");
})

app.get('*', (req, res, next) => {
    res.status(404).end("Not found");
})

app.delete('*', (req, res, next) => {
    res.status(404).end("Not found");
})

app.patch('*', (req, res, next) => {
    res.status(404).end("Not found");
})

app.listen('3000');