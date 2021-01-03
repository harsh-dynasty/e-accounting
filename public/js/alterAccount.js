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
        alert(`${ledgerName} deleted successfully from Ledger's list.`);
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
