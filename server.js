const express=require('express');
const app=express();
const port = process.env.PORT || 3000;
app.listen(port);

var users={};

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));

app.get('/signout',(req,res)=>{
   
})
app.get('/user',(req,res)=>{
    res.json({username:eval(`users["${req.ip}"]`)});
   
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
        res.sendFile('regster.html',{root:"./public"});
    else
        res.sendFile('voucher.html',{root:"./public"});
   
})

app.post('/login',(req,res)=>{
    var username=req.body.name;
    var password=req.body.password;
    
    if(username.length>0){  //validate username and password inside this block
        eval(`users["${req.ip}"]=username`);
        console.log(users);
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
    eval(`del users["${req.ip}"]`);
    res.redirect("/");
})