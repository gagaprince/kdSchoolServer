"use strict";
var novelDao = require('../../db/noveldao/NovelDao');

module.exports = function(req, res,next,viewPath){
    novelDao.selectNovelsByPP(0,10,function(vals){
        res.render(viewPath, {
            layout: false,
            title:"列表",
            list:vals
        });
    });
};