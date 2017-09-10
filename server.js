var express = require("express");
var request = require("request");
var bodyParser= require("body-parser");
var app = express();
var path = process.cwd();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use("/public", express.static(path+"/public"));

app.get("/",function(req,res){
	res.sendFile(path+"/public/home.html");
})

app.get("/initial",function(req,res){
	var symbol = "AAPL";
	url = "https://www.quandl.com/api/v3/datasets/WIKI/"+
			symbol+".json?limit=30&collapse=weekly&api_key=iqGbS_AtBdZD14knHxYg";
	
	request(url,function(err,response,body){
		
		if(JSON.parse(body)["quandl_error"]){
			res.send("error");
		}
		else{
		res.send(body);
		}
	});

})


app.post("/add/symbols",function(req,res){
	var symbol = req.body.symbol;
	url = "https://www.quandl.com/api/v3/datasets/WIKI/"+
			symbol+".json?limit=30&collapse=weekly&api_key=iqGbS_AtBdZD14knHxYg";
	
	request(url,function(err,response,body){
		
		if(JSON.parse(body)["quandl_error"]){
			res.send("error");
		}
		else{
			res.send(body);
		}
	});

});

app.listen(8080,function(){
	console.log("App is listening on port %s.",8080);
})