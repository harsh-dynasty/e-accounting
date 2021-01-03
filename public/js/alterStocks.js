function deleteStock(){
    var itemName=document.getElementById('delete-item-code').value.split('/')[0];
    var itemCode=document.getElementById('delete-item-code').value.split('/')[1];
    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username,itemName,itemCode}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/deleteStock',options)
    .then(res=>res.json())
    .then(data=>{
        console.log('deleted');
        setTimeout(loadDeleteCategory, 1000);
        setTimeout(loadCategory, 1000);
    })
}

loadDeleteCategory();
function loadDeleteCategory(){
    var categories=[];
    document.getElementById('delete-item-category').innerHTML='';
    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    
    fetch("/getItems",options)
    .then(res=>res.json())
    .then(data=>{
        data.data.forEach(item => {
            if(!categories.includes(item.category)){
                categories.push(item.category);
                document.getElementById('delete-item-category').innerHTML+=`
                    <option>${item.category}</option>
                `;
            }
        });
        
    })
    setTimeout(loaddeleteitems, 1000);
    
}

function loaddeleteitems(){
    document.getElementById('delete-item-code').innerHTML='';
    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    
    fetch("/getItems",options)
    .then(res=>res.json())
    .then(data=>{
        data.data.forEach(item => {
            if(item.category==document.getElementById('delete-item-category').value){
               
                document.getElementById('delete-item-code').innerHTML+=`
                    <option>${item.item_name}/${item.item_code}</option>
                `;
            }
        });
        
    })
}

document.getElementById('delete-item-category').addEventListener('change',loaddeleteitems);

/////////////////////
loadCategory();
function loadCategory(){
    var categories=[];
    document.getElementById('alter-item-cat').innerHTML='';
    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    
    fetch("/getItems",options)
    .then(res=>res.json())
    .then(data=>{
        data.data.forEach(item => {
            if(!categories.includes(item.category)){
                categories.push(item.category);
                document.getElementById('alter-item-cat').innerHTML+=`
                    <option>${item.category}</option>
                `;
            }
        });
        
    })
    setTimeout(loaditems,1000);
    
}
function loaditems(){
    document.getElementById('alter-item-name').innerHTML='';
    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    
    fetch("/getItems",options)
    .then(res=>res.json())
    .then(data=>{
        data.data.forEach(item => {
            if(item.category==document.getElementById('alter-item-cat').value){
               
                document.getElementById('alter-item-name').innerHTML+=`
                    <option>${item.item_name}/${item.item_code}</option>
                `;
            }
        });
        
    })
    setTimeout(itemDetails, 1000);
    
}
document.getElementById('alter-item-cat').addEventListener('change',loaditems);
document.getElementById('alter-item-name').addEventListener('change',itemDetails);
function itemDetails(){
    console.log('details');
    var name=document.getElementById('alter-item-name').value.split('/')[0];
    var code=document.getElementById('alter-item-name').value.split('/')[1];

    console.log(name+code);

    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    
    fetch("/getItems",options)
    .then(res=>res.json())
    .then(data=>{
        data=data.data;
        for(var i=0;i<data.length;i++){
            if(data[i].item_code==code && data[i].item_name==name){
                document.getElementById('alter-new-name').value=data[i].item_name;
                document.getElementById('alter-new-code').value=data[i].item_code;
                document.getElementById('alter-item-rate').value=data[i].rate;
                document.getElementById('alter-item-des').value=data[i].description;
                break;
            }
        }
        
    })

}

document.getElementById('submit-btn').addEventListener('click',alterStock);

function alterStock(){
    //delete and then add
    var itemName=document.getElementById('alter-item-name').value.split('/')[0];
    var itemCode=document.getElementById('alter-item-name').value.split('/')[1];
    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username,itemName,itemCode}),
        headers: {
            'Content-Type': 'application/json'
    }};
    fetch('/deleteStock',options)
    .then(res=>res.json())
    .then(data=>{
        console.log('deleted');
        //add here after deletion
        var username=window.localStorage.username;
    var item_name=document.getElementById('alter-new-name').value;
    var item_code=document.getElementById('alter-new-code').value;
   
    var description=document.getElementById('alter-item-des').value;
    var rate=document.getElementById('alter-item-rate').value;
    var category;
    if(document.getElementById('payment-1').checked)
        category=document.getElementById('new-category').value;
    else if(document.getElementById('payment-2').checked)
        category=document.getElementById('add-to-existing').value;
    else
        category=document.getElementById('alter-item-cat').value;
    

    var options={
        method:'POST',
        body: JSON.stringify({username,item_code,item_name,description,rate,category}),
        headers: {
            'Content-Type': 'application/json'
    }};
    
    fetch("/addStocks",options)
    .then(res=>res.json())
    .then(data=>{
        console.log({item_code,item_name,description,rate,category});
    })
        ///////////////////
        setTimeout(loadDeleteCategory, 1000);
        setTimeout(loadCategory, 1000);
    })
}