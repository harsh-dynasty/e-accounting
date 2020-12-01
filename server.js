const express=require('express');
const app=express();
const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`Server started at port ${port}...`));


///////////////////////
const mongoose = require('mongoose');
 
mongoose.connect('mongodb+srv://dbUser:1234@cluster0.afpe2.mongodb.net/eaccounting?retryWrites=true&w=majority')
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err));

const registeruserSchema = mongoose.Schema({
    name:String,
    username:String,
    password:String
});

var regUsers=mongoose.model('registered_users',registeruserSchema);
///////////////////////
app.use(express.static('public'));
app.use(express.json());

app.get('/voucher',(req,res)=>{
   
    res.sendFile('voucher.html',{root:"./public"});
})
app.get('/register',(req,res)=>{
    res.sendFile('register.html',{root:"./public"});
   
})

app.post('/login',(req,res)=>{
    var username=req.body.username;
    var password=req.body.password;
    console.log({username,password});
    //check whether username exists or not in regUsers
    //if exists check for password
    //if password matched add user to active user and open voucher
    //if not matched give error mssg
    //if username not exists give error username not registered
    regUsers.find({username})
    .then((docs)=>{
        if(docs.length==0){
            res.json({mssg:'Username not registered'});
           
        }
        else{
            if(docs[0].password==password){
                res.json({mssg:'Success'});
            }
                
            else
                res.json({mssg:'Invalid password'});
        }
    })
    .catch((err)=>{
    console.log(err);
    })

})
app.post('/register',(req,res)=>{
    var name=req.body.name;
    var username=req.body.username;
    var password=req.body.password;
    //check whether username exists or not
    //if exist err
    //else save to database
    regUsers.find({username}) 
    .then((doc) => {
       if (doc.length!=0) {
         res.json({mssg:'User already registered'});
       } else {
        let Newuser = new regUsers({name,username,password});
        regUsers.collection.insertOne(Newuser)
          .then((data)=>{
            res.json({mssg:'Successfully registered'});
          }).catch((err)=>{
            console.log(err);
         })
       }
    })
   .catch((err) => {
     console.log(err);
    });
})


app.get('/addToStocks',(req,res)=>{
    res.sendFile('addToStocks.html',{root:"./public"});
})
app.get('/alterStocks',(req,res)=>{
    res.sendFile('alterStocks.html',{root:"./public"});
})
app.get('/allStocks',(req,res)=>{
    res.sendFile('allStocks.html',{root:"./public"});
})
app.get('/purchase-sales',(req,res)=>{
    res.sendFile('purchase-sales.html',{root:"./public"});
})
app.get('/addAccount',(req,res)=>{
    res.sendFile('addAccount.html',{root:"./public"});
})
app.get('/alterAccount',(req,res)=>{
    res.sendFile('alterAccount.html',{root:"./public"});
    
})
app.get('/allAccounts',(req,res)=>{
    res.sendFile('allAccounts.html',{root:"./public"});
    
})
app.get('/contact',(req,res)=>{
    res.sendFile('contact.html',{root:"./public"});
})
