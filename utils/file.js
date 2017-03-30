"use strict";
var fs= require('fs');
var path = require('path');

var fileUtil = {
    writeToFile:function(str,path){
    },
    writeToDirFile:function(str,path){
        var filePath = path.join(__dirname,'temp/'+path+'.txt');
        fs.writeFile(filePath,str);
    }
};

module.exports = fileUtil;