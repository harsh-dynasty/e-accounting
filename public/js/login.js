fetch('/isLoggedIn')
        .then(res=>res.json())
        .then(data=>{
            if(data.isLoggedIn)
                window.open("/voucher","_self");
        })
    
