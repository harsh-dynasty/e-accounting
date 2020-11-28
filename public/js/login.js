fetch('/login')
    .then(res=>res.json())
    .then(data=>{
        if(data.isLoggedIn)
            window.open('/voucher',"_self");
        else
            console.log("Not logged in");
    });