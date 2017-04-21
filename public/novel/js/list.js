"use strict";
var timeout = null;
var list = {
    currentPage:1,
    key:"",
    listPage:"/api/novel/listByPage",
    init:function(){
        this.initData();
        this.initListener();
    },
    initData:function(){
        this.key = Util.getQueryString("key");
    },
    renderPage:function(){
        var _this = this;
        var option={
            pno:this.currentPage,
            key:this.key
        }
        Util._api(this.listPage,option,function(code,desc,data,res){
            var list = data;
            _this.renderHtml(list);
        });
    },
    renderHtml:function(list){
        var html = '';
        var len = list.length;
        for(var i=0;i<len;i++){
            var novel = list[i];
            var descripe = novel.descripe||"";
            if(descripe.length>40){
                descripe = descripe.substring(0,40)+"...";
            }
            var tpl = ['<div class="item h-l-u novel-item" novelid="'+novel.id+'" link="http://www.37zw.com/0/613/" onclick="">',
                '            <div class="cover">',
                '                <img src="http://www.37zw.com'+novel.cover+'" alt="" />',
                '            </div>',
                '            <div class="desc-frame">',
                '                <div class="info h-l">',
                '                    <div class="name h-c">',
                '                       '+novel.name,
                '                    </div>',
                '                    <div class="author h-c">',
                '                        '+novel.author,
                '                    </div>',
                '                </div>',
                '                <div class="desc">',
                '                    '+descripe,
                '                </div>',
                '            </div>',
                '            <div class="arrow-frame">',
                '                <div class="arrow">',
                '                    <div class="bg-frame"></div>',
                '                    <div class="front-frame"></div>',
                '                </div>',
                '            </div>',
                '        </div>'].join("");
            html+=tpl;
        }
        $("#novelList").append(html);
        this.currentPage++;
    },
    initListener:function(){
        var _this = this;
        $(window).scroll(function() {
            if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
                if(timeout){
                    clearTimeout(timeout);
                    timeout = null;
                }
                timeout = setTimeout(function(){
                    _this.renderPage();
                },300);
            }
        });
    }
}
$(document).ready(function(){
    list.init();
});