// 2702 2023 første forsøg på vercelserver

const express = require('express');
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send({message: "der pderp"});
})

app.listen(8080);