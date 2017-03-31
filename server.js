"use strict";
var Promise = require('promise');
var SU = require('./utils/ssh2util');
var ssh = new SU();

new Promise(function(resolve, reject){
    //连接服务器
    ssh.connect({
        host: '182.92.1.128',
        port: 22,
        username: 'root',
        password: 'iloveyixin1~'
    },function(){
        console.log("connect");
        resolve();
    });
}).then(function(){
        //进入blog目录 查看文件目录  git pull
        return new Promise(function(resolve, reject) {
            ssh.exec('cd /root/work/blog && ls -l && git pull',function(err,data){
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    resolve(data);
                }
            });
        });
    }).then(function(){
        //进入blog目录  中断java进程
        return new Promise(function(resolve, reject) {
            ssh.exec('killall -9 java ',function(err,data){
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    resolve(data);
                }
            });
        });
    }).then(function(){
        //进入blog目录 查看文件目录  git pull
        return new Promise(function(resolve, reject) {
            ssh.exec('source /etc/profile && echo $PATH && sh /root/gagaTest/sharetab/restart_blog.sh > /root/work/blog/nohup.out 2>&1',function(err,data){
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    resolve(data);
                }
            });
        });
    }).then(function(){
        //进入blog目录 查看文件目录  git pull
        return new Promise(function(resolve, reject) {
            ssh.exec('ps -ef |grep java ',function(err,data){
                if (err) {
                    console.log(err);
                } else {
                    console.log(data);
                    resolve(data);
                }
            });
        });
    }).then(function(data){
        return new Promise(function(resolve, reject) {
            ssh.disconnect(function(){
                console.log("disconnect");
            });
        });
    });

