var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");


//Requiring routes
indexRoutes = require("./routes/index");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var db = mysql.createPool({
    connectionlimit: 50,
    host: "localhost",
    user: "sysadmin",
    password: "Emesene@321",
    database: "mikiniela"
});

app.use(indexRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("MK Server has started");
});