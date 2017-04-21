"use strict";
var index = {
    init:function(){
        this.initListener();
    },
    initListener:function(){
        $("body").on("click",".cate",function(){
            var cate = $(this).html();
            window.location = "list.html?key="+cate;
        });
    }
}
$(document).ready(function(){
    index.init();
});