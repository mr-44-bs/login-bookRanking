
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rental',
    multipleStatements: true
});
connection.connect();
router.get("/", (req, res, next)=>{
    connection.query("select A.product_id,A.count from (select product_id, count(*) as count from rental group by product_id order by count DESC limit 3) as A; select product_id,rental_date,user_id from rental where rental_date between '2023/01/01' and '2023/01/28';  select product_id,release_date from cd where release_date > '2023/02/01'; select product_id,release_date from dvd where release_date > '2023/02/01';", function(err, result, fields){
      if(err)throw err;
        res.render('sale', { all: result});
    })
})








// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'rental',
//     //multipleStatements: true
// });

// router.get("/", (req, res, next)=>{
    
//     let table1 = undefined;
//     let table2 = undefined;
//     // let table3 = [];
//     // let login = false;

//     pool.query("select product_id, count(product_id) as count from rental group by product_id order by count DESC limit 5;",function (error, results, fields){
//         if (error) throw error;
//         table1 = results;
//         console.log(table1);
//     });

//     pool.query("select product_id,rental_date,user_id from rental;",function (error, results, fields){
//         if (error) throw error;
//         table2 = results;
//         console.log(table2);
        
//     });

//     async function myAsync() {
 
//         const table1 = await pool.query("select product_id, count(product_id) as count from rental group by product_id order by count DESC limit 5;",function (error, results, fields){
//             if (error) throw error;
//         });
     
//         console.log(table1);
     
//     }
     
    


//     async function myAsync2() {
 
//         const table2 = await pool.query("select product_id,rental_date,user_id from rental;",function (error, results, fields){
//             if (error) throw error;
            
//         });
     
//         console.log(table2);
     
//     }
//     myAsync2();

//     // pool.query("'select product_id,release_date from cd where release_date > '2023/02/01'; ",function (error, results, fields){
//     //     if (error) throw error;
//     //     table3 = results;
//     //     console.log(table3);
//     // });
//     const data = {
//             table1:myAsync(),
//             table2:myAsync2()
//         }
//     console.log(data);
    

//         res.render('sale', data);









// //     pool.query("select A.product_id,A.count from (select product_id, count(*) as count from rental group by product_id order by count DESC limit 3) as A; select product_id,rental_date,user_id from rental where rental_date between '2023/01/01' and '2023/01/28';  select product_id,release_date from cd where release_date > '2023/02/01'; select product_id,release_date from dvd where release_date > '2023/02/01';", function(err, result, fields){
// //       if(err)throw err;
// //         console.log(result);
// //         console.log(err);
// //         // console.log(result[1]);
// //         // console.log(result[2]);
// //         // console.log(result[3]);
// //         res.render('sale', { all: result});
// //     })
// //     //connection.end();
//  })

module.exports = router;

//select A.product_id,A.count from (select product_id, count(*) as count from rental group by product_id order by count DESC limit 3) as A; select product_id,rental_date,user_id from rental where rental_date between '2023/01/01' and '2023/01/28';  select product_id,release_date from cd where release_date > '2023/02/01'; select product_id,release_date from dvd where release_date > '2023/02/01';