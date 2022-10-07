var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
const { json } = require("express");

// connection to node and mysql
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "igapdb"
})

app.use(express.json())
// For JSON Data
app.use(bodyParser.json({ limit: "50mb" }))
// For Form Data
app.use(bodyParser.urlencoded({ limit: "50mb", extended: "true" }));

app.get('/', (req, res) => {
    res.send("Hello World");
    res.end();
})

app.post("/user/save", (req, res) => {
    let body = req.body;
    var query = "INSERT INTO users (name,email) VALUES ('" + body.name + "', '" + body.email + "')";
    // res.end(JSON.stringify(body));
    // console.log(query);
    con.connect((err) => {
        if (err) {
            res.end(JSON.stringify({ status: "Failed" }));
        }
        con.query(query, (err, result) => {
            console.log(result);
            if (err) {
                res.end(JSON.stringify({ status: "query Failed" }));
            }
            con.end((err) => {
                res.end(JSON.stringify({ status: "Success" }));
            })
        })
    })
});

app.patch("/user/update", (req, res) => {
    let body = req.body;
    // var query = "INSERT INTO users (name,email) VALUES ('" + body.name + "', '" + body.email + "') WHERE ID = 2";
    var query = "UPDATE users SET name = '"+ body.name +"', email = '" + body.email + "' WHERE id = " + body.id;
    // res.end(JSON.stringify(body));
    // console.log(query);
    con.connect((err) => {
        if (err) {
            res.end(JSON.stringify({ status: "Failed" }));
        }
        con.query(query, (err, result) => {
            console.log(result);
            if (err) {
                res.end(JSON.stringify({ status: "query Failed" }));
            }
            con.end((err) => {
                res.end(JSON.stringify({ status: "Success" }));
            })
        })
    })
})

app.delete("/user/delete", (req, res) => {
    let body = req.body;
    var query = "DELETE FROM users WHERE id = " + body.id;
    // res.end(JSON.stringify(body));
    // console.log(query);
    con.connect((err) => {
        if (err) {
            res.end(JSON.stringify({ status: "Failed" }));
        }
        con.query(query, (err, result) => {
            console.log(result);
            if (err) {
                res.end(JSON.stringify({ status: "query Failed" }));
            }
            con.end((err) => {
                res.end(JSON.stringify({ status: "Success" }));
            })
        })
    })
})

app.get("/user/list",(req,res)=>{
    var query = "SELECT * FROM users";
    con.connect((err) => {
        if (err) {
            res.end(JSON.stringify({ status: "Failed" }));
        }
        con.query(query, (err, result) => {
            console.log(result);
            if (err) {
                res.end(JSON.stringify({ status: "query Failed" }));
            }
            con.end((err) => {
                res.end(JSON.stringify({ status: result }));
            })
        })
    })
})

app.listen(8000, () => {
    console.log("Server is running on http://localhost:8000");
});