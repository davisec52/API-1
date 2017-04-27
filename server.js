var http = require("http");
var express = require("express");
var app = express();

function timeToTime(timeExp){
	var num = parseInt(timeExp);
	
	if(typeof parseInt(timeExp) === "number" && !isNaN(num)){
		var dateObj = new Date(timeExp * 1000);
	} else {
		dateObj = new Date(timeExp);
		var seconds = dateObj.getTime()/1000;
		seconds = seconds.toString();
	}
	var monthArr  = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december" ];
	var day = dateObj.getDate();
	var month = dateObj.getMonth();
	var monthStr  = monthArr[month];
	var firstAlpha = monthStr.charAt(0).toUpperCase();
	var truncMonth = monthStr.substring(1);
	var newMonthStr = firstAlpha + truncMonth;
	var year = dateObj.getFullYear();
	var prettyDate = newMonthStr  + " " + day + "," + year;

	if(typeof parseInt(timeExp) === "number" && !isNaN(num)){
		var solution = {"unix": timeExp, "natural": prettyDate};
			return solution;
	} else {
		var solution = {"unix": seconds, "natural": prettyDate};
		return solution;
	}

}

var datecheck = function(req, res, next){
	var test0 = /^JAN|^JANUARY|^FEB|^FEBRUARY|^MARCH|^MAR|^JULY^|^JUL|^AUGUST|^AUG|^SEPTEMBER|^SEPT|^SEP|^OCTOBER|^OCT|^NOVEMBER|^NOV|^DECEMBER|^DEC|\s\d+\s+^[1-9]\d{3}$/gi;
	var test1 = /[0-9]/g;
	var test2 = /[A-Za-z]/;
	var varExp = req.params.stampID;
	
	if( varExp.match(test1) && !varExp.match(test2)){
		next();
	} else if(varExp.match(test0)){
		next();
	} else {
		res.send({"unix": "null", "natural": "null"});
	}
}

//app.use(datecheck);

app.get("/:stampID", datecheck, function(req, res){
	var answer = timeToTime(req.params.stampID);
	res.status(200, function(err, res, next){
		if(err){
			console.log(err);
		} else {
			if(req.params.stampID){
				next();
			}
		}		
	}).send(answer);
}).listen(process.env.PORT, process.env.IP, function(){
	console.log("stampID server listening...");
});
