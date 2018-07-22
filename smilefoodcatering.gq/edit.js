var meniu = null;
        function edit() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    produse = JSON.parse(this.responseText);
                    document.querySelector("[name=nume]").value = produse.nume;
                    document.querySelector("[name=imagine]").value = produse.imagine;
                    document.querySelector("[name=detalii]").value = produse.detalii;
                    document.querySelector("[name=pret]").value = produse.pret;
                    document.querySelector("[name=stoc]").value = produse.stoc;
                }
            };
            var id = window.location.search.substring(4)
            xhttp.open("GET", "https://magazinonline-cbb38.firebaseio.com/produse/" + id +"/.json", true);
            xhttp.send();
        }


        function modifica(form, event) {
            event.preventDefault();
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    window.location = "admin.html";
                }
            };
            var id = window.location.search.substring(4)
    
            xhttp.open("PUT", "https://magazinonline-cbb38.firebaseio.com/produse/"+ id +"/.json", true);
            xhttp.send(JSON.stringify({
                nume: form.querySelector("[name=nume]").value,
                imagine: form.querySelector("[name=imagine]").value,
                detalii: form.querySelector("[name=detalii]").value,
                pret: form.querySelector("[name=pret]").value,
                stoc: form.querySelector("[name=stoc]").value,
            }));
        }