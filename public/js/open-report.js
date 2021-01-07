const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const voucherid = urlParams.get('q');
const username=window.localStorage.username;
var voucher;

var dd = {
	content: [
		{text: 'Invoice', style: 'header'},
		
		{
			style: 'tableExample',
			table: {
			    widths:['*','*','*','*'],
				body: [
					[{fillColor:'#ff6f61',text:'Voucher type'},{fillColor:'#ff6f61',text:'Voucher id'},{fillColor:'#ff6f61',text:'Company Name'},{fillColor:'#ff6f61',text:'Date'}],
					[]
				]
			}
		},
		{
			style: 'tableExample',
			table: {
			     widths:['*','*','*'],
				body: [
					[{fillColor:'#ff6f61',text:'Payment Method'},{fillColor:'#ff6f61',text:'Remarks'}, {fillColor:'#ff6f61',text:'Billing Total'}],
					['Internet banking', 'This is a remark',
					    	{
                    			style: 'tableExample',
                    			table: {
                    			    widths:['*','*'],
                    				body: [
                    					[{fillColor:'lightblue',text:'Total qty.'},{fillColor:'lightblue',text:'Total amt.'}],
                    					['40', {text:'45000',bold:true}]
                    				]
                    			}
                    		}
					
					
					]
				]
			}
		},
	
		{text: 'Items description', style: 'subheader'},
		
		{
			style: 'tableExample',
			table: {
			    	widths: [30, 'auto', 'auto', 'auto','auto','auto'],
				body: [
					[{fillColor:'#ff6f61',text:'S.no.'},{fillColor:'#ff6f61',text:'Item name'}, {fillColor:'#ff6f61',text:'Item Code'}, {fillColor:'#ff6f61',text:'Qty.'},{fillColor:'#ff6f61',text:'Rate'},{fillColor:'#ff6f61',text:'Item total'}],
					
				]
			}
		},
	    {text: 'This is a computer generated bill, hence not required signature.'}
	
	],
	styles: {
		header: {
			fontSize: 30,
			bold: true,
			margin: [0, 0, 0, 30]
		},
		subheader: {
			fontSize: 16,
			bold: true,
			margin: [0, 10, 0, 5]
		},
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
			color: 'black'
		}
	},
	info: {
        title: '',
       
    }
    
	
}

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
    voucher=data[0];
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

document.getElementById('print').addEventListener('click',printVoucher);

function printVoucher(){
    console.log(voucher);
    // playground requires you to assign document definition to a variable called dd
    dd.content[1].table.body[1].push(voucher.voucher_type);
    dd.content[1].table.body[1].push(voucher.voucher_id);
    dd.content[1].table.body[1].push(voucher.name);
    dd.content[1].table.body[1].push(voucher.date);

    dd.content[2].table.body[1][0]=voucher.payment_method;
    dd.content[2].table.body[1][1]=voucher.remarks;

    dd.content[2].table.body[1][2].table.body[1][0]=voucher.billing_total.total_quantity;
    dd.content[2].table.body[1][2].table.body[1][1].text=voucher.billing_total.total_amt;
    var count=1;
    voucher.items.forEach(item=>{
        dd.content[4].table.body.push([count,item.item_name,item.item_code,item.quantity,item.rate,item.item_total])
        count++;
    })
    dd.info.title=voucher.name+"_"+voucher.voucher_id;
    
    pdfMake.createPdf(dd).print();
}