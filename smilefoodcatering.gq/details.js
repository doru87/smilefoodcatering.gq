var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
            
            	
                descriere = JSON.parse(this.responseText);
  
                document.getElementById("nume").innerHTML = descriere.nume;
                document.getElementById("imagine").src = descriere.imagine;
                document.getElementById("pret").innerHTML = "Pret: " + descriere.pret + " lei";
                document.getElementById("descriere").innerHTML = descriere.detalii;
                document.getElementById("stoc").innerHTML = "In stoc: " + descriere.stoc;
                document.getElementById("cantitate").innerHTML = "Cantitatea dorita: " + '<input type="number" class="cantitate" value="" min="1" max="'+descriere.stoc+'">';
                //document.getElementById("cos").innerHTML = '<a href="cart.html?id='+id+'">Adauga in cos</a>';
                
                $('#cantitate .cantitate').on('click keyup', function(){
                	var cantitate = $(this).val();

                	 document.getElementById('quantity').innerHTML = cantitate;
                	
                	});	
                	
                $('#adauga').click(function(){
            		
            		var cant=$(this).parent().find('#quantity').text();
                	$(this).attr("href","cart.html?id="+id+"&cantitate="+cant+"");
                	
            });	
            }
           
        };
  
        var id = window.location.search.substring(4)
        xhttp.open("GET", "https://magazinonline-cbb38.firebaseio.com/produse/" + id + ".json", true);
        xhttp.send();
      	
        function validateForm() {
   
        		document.getElementById('quantity').innerHTML = cantitate;
        		location.href = 'cart.html?cantitate='+cantitate+'&id='+id;          	
        }
      