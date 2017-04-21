var db = require('../../db/db');

module.exports = function(req, res,next,viewPath){
    var pno = req.body.pno||req.query.pno||0;
    var cate = req.body.key||req.query.key||"玄幻";
    console.log("page:"+pno);
    console.log("key:"+cate);
    var begin = pno*10;
    db.query('select * from touch_novel where cate = "'+cate+'小说" limit '+begin+' , 10',function(qerr,vals,fields){
        if(qerr){
            console.log(qerr);
            res.send({
                data:{},
                bstatus:{
                    code:100,
                    des:"服务器错误"
                }
            });
        }else{
            res.send({
                data:vals,
                bstatus:{
                    code:0,
                    des:""
                }
            });
        }

    });
};