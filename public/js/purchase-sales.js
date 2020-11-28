var prev_cat=document.getElementById('category').value;

loadLedgers();
function loadLedgers(){
    console.log("load ledgers");   //edit this section
}

function loadData(){
    
    var category=document.getElementById('category').value;
    if(category!=prev_cat){
        prev_cat=category;
        loadLedgers();
        document.getElementById('ledger-name').value='All';
    }
    var ledger_name=document.getElementById('ledger-name').value;
    
    var date='All';
    if(document.getElementById('shipto').checked)
        date=document.getElementById('date').value;
    if(date.length!=0){
        console.log({category,ledger_name,date});   //edit this section
    }
    
}
loadData();
document.getElementById('category').addEventListener('change',loadData);
document.getElementById('date').addEventListener('change',loadData);
document.getElementById('ledger-name').addEventListener('change',loadData);
document.getElementById('shipto').addEventListener('change',loadData);

