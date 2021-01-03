function getLedgers(){
    document.getElementById('all-ledgers-table').innerHTML='';
    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/getLedgers',options)
    .then(res=>res.json())
    .then(data=>{
        var count=1;
        data.data.forEach(ledger => {
            if(ledger.type==document.getElementById('ledger-type').value){
                console.log(ledger);
                document.getElementById('all-ledgers-table').innerHTML+=`
                <tr>
                <td>${count}</td>
                <td>${ledger.name}</td>
                <td>${ledger.contact}</td>
                <td>${ledger.email}</td>
                <td>${ledger.address} , ${ledger.postalCode} ,${ledger.country}</td>                               
                </tr>
                `;
                count++;
            }
        });
    });
}
getLedgers();
document.getElementById('ledger-type').addEventListener('change',getLedgers);
