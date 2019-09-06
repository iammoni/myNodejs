const express=require('express');
const app=express();
var exphbs  = require('express-handlebars');
const path=require('path');
const port=process.env.PORT ||4000;
//handlebar middlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// handlebars routes
app.get('/', function (req, res) {
    res.render('home',{
    	name:"Name is Dhanda"
    });
});
//set static folder
app.use(express.static(path.join(__dirname,'public')));
app.listen(port,()=>console.log(`Server is running at port :${port}`));
