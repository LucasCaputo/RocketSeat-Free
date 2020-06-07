const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS places(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `);

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
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.bwexpo.com.br%2Feconomia-circular-producao-lixo-eletronico%2F&psig=AOvVaw0a0Owd4BO5bbqxhu_LvW2h&ust=1591632563070000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCms8CL8OkCFQAAAAAdAAAAABAD",
        "Papersider",
        "Lauro Portella Europa",
        "Número 260",
        "Contagem",
        "Minas Gerais",
        "Papéis e Papelão"
    ];

    function afterInsertData(err) {
        if (err) {
            return console.log(err);
        }

        console.log("Cadastro com sucesso");
        console.log(this);
    }

    db.run(query, values, afterInsertData);

    // db.all(`SELECT name FROM places`, function (err, rows) {
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão seus registros")
    //     console.log(rows)
    // })

    // db.run(`DELETE FROM places WHERE id =?`, [1], function (err) {
    //     if(err){
    //         return console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso")
    // })
});
