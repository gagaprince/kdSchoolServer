"use strict";
var util = window.Util = {
    getQueryString:function(name,urldefault){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var url = urldefault || window.location.search.substr(1);
        var r = url.match(reg);
        if (r != null)
            return decodeURIComponent(r[2]);
        return null;
    },
    _api:function(url,data,callback){
        $.ajax({
            url:url,
            data:data,
            type : 'POST',
            dataType : 'json',
            timeout : 3e4,
            success:function(res){
                if(typeof res=="string"){
                    res = JSON.parse(res);
                }
                console.log(res);
                var status = res.bstatus;
                if(callback){
                    callback(status.code,status.des,res.data,res);
                }
            }
        });
    }
}