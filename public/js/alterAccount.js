function deleteLedger(){
    
    var ledgerName=document.getElementById('delete-ledger-name').value;
    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username,ledgerName:ledgerName}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/deleteLedger',options)
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        setTimeout(getLedgersEdit, 1000);
        setTimeout(getLedgersDelete, 1000);
        
    })
    
}
getLedgersDelete();
function getLedgersDelete(){
    
    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/getLedgers',options)
    .then(res=>res.json())
    .then(data=>{
        document.getElementById('delete-ledger-name').innerHTML="";
        console.log(data.data);
        data.data.forEach(ledger => {
            if(ledger.type==document.getElementById('delete-ledger-type').value){
                document.getElementById('delete-ledger-name').innerHTML+=`<option>${ledger.name}</option>`;
            }
        });
    })
}
document.getElementById('delete-ledger-type').addEventListener('change',getLedgersDelete);

getLedgersEdit();
function getLedgersEdit(){
    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/getLedgers',options)
    .then(res=>res.json())
    .then(data=>{
        document.getElementById('alter-ledger-name').innerHTML="";
        
        data.data.forEach(ledger => {
            if(ledger.type==document.getElementById('alter-ledger-type').value){
                document.getElementById('alter-ledger-name').innerHTML+=`<option>${ledger.name}</option>`;
            }
        });
    })
   
    setTimeout( getLedgerDetails, 1000);
}
document.getElementById('alter-ledger-type').addEventListener('change',getLedgersEdit);
document.getElementById('alter-ledger-name').addEventListener('change',getLedgerDetails);

function getLedgerDetails(){
    var ledgerName=document.getElementById('alter-ledger-name').value;
    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username,ledgerName:ledgerName}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/getLedgers',options)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.data);
        var data=data.data;
        for(var i=0;i<data.length;i++){
            if(data[i].name==ledgerName){
                console.log(data[i]);
                document.getElementById('ledger-new-name').value=data[i].name;
                document.getElementById('ledger-new-email').value=data[i].email;
                document.getElementById('ledger-new-contact').value=data[i].contact;
                document.getElementById('new-address').value=data[i].address;
                document.getElementById('new-postal-code').value=data[i].postalCode;
                document.getElementById('new-country').value=data[i].country;
                break;
            }
        }
    })
}

document.getElementById('submit-btn').addEventListener('click',deleteandaddnew);

function deleteandaddnew(){
    var ledgerName=document.getElementById('alter-ledger-name').value;
    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username,ledgerName:ledgerName}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/deleteLedger',options)
    .then(res=>res.json())
    .then(data=>{
        var username=window.localStorage.username;
        var type=document.getElementById('alter-ledger-type').value;
        var name=document.getElementById('ledger-new-name').value;
        var email=document.getElementById('ledger-new-email').value;
        var contact=document.getElementById('ledger-new-contact').value;
        var address=document.getElementById('new-address').value;
        var postalCode=document.getElementById('new-postal-code').value;
        var country=document.getElementById('new-country').value;

    

    var options={
        method:'POST',
        body: JSON.stringify({username,type,name,email,contact,address,postalCode,country}),
        headers: {
            'Content-Type': 'application/json'
    }};
    
    fetch("/addLedger",options)
    .then(res=>res.json())
    .then(data=>{
        alert("Ledger added successfully !")
        console.log({type,name,email,contact,address,postalCode,country});
    });

        
    })
}