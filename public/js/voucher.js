var total_item_quantity=0;
// var count=0;
var grand_total=0;
var items={};
var randomid=1;
document.getElementById("add-item-btn").addEventListener("click",addItemToTable);

function addItemToTable(){
    var item_name=document.getElementById("item").value;
    var quantity=document.getElementById("quantity").value;
    var rate=document.getElementById("rate").value;
    var item_total=rate*quantity;
    var item_code=item_name;
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
        
            document.getElementById("items-table").innerHTML+=`<tr id="${item_code}">
        <td class="serial-num">${count}</td>
        <td>${item_name}</td>
        <td>${item_code}</td>
        <td>${quantity}</td>
        <td>${rate}</td>
        <td>${item_total}</td>
        <td><button onclick="remove_item('${item_code}','${quantity}','${item_total}')"><i class="fa fa-trash primary"></i></button></td>
        </tr>`;
        
        


        eval(`items["${item_code}"]={item_name,quantity,rate,item_total}`);
        updateBillingTotal(total_item_quantity,grand_total,true);
        updateSerialNums();
    }

    console.log(items);
    
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
    
    console.log({voucher_id,voucher_type,name,date,remarks,payment_method,total_item_quantity,grand_total,items});
    //save to database
}