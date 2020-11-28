document.getElementById('submit-btn').addEventListener('click',addtoitems);

function addtoitems(){
    var item_code=document.getElementById('item-code').value;
    var item_name=document.getElementById('item-name').value;
   
    var description=document.getElementById('description').value;
    var rate=document.getElementById('item-rate').value;
    var category;
    if(document.getElementById('payment-1').checked)
        category=document.getElementById('new-category').value;
    else
        category=document.getElementById('add-to-existing').value;
    
    eval(`var code_${item_code}={item_name:"${item_name}",item_code:"${item_code}",category:"${category}",quantity:0,rate:${rate},description:"${description}"}`);
    console.log(eval(`code_${item_code}`));
}