document.getElementById("upper-header").innerHTML=`<div class="container-fluid">
<div class="row">
    <div class="col-sm-6">
        <i class="fa fa-envelope"></i>
        support@email.com
    </div>
    <div class="col-sm-6">
        <i class="fa fa-phone-alt"></i>
        +012-345-6789
    </div>
</div>
</div>`;
document.getElementById("navigation-bar").innerHTML=`<div class="container-fluid">
<nav class="navbar navbar-expand-md bg-dark navbar-dark">
    <a href="#" class="navbar-brand">MENU</a>
    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
        <div class="navbar-nav mr-auto">
            <a href="/voucher" class="nav-item nav-link">Voucher</a>
            <a href="/purchase-sales" class="nav-item nav-link">Purchases/Sales</a>
            
            <div class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Stocks</a>
                <div class="dropdown-menu">
                    
                    <a href="/addToStocks" class="dropdown-item">Add</a>
                    <a href="/alterStocks" class="dropdown-item">Alter</a>
                    <a href="/allStocks" class="dropdown-item">View all</a>
                </div>
            </div>
            <div class="nav-item dropdown">
                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Ledgers</a>
                <div class="dropdown-menu">
                    
                    <a href="/addAccount" class="dropdown-item">Add</a>
                    <a href="/alterAccount" class="dropdown-item">Alter</a>
                    <a href="/allAccounts" class="dropdown-item">View all</a>
                </div>
            </div>
            
            
            <a href="/contact" class="nav-item nav-link">Contact Us</a>
        </div>
        
    </div>
</nav>
</div>`;
document.getElementById("lower-header").innerHTML=`<div class="container-fluid">
<div class="row align-items-center">
    <div class="col-md-3">
        <div class="logo">
            <a href="/">
                <img src="img/logo.png" alt="Logo">
            </a>
        </div>
    </div>
    
    <div class="col-md-9">
        <div class="user">
            <a href="/signout" class="btn wishlist">
                <i class="fa fa-heart"></i>
                <span>Signout</span>
            </a>
            <div class="btn cart">
               
                <span id="user-name">Logged In as </span>
            </div>
            
        </div>
    </div>
</div>
</div>`;
document.getElementById("footer").innerHTML=`<div class="container">
<div class="row">
   <div class="col-md-12 template-by">
        <p>Developed by <a href="http://harshsoni.herokuapp.com">Harsh Soni</a></p>
    </div>
</div>
</div>`;

fetch('user')
    .then(res=>res.json())
    .then(data=>document.getElementById("user-name").textContent+=data.username);