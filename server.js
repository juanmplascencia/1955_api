var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    port = 8000,
    mongoose = require("mongoose"),
    app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/1955_api');

var  NameSchema= new mongoose.Schema({
    name: String
});

var Name = mongoose.model('cats', NameSchema);

app.get('/',function(req, res){
    Name.find({},function(err,results){
        if(err){
            console.log("Find Error: ",err);
        }
        else{
            res.json(results)
        }
    });
});

app.get('/new/:name',function(req, res){
    Name.create({name: req.params.name},function(err,results){
        if(err){
            console.log("Create error: ",err);
        }
        else{
            res.json(results);
        }
    });
});

app.get('/:name',function(req, res){
    Name.find({name: req.params.name},function(err,results){
        if(err){
            console.log("Find error: ",err);
        }
        else{
            res.json(results);
        }
    });
});

app.get('/remove/:name',function(req, res){
    Name.remove({name: req.params.name},function(err,results){
        if(err){
            console.log("Remove error: ",err);
        }
        else{
            res.json(results);
        }
    });
});

app.listen(port, function() {
    console.log("listening on port: ", port);
});

