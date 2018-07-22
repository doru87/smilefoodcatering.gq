 function sterge_produs(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (){
            if (this.readyState == 4 && this.status == 200) {  
               produs = JSON.parse(this.responseText);
               window.location = "admin.html";
            }
        };
        var id = window.location.search.substring(4)
        xhttp.open("DELETE",  "https://magazinonline-cbb38.firebaseio.com//produse/"+id+"/.json", true);
        xhttp.send();
    }