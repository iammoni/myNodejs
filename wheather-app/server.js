
let express=require('express');
let app=express();
let bodyParser=require('body-parser');
const request=require('request');
const apiKey='dd5a3c6fa04216de653de1ef342c9392';
let port=process.env.PORT||3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
res.render("index");
});
app.post('/',(req,res)=>{
  const city=req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  request(url,(err,response,body)=>{
    if(err){
      res.render('index',{weather:null,error:"Error, please try again"
      })
    }
    else{
      let wheather=JSON.parse(body);
      if(wheather.main==undefined){
        res.render('index',{weather:null,error:"Error, please try again 2"
      })
      }
      else{
        let weatherText = `It's ${wheather.main.temp} degrees in ${wheather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  })
});
// request(url,(err,response,body)=>{
// if(err){
//   console.log(err);
//   }
//   else{
//     let wheather=JSON.parse(body);
//     console.log(`It's temp is:${wheather.main.temp} degree and city is ${wheather.name}`);
//   }
// });
app.listen(port,()=>{console.log(`app is running at port:${port}`)});
