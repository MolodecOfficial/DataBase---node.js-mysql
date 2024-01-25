const mysql = require('mysql');
const express = require('express')

const app = express();

// Конфиг

const connection = mysql.createConnection( {
    host: "localhost",
    user: "root",
    database: "database",
    password: ""
});


/*
Функция на проверку ошибок при запуске.
Если их нет - выведет: Database ----- OK
*/
connection.connect(err => {
    if (err) {
        console.log(err);
        console.log('Nepravilno ebanie volki')
    }
    else {
        console.log('DataBase ----- Open');
    }
})

let query="SELECT * FROM users"; // вытягивание данных

connection.query(query, (err, result, field) => {
    console.log(err); // проверка на ошибки в начале
    console.log(result); // выводит результат
    //console.log(field); // выводит все поля...
})

// выключение сервера

connection.end(err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('DataBase ----- Close');
    }
    return true;
})

// Подключаем HTML

app.get("/", function (req, res ) {
    res.sendFile(__dirname + "/index.html");
})

// Подключаем нашу красоту!

app.use("/style",express.static("style"));

app.use("/scripts", express.static("scripts"))

// выставляем порт

app.listen(4500);