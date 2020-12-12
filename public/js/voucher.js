var total_item_quantity=0;
// var count=0;
var grand_total=0;
var items={};
var randomid=1;

function getItemCode(){
    var itemName=document.getElementById('item').value;
    var username=window.localStorage.username;
    var itemCode;
    var options={
        method:'POST',
        body: JSON.stringify({username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/getItems',options)
    .then(res=>res.json())
    .then(data=>{
        var data=data.data;
        console.log(data);
        for(var i=0;i<data.length;i++){
            if(data[i].item_name==itemName){
                itemCode = data[i]['item_code']; 
                addItemToTable(itemCode);
                break;
            }
        }
    })
    
}

document.getElementById("add-item-btn").addEventListener("click",getItemCode);


function addItemToTable(itemCode){
    var item_name=document.getElementById("item").value;
    var quantity=document.getElementById("quantity").value;
    var rate=document.getElementById("rate").value;
    var item_total=rate*quantity;
    var item_code=itemCode;
    var random_id=randomid;
    randomid++;
    if(item_name && quantity && rate){
        total_item_quantity+=Number(quantity);
        grand_total+=item_total;
        // count++;
        var count=Object.keys(items).length+1;

        if(document.getElementById(item_code)){
            remove_item(item_code,items[`${item_code}`].quantity,items[`${item_code}`].item_total);
            console.log("runned");
        }

        if(document.getElementById('voucher-type').value=='Sales'){
            var options={
                method:'POST',
                body: JSON.stringify({username:window.localStorage.username}),
                headers: {
                    'Content-Type': 'application/json'
            }};
            fetch('/getItems',options)
            .then(res=>res.json())
            .then(data=>{
                var data=data.data;
                for(var i=0;i<data.length;i++){
                    if(data[i].item_code==item_code){
                        if(data[i].quantity<quantity){
                            console.log(data[i].quantity);
                            
                            item_total=rate*data[i].quantity;

                            total_item_quantity=total_item_quantity-quantity+data[i].quantity;
                            grand_total=grand_total-rate*(quantity-data[i].quantity);
                            quantity=data[i].quantity;
                        }
                        break;
                    }
                }
            })
        
       }
        setTimeout(() => {
            document.getElementById("items-table").innerHTML+=`<tr id="${item_code}">
        <td class="serial-num">${count}</td>
        <td>${item_name}</td>
        <td>${item_code}</td>
        <td>${quantity}</td>
        <td>${rate}</td>
        <td>${item_total}</td>
        <td><button onclick="remove_item('${item_code}','${quantity}','${item_total}')"><i class="fa fa-trash primary"></i></button></td>
        </tr>`;

        eval(`items["${item_code}"]={item_name,quantity,rate,item_total,item_code}`);
        updateBillingTotal(total_item_quantity,grand_total,true);
        updateSerialNums();
        }, 1000);
            
        
        
        

        
    }

    
    
}
function updateSerialNums(){
    var array=document.getElementsByClassName("serial-num");
    for(var i=0;i<array.length;i++) 
        array[i].textContent=i+1;
}
function updateBillingTotal(qty,gt,add){
    if(add){
       
        document.getElementById("total-quantity").textContent=qty;
        document.getElementById("grand-total").textContent="$"+gt;
    }
    else{
        grand_total-=Number(gt);
        total_item_quantity-=Number(qty);
        updateBillingTotal(total_item_quantity,grand_total,true);
    }
    
}
function remove_item(itemCode,quantity,itemTotal){
    
    document.getElementById(itemCode).remove();
    updateSerialNums();
    updateBillingTotal(quantity,itemTotal,false);
    
    delete items[itemCode];
    console.log(items);
    
    
}
document.getElementById("submit-btn").addEventListener("click",submitVoucher);
function submitVoucher(){
    var voucher_type=document.getElementById("voucher-type").value;
    var name=document.getElementById("name").value;
    var date=document.getElementById("date").value;
    var remarks=document.getElementById("remarks").value;
    var payment_method;
    for(var i=1;i<=4;i++){
        if(document.getElementById(`payment-${i}`).checked){
            payment_method=document.getElementById(`payment-${i}`).value;
            break;
        }
        
    }
    var voucher_id=new Date();
    voucher_id=voucher_id.toString().split(' ').slice(1,5).join('').split(':').join('');
    
    var username=window.localStorage.username;
    //save to database
    var options={
        method:'POST',
        body: JSON.stringify({username,voucher_id,voucher_type,name,date,remarks,payment_method,total_item_quantity,grand_total,items}),
        headers: {
            'Content-Type': 'application/json'
    }};
    
    fetch("/addVouchers",options)
    .then(res=>res.json())
    .then(data=>console.log({voucher_id,voucher_type,name,date,remarks,payment_method,total_item_quantity,grand_total,items}))
}

getLedgerNames();

function getLedgerNames(){
    var username=window.localStorage.username;
    var options={
        method:'POST',
        body: JSON.stringify({username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/getLedgers',options)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.data);
        document.getElementById('name').innerHTML="";
        //data.data is an array where each index is a ledger
        if(document.getElementById('voucher-type').value=='Purchase'){
            data.data.forEach(ledger => {
                if(ledger.type=='Creditors')
                    document.getElementById('name').innerHTML+=`<option>${ledger.name}</option>`;
            });
        }else{
            data.data.forEach(ledger => {
                if(ledger.type=='Debtors')
                    document.getElementById('name').innerHTML+=`<option>${ledger.name}</option>`;
            });
        }
    })
}
document.getElementById('voucher-type').addEventListener('change',getLedgerNames);

getItemNames();

function getItemNames(){
    var username=window.localStorage.username;
    var options={
        method:'POST',
        body: JSON.stringify({username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/getItems',options)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.data);
        document.getElementById('item').innerHTML="";
        data.data.forEach(item=>{
            document.getElementById('item').innerHTML+=`<option>${item.item_name}</option>`;
        })
    })
}

getItemRates();

function getItemRates(){
    
    var username=window.localStorage.username;
    var options={
        method:'POST',
        body: JSON.stringify({username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/getItems',options)
    .then(res=>res.json())
    .then(data=>{
        var data=data.data;

        for(var i=0;i<data.length;i++){
            if(data[i].item_name==document.getElementById('item').value){
                document.getElementById('rate').value=Number(data[i].rate);

                
                document.getElementById('quantity').value=0;
                
                break;
            }
                
        }
    })
}

document.getElementById('voucher-type').addEventListener('change',getItemRates);

document.getElementById('item').addEventListener('change',getItemRates);

// document.getElementById('quantity').addEventListener('input',handleQuantity);


// function handleQuantity(){
//     console.log('quantity input');
//     if(document.getElementById('voucher-type').value=='Sales'){
//         var prevValue=document.getElementById('quantity').value;
//         if(prevValue>document.getElementById('quantity').max)
//             document.getElementById('quantity').value=document.getElementById('quantity').max;
//     }
    
// }


