const express=require('express');
var bodyParser = require('body-parser');
const hbs=require('hbs');
const fs=require('fs');
const port=process.env.PORT||3000;
var app=express();
hbs.registerPartials(__dirname+'/views/partials');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set('view engine','hbs');
app.use((req,res,next)=>{
	var now= new Date().toString();
	var log=`${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFileSync('server.log',log+'\n',(error)=>{
		if(error){
			console.log("Unable to log");
		}
	})
	next();
});
// app.use((req,res,next)=>{
// 	res.render(('maintain.hbs'))
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('currentyear',()=>{
	return new Date().getFullYear();
});
app.get('/',(req,res)=>{
// res.send('Hello Express');
res.render('form.hbs');
});

app.post('/indeex',urlencodedParser,(req,res)=>{
// res.send('Hello Express');
res.render('indeex.hbs',{data:req.body})
});

app.get('/indeex',(req,res)=>{
// res.send('Hello Express');
res.render('indeex.hbs');
});

app.listen(port,()=>{
	console.log(`Server is up on port ${port}`);
});
