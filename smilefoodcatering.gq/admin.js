var smiles=null;
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function (){
    if (this.readyState == 4 && this.status == 200) {  
        produse = JSON.parse(this.responseText);
        afiseza_produse();
          }
      };
xhttp.open("GET", "https://magazinonline-cbb38.firebaseio.com/produse/.json", true);
xhttp.send();
  
  function afiseza_produse(){

	  var str='<table><tr><th>Imagine</th><th>Nume</th><th>Pret</th><th>Cantitate</th><th></th><th></th></tr>';
      for(var i in produse){
          if(produse[i]==null){continue}
          str+= `
       	   		<tr>    
                       <td><img width="100" height="70" src="${produse[i].imagine}"/></td>
                       <td><a href="details.html?id=${i}">${produse[i].nume}</a></td>
                       <td>${produse[i].pret}</td>
                       <td>${produse[i].stoc}</td>
                       <td><a href="edit.html?id=${i}">Modifica</a></td>
                       <td><a href="delete.html?id=${i}">Sterge</a></td>
                 </tr>`;      
      }
      document.querySelector(".produse").innerHTML=str;
   } 
    
   
