const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) =>{
      res.sendFile('D:/Pulpit/CodersCamp/toDoList/index.html');//tu mam na sztywno ustawione na razie więc trzeba to sobie przestawić albo ustawić za pomocą path
});

module.exports = app;