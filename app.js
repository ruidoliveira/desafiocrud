const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


//string de conexao -> 
const url = 'mongodb+srv://usuario_admin:admin@clusterapi.xvkkz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const options = {poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true}

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) =>{
    console.log(`Erro na conexão com o banco de dados:` + err);
})

mongoose.connection.on('disconnected', () =>{
    console.log(`Aplicação desconcectada do bando de dados!`);
})

mongoose.connection.on('connected', () =>{
    console.log(`✅ Aplicação conectada do bando de dados!`);
});


//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());




const usersRoute = require('./Routes/user.js');
const cityRoute = require('./Routes/city.js');


app.use('/users', usersRoute);
app.use('/city', cityRoute);

app.listen(3000);
module.exports = app;