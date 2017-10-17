var output = document.querySelector('.output');

var stockTemplate = document.querySelector('.stockTemplate').innerHTML;
var temp = Handlebars.compile(stockTemplate);

var brandTemplate = document.querySelector('.template').innerHTML;
var brandTemp = Handlebars.compile(brandTemplate);

var shoeBrand = document.querySelector('#shoeBrand');

$(document).ready(function(){
    $("#btn").click(function(){
        $.get({url: "http://localhost:8082/api/shoes", success: function(result){
//            output.innerHTML = JSON.stringify(result);
//            console.log(result)
            document.getElementById('stockInfo').innerHTML = temp({newShoe: result});
        }}).fail(function(jqXHR){
            console.log(jqXHR)
        });
    });
});

$(document).ready(function(){
        $.get({url: "http://localhost:8082/api/shoes", success: function(stock){
            var brands = [];
            var colors = [];
            var sizes = [];
            for(var i = 0; i < stock.length; i++){
                stock[i];
                brands.push(stock[i].brand);
                colors.push(stock[i].color);
                sizes.push(stock[i].size);
            }
//            console.log(sizes)
            document.getElementById('dropDowns').innerHTML = brandTemp({brands: brands, colors: colors, sizes: sizes});
        }}).fail(function(jqXHR){
            console.log(jqXHR)
        });
});

$(document).ready(function(){
    $("#addStock").click(function(){
    var newBrand = document.getElementById('newBrand');
    var newColour = document.getElementById('newColour');
    var newSize = document.getElementById('newSize');
    var newQuantity = document.getElementById('newQuantity');
    var newPrice = document.getElementById('newPrice');
    var newList =   {
                        brand : newBrand.value,
                        color : newColour.value,
                        size : newSize.value,
                        in_stock: newQuantity.value,
                        price : newPrice.value
                    };
    var stock = newList;
        $.post({url: "http://localhost:8082/api/shoes", type: 'POST', data: newList, dataType: 'application/json', success: function(stock){
//            newStock.push(stock);
//            console.log(newList)
            alert('Stock added successfully')
            document.getElementById('stockInfo').innerHTML = temp({newShoe: shoeResults.stock});
        }}).fail(function(jqXHR){
            console.log(jqXHR)
        });
    });
});

$(document).ready(function(){
    $("#checkStock").click(function(){
        var brandDrop = document.getElementById("brandDrop").value
        var colourDrop = document.getElementById("colourDrop").value
        var sizeDrop = document.getElementById("sizeDrop").value
        var displayInfo = [];
        
            if(brandDrop !== '' && sizeDrop == '' && colourDrop == ''){
                $.ajax({url: "http://localhost:8082/api/shoes/brand/" + brandDrop, type: 'GET', success: function(results){
                    console.log(results)
                document.getElementById('stockInfo').innerHTML = temp({newShoe: results.result})
            }}).fail(function(jqXHR){
            console.log(jqXHR)
        })} else if (sizeDrop == '' && brandDrop == '' && colourDrop !== ''){
                $.ajax({url: "http://localhost:8082/api/shoes/colour/" + colourDrop, type: 'GET', success: function(results){
                document.getElementById('stockInfo').innerHTML = temp({newShoe: results.result})
                }}).fail(function(jqXHR){
                console.log(jqXHR)
            })} else if (sizeDrop !== '' && brandDrop == '' && colourDrop == ''){
                $.ajax({url: "http://localhost:8082/api/shoes/size/" + sizeDrop, type: 'GET', success: function(results){
                document.getElementById('stockInfo').innerHTML = temp({newShoe: results.sizeResult})
                }}).fail(function(jqXHR){
                console.log(jqXHR)
            })} else if (brandDrop !== '' && sizeDrop == '' && colourDrop !== ''){
            $.ajax({url: "http://localhost:8082/api/shoes/colour/" + colourDrop + "/brand/" + brandDrop, type: 'GET', success: function(results){
                document.getElementById('stockInfo').innerHTML = temp({newShoe: results.result})
                }}).fail(function(jqXHR){
                console.log(jqXHR)
        })} else if (brandDrop == '' && sizeDrop !== '' && colourDrop !== ''){
            $.ajax({url: "http://localhost:8082/api/shoes/colour/" + colourDrop + "/size/" + sizeDrop, type: 'GET', success: function(results){
                document.getElementById('stockInfo').innerHTML = temp({newShoe: results.result})
                }}).fail(function(jqXHR){
                console.log(jqXHR)
        })} else if (brandDrop !== '' && sizeDrop !== '' && colourDrop == ''){
            $.ajax({url: "http://localhost:8082/api/shoes/brand/" + brandDrop + "/size/" + sizeDrop, type: 'GET', success: function(results){
                document.getElementById('stockInfo').innerHTML = temp({newShoe: results.result})
                }}).fail(function(jqXHR){
                console.log(jqXHR)
        })} else if (brandDrop !== '' && sizeDrop !== '' && colourDrop !== ''){
            $.ajax({url: "http://localhost:8082/api/shoes/brand/" + brandDrop + "/size/" + sizeDrop + /colour/ + colourDrop, type: 'GET', success: function(results){
                document.getElementById('stockInfo').innerHTML = temp({newShoe: results.result})
                }}).fail(function(jqXHR){
                console.log(jqXHR)
        })}
    });
});


function sell(id){
    console.log(id)
    $.ajax({url: "http://localhost:8082/api/shoes/sold/" + id, type: 'POST', async: true, dataType: "json", success: function(data){

    }}).fail(function(jqXHR){
            console.log(jqXHR)
    });
};


//function(){
//    $.get({ulr: "http://localhost:8082/api/shoes", success: function(results){
//        document.getElementById('dropDowns').innerHTML = temp({})
//        console.log(results);
//    }})
//}


