let flag=true;

function getStocks(){
    
    document.getElementById("items-table").innerHTML="";
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
        var count=1;
        let totalQuantity=0;
        let totalValue=0;
        if(document.getElementById('category').value=='All'){
            
            if(flag){
            var categories=[];
            
            data.data.forEach(item=>{
                if(!categories.includes(item.category))
                    categories.push(item.category);
            })
            console.log(categories);
            categories.forEach(element => {
                document.getElementById("category").innerHTML+=`<option>${element}</option>`;
            });
            flag=false;
            }

            data.data.forEach(item => {
                    
                    document.getElementById("items-table").innerHTML+=`
                    <tr>
                        <th scope="row">${count}</th>
                        <td>${item.item_name}</td>
                        <td>${item.item_code}</td>
                        <td>${item.quantity}</td>
                        <td>${item.rate}</td>
                        <td>${item.quantity*item.rate}</td>
                    </tr>
                    `;
                    count++;
                    totalQuantity+=Number(item.quantity);
                    totalValue+=Number(item.quantity*item.rate);
                
                
            });
            
        }
        
        else{
            data.data.forEach(item => {
                if(document.getElementById('category').value==item.category){
                    document.getElementById("items-table").innerHTML+=`
                    <tr>
                        <th scope="row">${count}</th>
                        <td>${item.item_name}</td>
                        <td>${item.item_code}</td>
                        <td>${item.quantity}</td>
                        <td>${item.rate}</td>
                        <td>${item.quantity*item.rate}</td>
                    </tr>
                    `;
                    count++;
                    
                    totalQuantity+=Number(item.quantity);
                    totalValue+=Number(item.quantity*item.rate);
                    console.log(totalQuantity);
                }
                
            });
        }
        updateTotal(totalQuantity,totalValue);
    });
    
}
getStocks();
document.getElementById('category').addEventListener('change',getStocks);

function updateTotal(quantity,value){
    document.getElementById('total-quantity').textContent=`${quantity} pcs.`;
    document.getElementById('total-value').textContent=`$${value}`;
}