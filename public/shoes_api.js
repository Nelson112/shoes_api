var shoes = [];

$(document).ready(function() {

  var myTableTemplate = document.querySelector('#myTemplate').innerHTML;
  var combineTemp = Handlebars.compile(myTableTemplate);
  var outPut = document.querySelector('.outPut')


  function showShoes(){

    $.ajax({
      type: "GET",
      url: "/api/shoes",
      success: function(data) {
        console.log(data);
        document.querySelector('.outPut').innerHTML = combineTemp({
          data: data
        })
        shoes = data;
      }
    });

  }

  showShoes();


  $('.addStockBtn').on('click', function() {

    var enteredShoe = {
      brand: document.getElementById('brand').value,
      color: document.getElementById('color').value,
      size: document.getElementById('size').value,
      in_Stock: document.getElementById('in_Stock').value,
      price: document.getElementById('price').value
    }


    $.ajax({
      type: "POST",
      url: "/api/shoes",
      data: enteredShoe,
      success: function(newShoe) {
        console.log("mmm");
        if (newShoe) {
          showShoes();
          // shoes.push(newShoe)
          // outPut.innerHTML = combineTemp({
          //   data: shoes
          // })
        }
      }
    });

    document.getElementById('brand').value = ""
    document.getElementById('color').value = ""
    document.getElementById('size').value = ""
    document.getElementById('in_Stock').value = ""
    document.getElementById('price').value = ""

  })


});

function homeButton() {
  var addStock = document.getElementById("addStockDiv");
  if (addStock.style.display = "block") {
    addStock.style.display = "none"
  }
  console.log("k");
}

function myFunction() {
  var addStock = document.getElementById("addStockDiv");
  if (addStock.style.display = "none") {
    addStock.style.display = "block";
  }
}
console.log(shoes);
