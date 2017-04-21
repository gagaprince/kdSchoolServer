"use strict";
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var doT = require("express-dot");
var db = require('./db/db.js');
var ctrls = require('./ctrl/index');

var app = express();

// all environments
app.set('port', process.env.PORT || 3333);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine("html",doT.__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/index', routes.index);
app.all(/^[^.]+\.(jsp|html)$/,function(req, res, next) {
    var viewPath = req.path.slice(1, req.path.lastIndexOf('.'));
    console.log(viewPath);
    var ctrl = ctrls[viewPath];
    if(ctrl){
        ctrl(req,res,next,viewPath);
    }else{
        res.render(viewPath, {
            layout: false,
            request: req,
            response: res
        });
    }
});

app.all(/^\/api\/[^.]+$/,function(req, res, next) {
    var viewPath = req.path;
    console.log(viewPath);
    var ctrl = ctrls[viewPath];
    if(ctrl){
        ctrl(req,res,next,viewPath);
    }else{
        res.send({
            data:{},
            bstatus:{
                code:5,
                des:"找不到对应的接口"
            }
        })
    }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

db.init();
