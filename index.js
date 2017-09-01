var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

var redis = require("redis");
var client = redis.createClient(10001);

client.on("error",function(err){
    console.log("error:"+err);
});

app.get('/',function(req,res,error){
    // res.send("Hello world");
    res.sendFile(__dirname + "/index.html")
});

app.post('/add',urlencodedParser,function(req,res,next){
    var order = {
        tel : req.body.tel,
        name : req.body.name,
        carId : req.body.carId
    };
    client.sadd("order",JSON.stringify(order));

    res.send("success");
});

var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('example app listening at http://%s:%s',host,port);
});
