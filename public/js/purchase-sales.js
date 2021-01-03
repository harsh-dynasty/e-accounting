var prev_cat=document.getElementById('category').value;




function loadData(){
    
    var category=document.getElementById('category').value;
    if(category!=prev_cat){
        prev_cat=category;
       
        document.getElementById('ledger-name').value='All';
    }
    var ledger_name=document.getElementById('ledger-name').value;
    
    var date='All';
    if(document.getElementById('shipto').checked)
        date=document.getElementById('date').value;
    if(date.length!=0){
        // console.log({category,ledger_name,date});   //edit this section
        setTimeout(updateTable(date,category,ledger_name),1000);
    }
    
}
loadData();
document.getElementById('category').addEventListener('change',updateLedgerNames);
document.getElementById('date').addEventListener('change',loadData);
document.getElementById('ledger-name').addEventListener('change',loadData);
document.getElementById('shipto').addEventListener('change',loadData);

function updateTable(date,type,ledgerName){
    document.getElementById('total-quantity').textContent=0;
    document.getElementById('total-amount').textContent=0;
    console.log(date,type,ledgerName);

    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/getVouchers',options)
    .then(res=>res.json())
    .then(data=>{
        document.getElementById('report-table').innerHTML='';
        var count=1;
        data.data.forEach(voucher => {
            if(date!=='All' && ledgerName!='All'){
                if(voucher.date==date && voucher.voucher_type==type && voucher.name==ledgerName){
                    render(count,voucher);
                    count++;
                }
            }else if (date!=='All' || ledgerName!='All') {
                if(date=='All'){
                    if(voucher.voucher_type==type && voucher.name==ledgerName){
                        render(count,voucher);
                        count++;
                    }
                }else{
                    if(voucher.date==date && voucher.voucher_type==type){
                        render(count,voucher);
                        count++;
                    }
                }
                
            } else {
                if(voucher.voucher_type==type){
                    render(count,voucher);
                    count++;
                }
            }
            
        });
    })
}
updateLedgerNames();
function updateLedgerNames(){
    console.log('changed');
    var type="Debtors";
    if(document.getElementById('category').value=='Purchase')
        type='Creditors';
    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/getLedgers',options)
    .then(res=>res.json())
    .then(data=>{
        document.getElementById('ledger-name').innerHTML=`<option>All</option>`;
        data.data.forEach(ledger=>{
            if(ledger.type==type){
                document.getElementById('ledger-name').innerHTML+=`
                    <option>${ledger.name}</option>
                `;
            }
        })


        loadData();
    })
}

function render(count,voucher){
    document.getElementById('report-table').innerHTML+=`
                <tr>
                    <td>${count}</td>
                    <td>${voucher.date}</td>
                    <td>${voucher.name}</td>
                    <td>${voucher.billing_total.total_quantity}</td>
                    <td>${voucher.billing_total.total_amt}</td>
                    <td><a class="btn" href="/open-report.html?q=${voucher.voucher_id}"><i class="fa fa-search"></i></a></td>
                </tr>
                `;
    document.getElementById('total-quantity').textContent=Number(document.getElementById('total-quantity').textContent)+Number(voucher.billing_total.total_quantity);
    document.getElementById('total-amount').textContent=Number(document.getElementById('total-amount').textContent)+Number(voucher.billing_total.total_amt);
}