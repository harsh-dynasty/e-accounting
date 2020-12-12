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

const userDataSchema = mongoose.Schema({
    username: String,
    ledgers:Array,
    stocks:Array,
    vouchers:Array
});

var usersData=mongoose.model('users_data',userDataSchema);
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

         let doc = new usersData({username});
         usersData.collection.insertOne(doc);
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

app.post('/addLedger',(req,res)=>{
    var username=req.body.username;
    var type=req.body.type;
    var name=req.body.name;
    var email=req.body.email;
    var contact=req.body.contact;
    var address=req.body.address;
    var postalCode=req.body.postalCode;
    var country=req.body.country;

    usersData.update({username:username},{
        $push: {ledgers: {type,name,email,contact,address,postalCode,country}}
    }).then(docs=>console.log(docs)).catch(err=>console.log(err))
    res.json({});
})

app.post("/addStocks",(req,res)=>{
    var username=req.body.username;
    var item_code=req.body.item_code;
    var item_name=req.body.item_name;
    var description=req.body.description;
    var category=req.body.category;
    var rate=req.body.rate;
    var quantity=0;

    usersData.update({username:username},{
        $push: {stocks: {item_code,category,item_name,description,rate,quantity}}
    }).then(docs=>console.log(docs)).catch(err=>console.log(err))
    res.json({});

})

app.post("/addVouchers",(req,res)=>{
    var username=req.body.username;
    var voucher_id=req.body.voucher_id;
    var voucher_type=req.body.voucher_type;
    var name=req.body.name;
    var date=req.body.date;
    var remarks=req.body.remarks;
    var payment_method=req.body.payment_method;
    var billing_total={
        total_quantity:req.body.total_item_quantity,
        total_amt:req.body.grand_total
    }
    
    var items=Object.values(req.body.items);

   
    usersData.update({username:username},{
        $push: {vouchers: {voucher_id,voucher_type,name,date,remarks,payment_method,billing_total,items}}
    }).then(docs=>console.log(docs)).catch(err=>console.log(err))

    
    usersData.find({username})
        .then(data=>{
            
            items.forEach(item=>{
                var i;
                for(i=0;i<data[0].stocks.length;i++){
                    if((data[0].stocks)[i].item_code==item.item_code){
                        
                        break;
                    }
                }
                console.log(i+"index");
                if(voucher_type=='Purchase'){
        
                    eval(`usersData.update({username:username},{
                        $inc: {"stocks.${i}.quantity": Number(item.quantity)}
                    }).then(docs=>console.log(docs)).catch(err=>console.log(err))`)
        
                }else{//voucher_type==sales
                    eval(`usersData.update({username:username},{
                        $inc: {"stocks.${i}.quantity": -Number(item.quantity)}
                    }).then(docs=>console.log(docs)).catch(err=>console.log(err))`)
                }
                
            })
            
        }).catch(err=>console.log(err))
    
    
    
    

    res.json({});

})

app.post('/getLedgers',(req,res)=>{
    var username=req.body.username;
    usersData.find({username})
    .then(data=>res.json({data:data[0].ledgers}))
    .catch(err=>console.log(err))
})

app.post('/getItems',(req,res)=>{
    var username=req.body.username;
    usersData.find({username})
    .then(data=>res.json({data:data[0].stocks}))
    .catch(err=>console.log(err))
})