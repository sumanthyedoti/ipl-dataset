const mysql = require('mysql');

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'ipl',
    password: 'mydb'
});
db.connect((err)=>{
    if(err){
        console.error('Unable to connect to database');
        throw err;
    }
    console.log('Connected to database "ipl"');
});

module.exports = {
    db
}