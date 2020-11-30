const express=require('express');
const app=express();
const port = process.env.PORT || 3000;
app.listen(port);



app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.get('/signout',(req,res)=>{
    //change user isLoggedIn state in db
    res.redirect("/");
})

app.get('/login',(req,res)=>{
    var bool=true;
    if(bool)   //check in db whether user isLoggedIn
        res.json({isLoggedIn:true});
    else
        res.json({isLoggedIn:false});
})
app.post("/login",(req,res)=>{
    const user=req.body;
    console.log(user);
    //change state isLoggedin for corresponding user in db
    res.json({status:"success"});
})
app.get('/voucher',(req,res)=>{
    
   
        res.sendFile('voucher.html',{root:"./public"});
    
    
})
app.get('/register',(req,res)=>{
   
    res.sendFile('register.html',{root:"./public"});
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