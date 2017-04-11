"use strict";
var db = require('../../db/db');

var indexCtrl = {
    getRecommend:function(callback){
        if(!callback){
            return;
        }
        db.query('select * from touch_novel limit 4',function(qerr,vals,fields){
            if(qerr){
                console.log(qerr);
            }else{
                console.log(vals);
                callback(vals);
            }
        })
    },
    getBoy:function(callback){
        if(!callback){
            return;
        }
        db.query('select * from touch_novel where name like "%斗%" limit 8',function(qerr,vals,fields){
            if(qerr){
                console.log(qerr);
            }else{
                console.log(vals);
                callback(vals);
            }
        })
    },
    getGirl:function(callback){
        if(!callback){
            return;
        }
        db.query('select * from touch_novel where name like "%霸道%" or name like "%极品%" limit 8',function(qerr,vals,fields){
            if(qerr){
                console.log(qerr);
            }else{
                console.log(vals);
                callback(vals);
            }
        })
    },
    getUpdate:function(callback){
        if(!callback){
            return;
        }
        db.query('select * from touch_novel s order by update_time desc limit 8;',function(qerr,vals,fields){
            if(qerr){
                console.log(qerr);
            }else{
                console.log(vals);
                callback(vals);
            }
        })
    },
    prepareData:function(callback){
        if(!callback){
            return;
        }
        var _this = this;
        this.getRecommend(function(recommend){
            _this.getBoy(function(boy){
                _this.getGirl(function(girl){
                    _this.getUpdate(function(update){
                        callback({
                            recommend:recommend,
                            boy:boy,
                            girl:girl,
                            update:update
                        });
                    });
                })
            });
        })
    }
};


module.exports = function(req, res,next,viewPath){
    indexCtrl.prepareData(function(data){
        res.render(viewPath, {
            layout: false,
            data:data
        });
    });
};