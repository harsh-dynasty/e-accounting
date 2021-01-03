
const localStorage=window.localStorage;
function isLoggedIn(){
    
    if(localStorage.getItem('username')!=undefined)
        window.open("/voucher",'_self');
}
isLoggedIn();
document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    
    fetch("/login",{
        method:'POST',
        body: JSON.stringify({username,password}),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(res=>res.json())
    .then(data=>{
        if(data.mssg=="Success"){
            localStorage.setItem('username',username);
            window.open('/voucher','_self');
            
        }
        else{
            document.getElementById('message').textContent=data.mssg;
            setTimeout(()=>{document.getElementById('message').textContent="";},1500);
        }
    });
})
