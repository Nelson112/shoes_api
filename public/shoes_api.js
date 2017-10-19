var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

$(document).ready(function() {

      var myTableTemplate = document.querySelector('#myTemplate').innerHTML;
      var combineTemp = Handlebars.compile(myTableTemplate);
      var outPut = document.querySelector('.outPut')

      function showShoes() {

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

      function addStock() {

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
              if (newShoe) {
                showShoes();
              }
            }
          });

          document.getElementById('brand').value = ""
          document.getElementById('color').value = ""
          document.getElementById('size').value = ""
          document.getElementById('in_Stock').value = ""
          document.getElementById('price').value = ""

          window.location.reload();

        })
      }
      addStock();

      function sellShoes() {
        // console.log(btn);
        $('.outPut').on('click', function(e) {
          var id = e.target.value;
          console.log(id.value);
          $.ajax({
            type: "POST",
            url: "/api/shoes/sold/" + id,
            success: function(boughtShoe) {
              window.location.reload();
            }
          });
        });
      };
      sellShoes();

      function sizeFilter() {
        $('.size').keyup(function() {
          var sizeValue = document.querySelector(".size").value;
          $.ajax({
            type: "GET",
            url: "/api/shoes/size/" + sizeValue,

            success: function(selectedShoe) {
              document.querySelector('.outPut').innerHTML = combineTemp({
                data: selectedShoe
              })
            }
          })
        })
      }
      function brandFilter() {
        $('.brand').keyup(function() {
          var brandValue = document.querySelector(".brand").value;
          // console.log(brandValue);
          $.ajax({
            type: "GET",
            url: "/api/shoes/brand/" + brandValue,

            success: function(selectedShoeBrand) {
              document.querySelector('.outPut').innerHTML = combineTemp({
                data: selectedShoeBrand
              })
            }
          })
        })
      }
      sizeFilter();
      brandFilter();

      $('.btn').on('click', function() {
          var addStock = document.getElementById("addStockDiv");
          if (addStock.style.display = "block") {
            addStock.style.display = "none"
          }
          showShoes();
        })
      });


    function myFunction() {
      var addStock = document.getElementById("addStockDiv");
      if (addStock.style.display = "none") {
        addStock.style.display = "block";
      }
    }
