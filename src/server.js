const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
server.use(express.static("public"));

const db = require("./database/db");

nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

server.get("/", (req, res) => {
    res.render("index.html");
});

server.get("/create-point", (req, res) => {
    res.render("create-point.html");
});

server.get("/search", (req, res) => {
    db.all(`SELECT name FROM places`, function (err, rows) {
        if (err) {
            return console.log(err);
        }

        console.log(rows);
        return res.render("search-results.html", { places: rows });
    });
});

server.listen(3000);
