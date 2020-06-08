const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
server.use(express.static("public"));

const db = require("./database/db");

server.use(express.urlencoded({ extended: true }));

nunjucks.configure("src/views", {
    express: server,
    noCache: true
});

server.get("/", (req, res) => {
    return res.render("index.html");
});

server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`;

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ];

    function afterInsertData(err) {
        if (err) {
            console.log(err);
            return res.send("Erro no cadastro");
        }

        console.log("Cadastro com sucesso");
        console.log(this);
    }

    db.run(query, values, afterInsertData);

    return res.render("create-point.html", { saved: true });
});

server.get("/search", (req, res) => {
    const search = req.query.search;

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (
        err,
        rows
    ) {
        if (err) {
            return console.log("Erro na pesquisa");
        }

        const total = rows.length;

        return res.render("search-results.html", { places: rows, total });
    });
});

server.listen(3000);
