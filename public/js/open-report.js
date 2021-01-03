const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const voucherid = urlParams.get('q');
const username=window.localStorage.username;


var options={
    method:'POST',
    body: JSON.stringify({username}),
    headers: {
        'Content-Type': 'application/json'
}};
fetch('/getVouchers',options)
.then(res=>res.json())
.then(data=>{
    var data=data.data.filter(a=> a.voucher_id==voucherid);
    var voucher=data[0];
    document.getElementById('items-table').innerHTML='';
    document.getElementById('voucher-type').textContent=voucher.voucher_type;
    document.getElementById('date').textContent=voucher.date;
    document.getElementById('ledger-name').textContent=voucher.name;
    document.getElementById('payment-method').textContent=voucher.payment_method;
    document.getElementById('remarks').textContent=voucher.remarks;
    var count=1;
    var totalQuantity=0;
    var totalAmt=0;
    voucher.items.forEach(item => {
        document.getElementById('items-table').innerHTML+=`
        <tr>
            <th scope="row">${count}</th>
            <td>${item.item_name}</td>
            <td>${item.item_code}</td>
            <td>${item.quantity}</td>
            <td>${item.rate}</td>
            <td>${item.quantity*item.rate}</td>
        </tr>
        `;
        totalQuantity+=Number(item.quantity);
        totalAmt+=Number(item.quantity)*Number(item.rate);
        count++;
    });
    updateTotal(totalQuantity,totalAmt);
});

function updateTotal(qty,amt){
    document.getElementById('total-quantity').textContent=qty;
    document.getElementById('grand-total').textContent=`$`+amt;
}