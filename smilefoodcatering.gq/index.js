var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function (){
    if (this.readyState == 4 && this.status == 200) {  
       produse = JSON.parse(this.responseText);
       afiseza_produse();
	
          }
      };
xhttp.open("GET", "https://magazinonline-cbb38.firebaseio.com//produse/.json", true);
xhttp.send();
var myVar;

  function afiseza_produse(){

       var str=""
       for(var i in produse){
           if(produse[i]==null){continue}

           str+= `   
        	   	<div class="food">      
                        <span><img width="250" height="200" style="width:100%" src="${produse[i].imagine}"/></span>
                        <span id="nume">${produse[i].nume}</span><br/>
                         <span id="pret">Pret: ${produse[i].pret} lei</span><br/> 
                        <a href="details.html?id=${i}" class="button">Detalii</a>
                        <a id ="adauga" href="" ><i class="fa fa-shopping-cart" style="font-size:40px"></i></a>
        	   			<input type="hidden" id="id_produs" value="${i}" />
        	   			<input type="hidden" id="quantity" value="1"/>
                    </div>
          
              `;
          
             
       }
       
       document.querySelector(".produse").innerHTML=str;
       
       $(".food").each(function(){
        $(this).find('#adauga').click(function(){
     		
     	    var id=$(this).parent().find('#id_produs').val();
     		var cant=$(this).parent().find('#quantity').val();

       	$(this).attr("href","cart.html?id="+id+"&cantitate="+cant+"");
       	
     });
       });
 
  } 
  
  