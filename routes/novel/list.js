"use strict";
var db = require('../../db/db');

module.exports = function(req, res,next,viewPath){
    db.query('select * from touch_novel limit 3',function(qerr,vals,fields){
        if(qerr){
            console.log(qerr);
        }else{
            console.log(vals);
            res.render(viewPath, {
                layout: false,
                title:"列表",
                list:vals
            });
        }

    })


};