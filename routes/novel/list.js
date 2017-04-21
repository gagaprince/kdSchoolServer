"use strict";
var db = require('../../db/db');

module.exports = function(req, res,next,viewPath){
    var cate = req.query.key;
    console.log(cate);
    db.query('select * from touch_novel where cate = "'+cate+'小说" limit 10',function(qerr,vals,fields){
        if(qerr){
            console.log(qerr);
        }else{
            console.log(vals);
            res.render(viewPath, {
                layout: false,
                title:cate+"小说",
                list:vals
            });
        }

    })


};