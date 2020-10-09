const express = require('express');
const mysql2 = require('mysql2');
const PORT = process.env.PORT || 3000;
const app = express();

//mysql connection
const con = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Milano",
    database: "GlobalCovidDb"
  })
//callback
con.connect((err) =>{
    if(!err){
        console.log("connected to MySQL server at port 3306...");
    }else{
        console.log("error not connected to MYSQL Server")
    }
});
//database
app.get("/first", (req, res) => {
    let sql = "CREATE DATABASE GlobalCovidDb";
    con.query(sql, (err,result) => {
        if(!err){
            res.send("Successfully created database");
        }else{
            res.send("failed to create school database....")
        }
    })
})
//table 
app.get("/second", (req, res) => {
    let sql = "CREATE TABLE stat(Locationid int AUTO_INCREMENT, acases int, recovered int, deaths int, PRIMARY KEY(Locationid))";
    con.query(sql, (err,result) => {
        if(!err){
            res.send(result);
        }else{
            res.send("failed to create  table....")
        }
    })
})

//create
app.get("/third", (req, res) => {
    let newRow = {Locationid: 24, acases: 23, recovered: 60, deaths: 2};
    let sql = "INSERT INTO stat SET ?";
    con.query(sql, newRow, (err,result) => {
        if(!err){
            res.send(result);
        }else{
            res.send("failed to insert into  table....")
        }
    });
});
//read
app.get("/fourth", (req, res) => {
    let sql = "SELECT * FROM stat";
    con.query(sql,(err,result) => {
        if(!err){
            res.send(result);
        }else{
            res.send("failed to read  table....")
        }
    });
});
//port
app.listen(PORT, () => {
    console.log("Listening to PORT " + PORT + "....");
   });