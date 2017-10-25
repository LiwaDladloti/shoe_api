var output = document.querySelector('.output');

var stockTemplate = document.querySelector('.stockTemplate').innerHTML;
var temp = Handlebars.compile(stockTemplate);


//buying a shoe
$(document).on('click','#buy',function(){
    alert( 'success' );
        $.post(
        "/api/shoes/sold/" + $('#buy').val(), 
        function(data) {
            
        });
        window.location.reload();
});

var brandTemplate = document.querySelector('.template').innerHTML;
var brandTemp = Handlebars.compile(brandTemplate);

var shoeBrand = document.querySelector('#shoeBrand');

$(document).ready(function(){
    
    $.get({url: "/api/shoes", success: function(result){
                document.getElementById('stockInfo').innerHTML = temp({newShoe: result});
            }}).fail(function(jqXHR){
                console.log(jqXHR)
        });
    
    
    $("#btn").click(function(){
        $.get({url: "/api/shoes", success: function(result){
//            output.innerHTML = JSON.stringify(result);
//            console.log(result)
            document.getElementById('stockInfo').innerHTML = temp({newShoe: result});
//            window.alert("I am working")
        }}).fail(function(jqXHR){
            console.log(jqXHR)
        });
    }); 
    
    $.get({url: "/api/shoes", success: function(stock){
            var uniqueBrands = {};
            var uniqueColors = {};
            var uniqueSizes = {};
            console.log(uniqueBrands)
            var brands = [];
            var colors = [];
            var sizes = [];
            for(var i = 0; i < stock.length; i++){
                uniqueBrands[stock[i].brand] = true;
                uniqueColors[stock[i].color] = true;
                uniqueSizes[stock[i].size] = true;
            }
            for(var key in uniqueBrands){
                brands.push(key);
            } for(var key in uniqueColors){
                colors.push(key);
            } for(var key in uniqueSizes){
                sizes.push(key);
            }
            document.getElementById('dropDowns').innerHTML = brandTemp({brands: brands, colors: colors, sizes: sizes});
        }}).fail(function(jqXHR){
            console.log(jqXHR)
        });
    
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
            $.post({url: "/api/shoes", type: 'POST', data: newList, dataType: 'application/json', success: function(stock){
                alert('Stock added successfully')
                document.getElementById('stockInfo').innerHTML = temp({newShoe: shoeResults.stock});
            }}).fail(function(jqXHR){
                console.log(jqXHR)
        });
                window.location.reload()
    });
    
        $("#checkStock").click(function(){
        var brandDrop = document.getElementById("brandDrop").value
        var colourDrop = document.getElementById("colourDrop").value
        var sizeDrop = document.getElementById("sizeDrop").value
        var displayInfo = [];
        
            if(brandDrop !== '' && sizeDrop == '' && colourDrop == ''){
                $.ajax({url: "/api/shoes/brand/" + brandDrop, type: 'GET', success: function(results){
                    console.log(results)
                document.getElementById('stockInfo').innerHTML = temp({newShoe: results.result})
            }}).fail(function(jqXHR){
            console.log(jqXHR)
        })} else if (sizeDrop == '' && brandDrop == '' && colourDrop !== ''){
                $.ajax({url: "/api/shoes/colour/" + colourDrop, type: 'GET', success: function(results){
                document.getElementById('stockInfo').innerHTML = temp({newShoe: results.result})
                }}).fail(function(jqXHR){
                console.log(jqXHR)
            })} else if (sizeDrop !== '' && brandDrop == '' && colourDrop == ''){
                $.ajax({url: "/api/shoes/size/" + sizeDrop, type: 'GET', success: function(results){
                document.getElementById('stockInfo').innerHTML = temp({newShoe: results.sizeResult})
                }}).fail(function(jqXHR){
                console.log(jqXHR)
            })} else if (brandDrop !== '' && sizeDrop == '' && colourDrop !== ''){
            $.ajax({url: "/api/shoes/colour/" + colourDrop + "/brand/" + brandDrop, type: 'GET', success: function(results){
                document.getElementById('stockInfo').innerHTML = temp({newShoe: results.result})
                }}).fail(function(jqXHR){
                console.log(jqXHR)
        })} else if (brandDrop == '' && sizeDrop !== '' && colourDrop !== ''){
            $.ajax({url: "/api/shoes/colour/" + colourDrop + "/size/" + sizeDrop, type: 'GET', success: function(results){
                document.getElementById('stockInfo').innerHTML = temp({newShoe: results.result})
                }}).fail(function(jqXHR){
                console.log(jqXHR)
        })} else if (brandDrop !== '' && sizeDrop !== '' && colourDrop == ''){
            $.ajax({url: "/api/shoes/brand/" + brandDrop + "/size/" + sizeDrop, type: 'GET', success: function(results){
                document.getElementById('stockInfo').innerHTML = temp({newShoe: results.result})
                }}).fail(function(jqXHR){
                console.log(jqXHR)
        })} else if (brandDrop !== '' && sizeDrop !== '' && colourDrop !== ''){
            $.ajax({url: "/api/shoes/brand/" + brandDrop + "/size/" + sizeDrop + /colour/ + colourDrop, type: 'GET', success: function(results){
                document.getElementById('stockInfo').innerHTML = temp({newShoe: results.result})
                }}).fail(function(jqXHR){
                console.log(jqXHR)
        })}
    });
});
