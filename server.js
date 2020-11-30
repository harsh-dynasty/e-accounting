const express=require('express');
const app=express();
const port = process.env.PORT || 3000;
app.listen(port);

var users={};

const mongoose = require('mongoose');
 
mongoose.connect('mongodb+srv://dbUser:1234@cluster0.afpe2.mongodb.net/eaccounting?retryWrites=true&w=majority')
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err));

const userSchema = mongoose.Schema({
    ip:String,
    username:String,
});

var Users=mongoose.model('active_users',userSchema);


app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.get('/user',(req,res)=>{
    eval(`res.json({username:users["${req.ip}"]})`);
   
})

app.get('/isLoggedIn',(req,res)=>{
    if(eval(`users["${req.ip}"]==undefined`))
        res.json({isLoggedIn:false});
    else
        res.json({isLoggedIn:true});
    
})
app.get('/voucher',(req,res)=>{
    if(eval(`users["${req.ip}"]==undefined`))
        res.redirect('/');
    else
        res.sendFile('voucher.html',{root:"./public"});

    
})
app.get('/register',(req,res)=>{
    if(eval(`users["${req.ip}"]==undefined`))
        res.sendFile('register.html',{root:"./public"});
    else
        res.sendFile('voucher.html',{root:"./public"});
   
})

app.post('/login',(req,res)=>{
    var username=req.body.name;
    var password=req.body.password;
    
    if(username.length>0){  //validate username and password inside this block
        
        let user = {ip:req.ip,username:username};
        Users.collection.insertOne(user)
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
        res.redirect("/voucher");
        
    }
    
})
app.post('/register',(req,res)=>{
    var username=req.body.username;
    var password=req.body.password;
    var name=req.body.name;
    if(username.length>0){  //save username and password in db after validating
        
        res.redirect("/voucher");
        
    }
})


app.get('/addToStocks',(req,res)=>{
    if(eval(`users["${req.ip}"]==undefined`))
        res.redirect('/');
    else
        res.sendFile('addToStocks.html',{root:"./public"});
})
app.get('/alterStocks',(req,res)=>{
    if(eval(`users["${req.ip}"]==undefined`))
        res.redirect('/');
    else
        res.sendFile('alterStocks.html',{root:"./public"});
})
app.get('/allStocks',(req,res)=>{
    if(eval(`users["${req.ip}"]==undefined`))
        res.redirect('/');
    else
        res.sendFile('allStocks.html',{root:"./public"});
})
app.get('/purchase-sales',(req,res)=>{
    if(eval(`users["${req.ip}"]==undefined`))
        res.redirect('/');
    else
        res.sendFile('purchase-sales.html',{root:"./public"});
})
app.get('/addAccount',(req,res)=>{
    if(eval(`users["${req.ip}"]==undefined`))
        res.redirect('/');
    else
        res.sendFile('adAccount.html',{root:"./public"});
})
app.get('/alterAccount',(req,res)=>{
    
    if(eval(`users["${req.ip}"]==undefined`))
        res.redirect('/');
    else
        res.sendFile('alterAccount.html',{root:"./public"});
})
app.get('/allAccounts',(req,res)=>{
    
    if(eval(`users["${req.ip}"]==undefined`))
        res.redirect('/');
    else
        res.sendFile('allAccounts.html',{root:"./public"});
})
app.get('/contact',(req,res)=>{
    if(eval(`users["${req.ip}"]==undefined`))
        res.redirect('/');
    else
        res.sendFile('contact.html',{root:"./public"});
})

app.get('/signout',(req,res)=>{
    console.log(eval(`users["${req.ip}"]`));
    eval(`delete users["${req.ip}"]`);
    res.redirect("/");
})