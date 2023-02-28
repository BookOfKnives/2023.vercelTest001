// 2702 2023 første forsøg på vercelserver

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("/__dirname__/public/index.html");
})


app.listen(8080);