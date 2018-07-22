var produs=null;
          function adauga(form,event){
              event.preventDefault();
            var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function (){
				if (this.readyState == 4 && this.status == 200) {  
				   produs = JSON.parse(this.responseText);
                  
                   window.location="admin.html";
				}
			};
			xhttp.open("POST", "https://magazinonline-cbb38.firebaseio.com/produse/.json", true);
				xhttp.send(JSON.stringify({
					  nume: form.querySelector("[name=nume]").value,
		              imagine: form.querySelector("[name=imagine]").value,
		              detalii: form.querySelector("[name=detalii]").value,
		              pret: form.querySelector("[name=pret]").value,
		              stoc: form.querySelector("[name=stoc]").value,
				}));
          }
