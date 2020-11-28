const express=require('express');
const app=express();
const port = process.env.PORT || 3000;
app.listen(port);

var users=[];

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.get('/signout',(req,res)=>{
    users=[];
    res.redirect("/");
})
app.get('/user',(req,res)=>{
    
    res.json({username:users[0].username});
})

app.get('/login',(req,res)=>{
    if(users.length==0)
        res.json({isLoggedIn:false});
    else
        res.json({isLoggedIn:true});
})
app.get('/voucher',(req,res)=>{
    
    if(users.length==0)
        res.redirect('/');
    else
        res.sendFile('voucher.html',{root:"./public"});
    
})
app.get('/register',(req,res)=>{
    if(users.length==0)
        res.sendFile('register.html',{root:"./public"});
    else
        res.redirect('/voucher');
})

app.post('/login',(req,res)=>{
    var username=req.body.name;
    var password=req.body.password;
    if(username.length>0){          //validate username and password
        users.push({username,password});
        res.redirect('/voucher');
    }
    else
        res.redirect('/');
})
app.post('/register',(req,res)=>{
   
})


app.get('/addToStocks',(req,res)=>{
    if(users.length==0)
        res.redirect('/');
    else
        res.sendFile('addToStocks.html',{root:"./public"});
})
app.get('/alterStocks',(req,res)=>{
    if(users.length==0)
        res.redirect('/');
    else
        res.sendFile('alterStocks.html',{root:"./public"});
})
app.get('/allStocks',(req,res)=>{
    if(users.length==0)
        res.redirect('/');
    else
        res.sendFile('allStocks.html',{root:"./public"});
})
app.get('/purchase-sales',(req,res)=>{
    if(users.length==0)
        res.redirect('/');
    else
        res.sendFile('purchase-sales.html',{root:"./public"});
})
app.get('/addAccount',(req,res)=>{
    if(users.length==0)
        res.redirect('/');
    else
        res.sendFile('addAccount.html',{root:"./public"});
})
app.get('/alterAccount',(req,res)=>{
    if(users.length==0)
        res.redirect('/');
    else
        res.sendFile('alterAccount.html',{root:"./public"});
})
app.get('/allAccounts',(req,res)=>{
    if(users.length==0)
        res.redirect('/');
    else
        res.sendFile('allAccounts.html',{root:"./public"});
})
app.get('/contact',(req,res)=>{
    if(users.length==0)
        res.redirect('/');
    else
        res.sendFile('contact.html',{root:"./public"});
})