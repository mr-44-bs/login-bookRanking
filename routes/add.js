var express = require('express');
// var session = require('express-session');
var router = express.Router();

// var markdown = require("markdown").markdown;

var mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rental',
    multipleStatements: true
});

connection.connect();

let max = 0;
connection.query('select id from employee;',(err,results) =>{
    if (err) throw err;        
    const newArray = results.map((item) => item.id);
    max = Math.max.apply(null, newArray);
    console.log(newArray);
    console.log(max);
})

router.get('/',(req,res,next) =>{
    var data = {
        title : '新規アカウント登録',
        content : 'アカウント登録をしてください'
    }
    res.render('add', data);
});



router.post('/',(req,res,next) => {
    max++;
    var id = max;
    var name = req.body.name;
    var ps = req.body.password;
    var store = req.body.store;
    console.log(id);
    console.log(name);
    connection.query('insert into employee (id,name,password,store) values (?,?,?,?)' ,
    [id,name,ps,store],
    (err,rows) =>{
        console.log(err);
        console.log(rows);
        res.redirect('/sale')
    })
});

module.exports = router;

//"'+id+'","'+name+'","'+ps+'","'+store+'"