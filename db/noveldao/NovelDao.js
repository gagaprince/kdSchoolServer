"use strict";
var db = require('../../db/db');

var NovelDao = {
    selectNovelsByPP:function(pno,psize,callback){
        var begin = pno*psize;
        var length = psize;
        var sql = 'select * from touch_novel limit '+begin+', '+length;
        console.log(sql);
        db.query(sql,function(qerr,vals,fields){
            if(qerr){
                console.log(qerr);
            }else{
                callback(vals);
            }
        });
    }
}

module.exports = NovelDao;