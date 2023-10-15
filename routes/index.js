const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rental'
});

router.get("/",(req,res) => {
  const data = {
      title:'idとパスワードを入力してください'
  }
  res.render('index.ejs', data)
});


router.post("/",(req,res) => {
  const passWord = req.body.password;
  let comment = '';
  let ps = '';
  pool.query('SELECT * FROM employee where name="'+req.body.name+'" ',function (error, results, fields){
      if (error) throw error;

      if (results.length == 0){
          comment='ユーザー登録されていません'
          res.render('index', {title : comment
          });
          
      }else if(passWord !== results[0].password){
        comment='パスワードが違います';
        res.render('index', {title : comment
        });
      }else{
        comment='ログイン成功';
        res.redirect('/sale');
      }})
 
      
});
module.exports = router;