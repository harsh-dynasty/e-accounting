
const localStorage=window.localStorage;
let isUsernameValid=false;
let isPasswordValid=false;

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

    if(isUsernameValid && isPasswordValid){
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
    }
    
    
})

document.getElementById('username').addEventListener('input',()=>{
    var regex= new RegExp("^[a-z0-9]{6,}$");
    var string=document.getElementById('username').value;
    if(regex.test(string)){
        isUsernameValid=true;
        document.getElementById('username-message').textContent="";
    }
    else{
        document.getElementById('username-message').textContent="Username length must be 6 or more characters long.\n Username must only contain lower case letters and numerals.";
    }
})
document.getElementById('password').addEventListener('input',()=>{
    var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var string=document.getElementById('password').value;
    if(regex.test(string)){
        isPasswordValid=true;
        document.getElementById('password-message').textContent="";
    }else{
        document.getElementById('password-message').textContent="Password length must be 8 or more characters long.\nPassword must contain atleast one lower case, upper case letter and a special symbol.";
    }
})
