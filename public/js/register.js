
const localStorage=window.localStorage;

function isLoggedIn(){
    
    if(localStorage.getItem('username')!=undefined)
        window.open("/voucher",'_self');
}
isLoggedIn();
document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    const name=document.getElementById('name').value;
    const username=document.getElementById('username').value;
    const password=document.getElementById('password').value;
    fetch("/register",{
        method:'POST',
        body: JSON.stringify({name,username,password}),
        headers: {
            'Content-Type': 'application/json'
        }

    }).then(res=>res.json())
    .then(data=>{
        if(data.mssg=='Successfully registered'){
            alert(data.mssg);
            window.open('/','_self');
        }
        else {
            document.getElementById('message').textContent=data.mssg;
            setTimeout(()=>{document.getElementById('message').textContent="";},1500);
        }
    });
})
