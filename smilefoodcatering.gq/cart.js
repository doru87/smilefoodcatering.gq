    function adauga_cos() {
    	
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {

                    lista = JSON.parse(this.responseText);

                    var imagine = lista.imagine;
                    document.getElementById("poza").src = imagine;
                    
                    document.getElementById("id").value = id;

                    var nume = lista.nume;
                    document.getElementById("nume").innerHTML = nume;

                    var pret = parseInt(lista.pret);
                    document.getElementById("pret").innerHTML = pret;
                   
                    var cantitate =window.location.search.substring(35,37);

                    var cant = parseInt(cantitate);
                    var subtotal = pret * cant;
                    var tva = 0.19 * subtotal;
                    var total = subtotal + tva ;
                    
                    window.history.replaceState(null, null, "cart.html?id="+id+"");
             
              	  var Item = function (id,imagine,nume,pret,cantitate,subtotal,tva,total){
              		  this.id=id;
              		  this.imagine = imagine;
              		  this.nume = nume;
              		  this.pret = pret;
              		  this.cantitate = cantitate;
              		  this.subtotal = subtotal;
            		  this.tva = tva;
            		  this.total = total; 
            		  
              	  }
              	  
              	  var item = new Item(id,imagine,nume,pret,cant,subtotal,tva,total);
              	
              	  var array = JSON.parse(localStorage.getItem('produse_cos') || '[]');
          	      array.push(item);
                  localStorage.setItem('produse_cos', JSON.stringify(array));
                  var produse_cos = JSON.parse(localStorage.getItem("produse_cos"));
                  
                  var tmp = {};
                  produse_cos.forEach(function (item) {
                	    var tempKey = item.id + item.imagine + item.nume + item.pret;
                	    if (!tmp.hasOwnProperty(tempKey)) {
                	        tmp[tempKey] = item;
                	    } else {
                	        tmp[tempKey].cantitate += item.cantitate;
                	        tmp[tempKey].subtotal += item.pret*item.cantitate;
                	        tmp[tempKey].tva = tmp[tempKey].subtotal*19/100;
                	        tmp[tempKey].total = tmp[tempKey].subtotal + tmp[tempKey].tva;
                	    }
                	});

                	var produse = Object.keys(tmp).map(function(key){
                	    return tmp[key];
                	});
                	
                	localStorage.setItem('produse_cos', JSON.stringify(produse));
   
                	deseneaza()
                	
                			
                }
            };

            var cantitate =window.location.search.substring(35,37);
            var id =window.location.search.substring(4,24);
            var cant = parseInt(cantitate);
            document.querySelector(".cantitate").innerHTML = cantitate;
            
            $(document).ready(function(){

            });
            xhttp.open("GET", "https://magazinonline-cbb38.firebaseio.com/produse/"+id+"/.json", true);
            xhttp.send();
		}
		function deseneaza(){
			var tabel=document.querySelector(".cos_cumparaturi tbody");
                	var str="";
                	
                
                	var produse_cos = JSON.parse(localStorage.getItem("produse_cos"));
                	for (var i = 0; i < produse_cos.length; i++) {
                		
                		 var rand_tabel = `
                		     <tr>
                	          <td>
                	             <img src="${produse_cos[i]["imagine"]}" width="100px" height="70px" id="poza"/>             
                	          </td>

                	          <td>
                	             <div id="nume"><a href="details.html?id=${produse_cos[i]["id"]}">${produse_cos[i]["nume"]}</a></div>
                	          </td>
                	        
                	          <td>
                	        	 <div id="pret">${produse_cos[i]["pret"]}</div>
                	          </td>
                	          <td>
                	              <input type="number" class="" value="${produse_cos[i]["cantitate"]}" id="cantitate"/>
                	          </td>
                	          
                	          <td>
                	             <div id="subtotal">${produse_cos[i]["subtotal"]}</div>
                	          </td>
                     	      <td>
                	              <div id="tva">${produse_cos[i]["tva"]}</div>
                	          </td>
                              <td>
                	             <div id="total">${produse_cos[i]["total"]}</div>
                	          </td>
                	          <td>
                	              <a href="#" onclick="stergeProdusDinCos(this);" id="sterge">Remove</a>								
                	          </td>
                	          <td>
                	          </td>
                	            </tr>`

                				str +=rand_tabel;
                			}
                			console.log(str);
                			tabel.innerHTML=str;
                			
                			 if(localStorage.getItem("produse_cos") !== null){
                	              data = JSON.parse(localStorage.getItem("produse_cos"));
                	             

                	              var total_general=0;
                	              data.forEach(function(element){
                	              	total_general+=element.total;
                	              });
                	              $( ".cos_cumparaturi table tbody tr:first td:nth-child(9)" ).text(total_general.toFixed(2)+' lei');
                	              }

                			
                			
                   
                			$('.cos_cumparaturi table tbody #cantitate').bind('click keyup', function(){

                        		  var cant=$(this).val(); 
                        	
                        		  var nume=$(this).parent().parent().find('#nume').text();
 
                        		  var cart = JSON.parse(localStorage.produse_cos);
                        		  
                        		  
                        		  for (var i = 0; i < cart.length; i++) {
                        			  if(nume == cart[i].nume){  

                        				  cart[i].cantitate = JSON.parse(cant);
                        				  cart[i].subtotal = cart[i].cantitate*cart[i].pret;
                        				  cart[i].tva =  cart[i].subtotal * JSON.parse(19/100);
                        				  cart[i].total = cart[i].subtotal + cart[i].tva;
                        			  	}
                        		  	}
                        		  localStorage.setItem("produse_cos", JSON.stringify(cart)); 
                        		  
                        		  var produse_cos = JSON.parse(localStorage.produse_cos);
                        		
                        		 for (var i = 0; i < produse_cos.length; i++) {
                        			 if(nume == produse_cos[i].nume){
                        				 
                        				 $(this).parent().parent().find('#subtotal').html(produse_cos[i].subtotal);
                        				 $(this).parent().parent().find('#cantitate').val(produse_cos[i].cantitate);
                        				 $(this).parent().parent().find('#tva').html(produse_cos[i].tva);
                        				 $(this).parent().parent().find('#total').html(produse_cos[i].total)
                        				 
                        			 }
                        		 }
                        		 
                        		 if(localStorage.getItem("produse_cos") !== null){
                                     data = JSON.parse(localStorage.getItem("produse_cos"));
                                    
                     
                                     var total_general=0;
                                     data.forEach(function(element){
                                     	total_general+=element.total;
                                     });
                                   
                                     	$( ".cos_cumparaturi table tbody tr:first td:nth-child(9)" ).text(total_general.toFixed(2)+' lei');
                                     }

                        		
                        	     });
		}

    function stergeProdusDinCos(el) {
		var nume =jQuery(el).parent().parent().find('#nume').text();
		 
		  var cart = JSON.parse(localStorage.produse_cos);
		  
		  for ( var i = 0; i < cart.length; i++ ) {
			    if ( cart[i].nume == nume ) {  
			        cart.splice(i,1); 
			    }
			}
		  localStorage.produse_cos = JSON.stringify(cart);
		 
		  if(localStorage.getItem("produse_cos") !== null){
              data = JSON.parse(localStorage.getItem("produse_cos"));
             
              var total_general=0;
              data.forEach(function(element){
              	total_general+=element.total;
              });
              $( ".cos_cumparaturi table tbody tr:first td:nth-child(9)" ).text(total_general.toFixed(2)+' lei');
              }
			  deseneaza()
	}
   