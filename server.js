var express = require("express");

var http = require("http");

http.createServer(function(req, res){
    res.writeHead(200, {"content-type": "text/html"});
    res.end("<h1>Hello World. We are now doing the initial test for the first API challenge.</h0>");
}).listen(process.env.PORT, process.env.IP, function(){
    console.log("Server connected and listening...")
});
