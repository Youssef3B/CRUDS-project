let nameproduct = window.document.getElementById('productname')
let price = window.document.getElementById('price');
let taxes = window.document.getElementById('taxes');
let ads = window.document.getElementById('ads');
let discount = window.document.getElementById('discount');
let total = window.document.getElementById('total');
let count = window.document.getElementById('count');
let category = window.document.getElementById('category');
let create = window.document.getElementById('create');

let mode = 'create';
let tmp;
// get totale
function gettotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#28B463';
    }else{
        total.innerHTML = '';
        total.style.background = '#E74C3C';
    }
}


// get data to local storage
let data 
if(localStorage.products != null){

    data=JSON.parse(localStorage.products);
}else{
    data = [];
}



create.onclick = function(){
    let objects = {
        name : nameproduct.value,
        price: price.value,
        taxes: taxes.value,
        ads : ads.value,
        discount : discount.value,
        total: total.innerHTML,
        count : count.value,
        category : category.value,
    }
    if(mode == 'create'){
        if(objects.count > 1){
        for( let i = 0; i< objects.count;i++){
            data.push(objects);
        }
        

    }else{
        data.push(objects);
    }
    }else{
        data[tmp] = objects;
        mode = 'create';
        create.innerHTML = 'creat';
        count.style.display = 'block';
    }
    
    
    
    localStorage.setItem('products', JSON.stringify(data));
    
    cleardata();
    showdatta ();
    
}

// clear inputs

function cleardata(){
    nameproduct.value = '';
    price.value = '';
    taxes.value = '';
    ads.value= '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

}

// show datta 

function showdatta (){
    gettotal()
    let table = '';
    for(let i=0; i < data.length; i++){
        table += `
        <tr>
        <td>${i}</td>
        <td>${data[i].name}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td><button onclick = "updateproduct(${i})"  id="update">update</button></td>
        <td><button onclick="deleteproduit(${i})" id="delete">Delete</button></td>
    </tr>
    `
    }
    document.getElementById('tbody').innerHTML =table;

    if(data.length>0){
        let btndeletall = document.getElementById("delete all")
        btndeletall.innerHTML = `<button onclick = "deleteall()">Delete All(${data.length})</button>`
    }
    else{
        btndeletall.innerHTML = '';
    }
}
showdatta()

// delete products

function deleteproduit(i){{
    data.splice(i,1);
    localStorage.products = JSON.stringify(data);
    showdatta ();


}}

// delete all

function deleteall(){
    localStorage.clear();
    data.splice(0);
    showdatta ();

}

// update products
function updateproduct(i){
    nameproduct.value = data[i].name;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    ads.value = data[i].ads;
    discount.value=data[i].discount;
    category.value=data[i].category;
    count.style.display= 'none';
    create.innerHTML='Update';
    mode = 'update'
    tmp = i;
    window.scroll({
        top : 0,
        left : 0,
        behavior : 'smooth'
    });
    gettotal()

}