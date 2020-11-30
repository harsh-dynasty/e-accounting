isLoggedIn();

function isLoggedIn(){
    fetch('/isLoggedIn')
        .then(res=>res.json())
        .then(data=>{
            if(data.isLoggedIn)
                window.open("/voucher","_self");
            console.log(data.isLoggedIn);
        })
}



    
