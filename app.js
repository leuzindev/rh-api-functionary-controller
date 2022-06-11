const express = require('express');
const bodyParser =require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const urlencodeParser = bodyParser.urlencoded({extended: false});

const sql = mysql.createConnection({
    host:'localhost',
    user: 'sqluser',
    password: 'password',
    port: 3306
})
sql.query('use startup');

const port = 3000;
const app = express();


app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine','handlebars');

app.use('/img', express.static('img'))
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));


app.get('/' , (req,res) => {
    res.render('index');
})

app.get('/inserir', (req, res) => {
    res.render('inserir');
});

app.get('/select/:id?', (req,res) => {
    if(!req.params.id){
        sql.query('select * from user order by id asc', (err, results, fields) => {
            res.render('select', { data: results });
        })
    }else{
        sql.query('select * from user order by id asc'), [req.params.id], (err, results, fields) => 
        {
            res.render('select', { data: results });
    }
}});

app.post('/controllerForm', urlencodeParser, (req, res) => {
    sql.query("insert into user value (?,?,?,?,?,?)", [req.body.id,req.body.name,req.body.email,req.body.area,req.body.senha,req.body.repsenha]);
    res.render('controllerForm');
})

app.get('/deletar/:id', (req, res) => {
    sql.query('delete from user where id=?', [req.params.id]);
    res.render('deletar');
})

app.get('/update/:id', (req, res) => {
    sql.query('select * from user where id=?', [req.params.id], (err, results, fields) => {
        res.render('update', {id:req.params.id,name:results[0].name,email:results[0].email,area:results[0].area});
    });
});

app.post('/controllerUpdate', urlencodeParser, (req, res) => {
    sql.query('update user set name=?,email=?,area=? where id=?',
    [req.body.name,req.body.email,req.body.area,req.body.id]);
    res.render('controllerUpdate');
});

app.listen(port, () => {
    console.log(`Escutando em localhost:${port}`);
});

module.exports = app;