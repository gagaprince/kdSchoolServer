"use strict";
var mysql=require("mysql");
var pool ;
var _isInit = false;
var init = function(){
    if(!_isInit){
        _isInit = true;
        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '2675380lsy~',
            database: 'blog',
            port: 3306
        });
    }
}
var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //释放连接
                conn.release();
                //事件驱动回调
                callback(qerr,vals,fields);
            });
        }
    });
};

module.exports={
    init:init,
    query:query
};