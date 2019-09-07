//this is my node js project 3
const express=require('express');
const app=express();
var exphbs  = require('express-handlebars');
const path=require('path');
const request=require('request');
const bodyparser=require('body-parser');
const port=process.env.PORT ||4000;
//body-parser middleware
app.use(bodyparser.urlencoded({extended:false}));
// API 	 pk_9c2cd272c75a406a87e909cc2e0a4795
function callApi(finishedAPI,c_name) {
	request('https://cloud.iexapis.com/stable/stock/'+c_name+'/quote?token=pk_9c2cd272c75a406a87e909cc2e0a4795', { json: true }, (err, res, body) => {
	if (err) {
		return console.log(err);
	}
	if (res.statusCode === 200){
		finishedAPI(body);
		};
	});
};
//handlebar middlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// handlebars routes
app.get('/',(req,res)=>{
callApi(function(doneAPI){
	res.render('home',{
		stock:doneAPI
	})
},"goog")
});
//post request
app.post('/',(req,res)=>{
	callApi(function(doneAPI){
		res.render('home',{
			stock:doneAPI
		});
	},req.body.company_name);
});
//set static folder
app.use(express.static(path.join(__dirname,'public')));
app.listen(port,()=>console.log(`Server is running at port :${port}`));
