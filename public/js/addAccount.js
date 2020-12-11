document.getElementById("submit-btn").addEventListener('click',addLedger);

function addLedger(){
    var username=window.localStorage.username;
    var type=document.getElementById('ledger-type').value;
    var name=document.getElementById('ledger-name').value;
    var email=document.getElementById('ledger-email').value;
    var contact=document.getElementById('ledger-contact').value;
    var address=document.getElementById('address').value;
    var postalCode=document.getElementById('postal-code').value;
    var country=document.getElementById('country').value;

    console.log({type,name,email,contact,address,postalCode,country});

    var options={
        method:'POST',
        body: JSON.stringify({username,type,name,email,contact,address,postalCode,country}),
        headers: {
            'Content-Type': 'application/json'
    }};
    
    fetch("/addLedger",options)
    .then(res=>res.json())
    .then(data=>alert("Ledger added successfully !"));

    
}