const http=require('http');
const bodyParser=require('body-parser');
const express=require('express');
const app=express();
const serverroutes=require('./public/server');
app.use(bodyParser.urlencoded({extended:false}));
app.use(serverroutes);
app.listen(3005);
