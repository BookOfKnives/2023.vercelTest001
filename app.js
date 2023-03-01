// 2702 2023 første forsøg på vercelserver

const express = require('express');
const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.static('public'));

const chronos = [{id:0, name:"Alpha", coordinates:[1,2,3], age:"A lot"},
{id:1, name:"Beta", coordinates:[1+1,2+2,3+3], age:"Also Bet A lot"},
];

app.get("/", (req, res) => {
    res.send("/public/index.html");
}); 


app.get("/chronos", (req, res) => {
    res.send({Data:chronos});
}); 

app.get("/chronos/:id", (req, res) => {
    res.send({Data:chronos[req.params.id]})
});

app.post("/chronos", (req, res) => { //TO DO: data validation: do not post !chronos
    const chronosToCreate = req.body;
    chronos.push(chronosToCreate);
    res.send({"Data updated":chronos});
});

app.put("/chronos/:id", (req, res) => {
    const newChronos = req.body;
    const idOfOldChronos = req.params.id;
    chronos[idOfOldChronos] = newChronos;
    res.send({"Data put":chronos[idOfOldChronos]});
});

app.patch("/chronos/:id", (req, res) => {
    let foundIndex = chronos.findIndex(chrono => chrono.id === Number(req.params.id));
    if (foundIndex === -1) {
        res.status(404).send({ message: `No chrono found with id ${req.params.id}` })
    } else {
        const foundChronos = chronos[foundIndex];
        const chronoToUpdate =  { ...foundChrono, ...req.body, id: foundChrono.id };
        chronos[foundIndex] = chronoToUpdate;
        res.send({ data: chronoToUpdate });
    }
});

app.delete("/chronos/:id", (req, res) => {
    let foundIndex = chronos.findIndex(chrono => chrono.id === Number(req.params.id));
    if (foundIndex === -1) {
        res.status(404).send({ message: `No chrono found with id ${req.params.id}`  })
    } else {
        const deletedChrono = chronos.splice(foundIndex, 1)[0];
        res.send({ data: deletedChrono });
    }
});


app.listen(8080, () => {
    console.log("server is running on port ", 8080);
});

module.exports = app;