(function(){
    const server = "localhost"

    function $(selector){
        return document.querySelector(selector);
    }


    function render(){

       /* this.constructor = async function (){
                let response = await fetch("http://localhost/comprarapida/public/api/alumnos");
                let data = await response.json();
                this.getLista = data;
        }*/
    
        this.loader = function(visible){
                var load = $("#load");
            if(visible==true){ 
                load.style.height="1500px"
                load.style.width="1500px";
                load.style.visibility = "visible";
            }else{
                load.style.height="100x"
                load.style.width="100px";
                load.style.visibility = "hidden";       
            }

        }

        this.sweetalert = function(title,mensaje){
            Swal.fire({
                type: 'error',
                title: mensaje,
                text: title
              })
        
        }

    } 

    var render = new render();
    document.addEventListener("DOMContentLoaded", async function(){
      //render.constructor();   
    });

    $("#buscarx").addEventListener("change",function(ev){
        ev.preventDefault();
        console.log(ev.target.value);
        let option = ev.target.value;
        if(option=="Nombres y apellidos"){
            $("#nomyape").style.display = "block";
            $("#doc").style.display = "none";
        }
        else if(option=="Numero documento"){
            $("#doc").style.display = "block";
            $("#nomyape").style.display = "none";
        }else{
            $("#doc").style.display = "none";
            $("#nomyape").style.display = "none";     
        }   
        
    
    });

    $("#about").addEventListener("click", async function(e){
        e.preventDefault(); 
        if(e.target.id == "btnbuscar" ){
            
            buscarx = $("#buscarx").value;
            documento = $("#documento").value;
            Apaterno = $("#Apaterno").value;
            Amaterno = $("#Amaterno").value;
            nombres = $("#nombres").value;
            nrodocumento = $("#nrodocumento").value;
            console.log(documento);
            validacion = true;
            if(buscarx=="Buscar por .."){

                render.sweetalert("(*)Campo obligatorio","Seleccione tipo de busqueda.");
                validacion = false; 
            }
            if(documento=="Seleccione" && buscarx=="Numero documento"){
                render.sweetalert("(*)Campo obligatorio","Seleccione tipo documento");
                validacion = false;  
            }
            if(documento!="Seleccione" && buscarx=="Numero documento" && nrodocumento==""){
                render.sweetalert("(*)Campo obligatorio","Ingrese su numero de documento");
                validacion = false;  
            }
            
            if(validacion==true){
                render.loader(true);
                if(buscarx=="Numero documento"){
                    let param = [buscarx,documento,nrodocumento];     
                    var response = await fetch("http://"+server+"/cpsplima/public/api/colegiados/"+param);  
                  }
                  else if(buscarx=="Nombres y apellidos"){
                    let param = [buscarx,Apaterno,Amaterno,nombres];     
                    var response = await fetch("http://"+server+"/cpsplima/public/api/colegiados/"+param);  
                  }else{
                    var response = await fetch("http://"+server+"/cpsplima/public/api/colegiados");  
                  }  
                
                    let data = await response.json();
                    console.log(data);

                    let template =``;
                    if(data!='undefined'){
                        render.loader(false);
                        for(i of  data){
                            console.log(i.Cod_Alumno);
                            template += `
                            <div class="list-group-item list-group-item-action border-primary">           
                                <div class="d-flex w-100 justify-content-between">
                                <h5>${i.Paterno} ${i.Materno}, <small class="text-muted">${i.Nombres}</small></h5>
                                <small>${i.colegiatura}</small>
                                </div>
                                <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                                <small>Donec id elit non mi porta.</small>
                                <a href="#" class="btn btn-primary"id="codigo"  data-toggle="modal" data-target=".bd-example-modal-lg"  data-alumno="${i.Cod_Alumno}">Detalle</a>         
                            </div>
                            `;
                        }
                    }else{
                        render.loader(false);
                        template+=`
                            <div class="list-group-item list-group-item-action">     
                                <div class="d-flex w-100 justify-content-between">
                                <h5>No existen registros:</h5>
                                
                                <small>Donec id elit non mi porta.</small>
                            </div>
                            `;
                    }
                    $("#lista").innerHTML = template;
            }

                  
        }
        
    });

    $("#lista").addEventListener("click", async function(ev){
        ev.preventDefault();
        if(ev.target.id=="codigo"){
            console.log(ev.target.dataset.alumno);
            let param = ev.target.dataset.alumno;
            let response = await fetch("http://"+server+"/cpslima/public/api/codalumno/"+param);
            let data = await response.json();
            console.log(data);
            let template = ``;
            for(i of data){
            template +=`
                        <div>
                            <div class="card profile-card-3">
                                <div class="background-block">
                                    
                                </div>
                                <div class="profile-thumb-block">
                                    <img src="main/img/solologo.png" alt="profile-image" class="profile"/>
                                </div>
                                <div class="card-content">
                                    <h2>${i.Paterno} ${i.Materno} ${i.Nombres} <small><p>${i.colegiatura}</p></small></h3>
                                    <div class="icon-block"><h3><span class="badge badge-success">Habilitado</span></h3></div>
                                    </div>
                                </div>
                                <p class="mt-3 w-100 float-left text-center"><strong>.....</strong></p>
                        </div>
            `;
            }
            $("#body").innerHTML=template;
            
        }
      
    });



    





})();