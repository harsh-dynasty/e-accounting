function sendEmail(){
    var name=document.getElementById('name').value;
    var email=document.getElementById('email').value;
    var subject=document.getElementById('subject').value;
    var message=document.getElementById('message').value;
   
    var options={
        method:'POST',
        body: JSON.stringify({name,email,subject,message}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/gmail',options)
    .then(res=>res.json())
    .then(data=>{
       
        document.getElementById('name').value="";
        document.getElementById('email').value='';
        document.getElementById('subject').value='';
        document.getElementById('message').value='';
    })
}
document.getElementById('submit-btn').addEventListener('click',sendEmail);
