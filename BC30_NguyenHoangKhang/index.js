// GET INFO
function getProductList(){
    var promise = axios({
        url:'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET',
    });

    promise.then(function(result){
        console.log(result.data);
        renderTable(result.data, 'tableProductInfo');
    })
}

function renderTable(arrProduct){
    var html = '';
    for (var i = 0; i < arrProduct.length; i++){
        var products = arrProduct[i];
        html += `<tr>
            <td>${products.id}</td>
            <td>${products.img}</td>
            <td>${products.name}</td>
            <td>${products.price}</td>
            <td>${products.description}</td>
            <td>${products.type}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteProduct('${products.id}')">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="btn btn-primary" onclick="updateProduct('${products.id}')">
                    <i class="fa fa-pencil-square-o"></i>
                </button>
            </td>
        </tr>`
    }
    document.getElementById('tableProductInfo').innerHTML = html;
}

// CREATE
document.getElementById('btnCreate').onclick = async function(){
    var products = new ProductsInfo();
    products['id'] = document.getElementById('id').value;
    products['img'] = document.getElementById('img').value;
    products['name'] = document.getElementById('name').value;
    products['type'] = document.getElementById('type').value;
    products['price'] = document.getElementById('price').value;
    products['description'] = document.getElementById('description').value;

    var mess = '';
    try{
        var result = await axios({
            url:'http://svcy.myclass.vn/api/Product/CreateProduct',
            method:'POST',
            data: products
        });
    
        mess = result.data;
        alert(mess);
        getProductList();
    } 
    catch(error){
        alert(error.response?.data);
    }
}

// UPDATE
function updateProduct(idClick){
// Get Id and render info
    var promise = axios({
        url:'http://svcy.myclass.vn/api/Product/GetById/' + idClick,
        method:'GET'
    });

    promise.then(function(result){
        console.log(result.data);
        var products = result.data;

        document.getElementById('id').value = products.id;
        document.getElementById('img').value = products.img;
        document.getElementById('name').value = products.name;
        document.getElementById('type').value = products.type;
        document.getElementById('price').value = products.price;
        document.getElementById('description').value = products.description;
    });

    promise.catch(function(error){
        console.log(error)
    });

// Update data
    document.getElementById('btnUpdate').onclick = function(){
        var productUpdated = new ProductsInfo();

        productUpdated.id = document.querySelector('#id').value;
        productUpdated['name'] = document.querySelector('#name').value;
        productUpdated.img = document.querySelector('#img').value;
        productUpdated.type = document.querySelector('#type').value;
        productUpdated.price = document.querySelector('#price').value;
        productUpdated.description = document.querySelector('#description').value;

        var promise = axios({
            url:'http://svcy.myclass.vn/api/Product/UpdateProduct/' + idClick,
            method: 'PUT',
            data: productUpdated
        });

        promise.then(function(result){
            console.log(result.data);
            getProductList();
        });

        promise.catch(function(error){
            console.log(error);
        });
    }
}

// DELETE
function deleteProduct(idClick){
    
    var promise = axios({
        url:'http://svcy.myclass.vn/api/Product/DeleteProduct/' + idClick,
        method:'DELETE'
    });

    promise.then(function(result){
        console.log(result.data);
        getProductList();
    });

    promise.catch(function(error){
        console.log(error);
    });
}


// SEARCHING

document.getElementById('btn-search').onclick = function(nameInput){
    var result = [];
    var keyword = document.getElementById('search').value;

    for(var i = 0; i < products.length; i++){
        var foundProduct = products[i];
        if(foundProduct.rank === keyword){
            result.push(foundProduct);
        }
    }
    renderTable();

    var promise = axios({
        url:'http://svcy.myclass.vn/api/Product/SearchByName?name=' + nameInput,
        method: 'GET'
    });
    
    promise.then(function(result){
        console.log(result.data)
        renderTable();
    });
    
    promise.catch(function(error){
        console.log(error)
    });
}
// =========> Sai


    



window.onload = function(){
    getProductList();
}




