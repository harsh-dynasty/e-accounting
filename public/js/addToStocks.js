document.getElementById('submit-btn').addEventListener('click',addtoitems);

function addtoitems(){
    var username=window.localStorage.username;
    var item_code=document.getElementById('item-code').value;
    var item_name=document.getElementById('item-name').value;
   
    var description=document.getElementById('description').value;
    var rate=document.getElementById('item-rate').value;
    var category;
    if(document.getElementById('payment-1').checked)
        category=document.getElementById('new-category').value;
    else
        category=document.getElementById('add-to-existing').value;
    
    

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
}

loadCategories();
function loadCategories(){
    var categories=[];
    document.getElementById('add-to-existing').innerHTML='';
    var options={
        method:'POST',
        body: JSON.stringify({username:window.localStorage.username}),
        headers: {
            'Content-Type': 'application/json'
    }};
    
    fetch("/getItems",options)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.data);
        data.data.forEach(item => {
            if(!categories.includes(item.category)){
                categories.push(item.category);
                document.getElementById('add-to-existing').innerHTML+=`
                    <option>${item.category}</option>
                `;
            }
        });
        
    })
    
    
    
}

