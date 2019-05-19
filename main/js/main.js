(function(){
    const server = "localhost"
    //const server = "www.allcommerceperu.com"

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
                load.style.height="100%"
                load.style.width="100%";
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
                        
                        if(buscarx=="Numero documento"){
                            console.log(data[0]);
                            template += `
                            <div class="list-group-item list-group-item-action border-primary">           
                                <div class="d-flex w-100 justify-content-between">
                                <h5>${parseInt(data[0].Cod_Matricula)} || ${data[0].Paterno} ${data[0].Materno}, <small class="text-muted">${data[0].Nombres}</small></h5>
                                <small><a href="#" id="codigo"  data-toggle="modal" data-target=".bd-example-modal-lg"  data-alumno="${data[0].Cod_Alumno}">Ver detalle</a>   </small>
                                </div>
                               
                                <strong><p style="color:blue;" class="mb-1">CDR I LIMA Y CALLAO</p></strong>
                                <small>.......................</small>
                                        
                            </div>
                            `;
                        }else{
                            for(i of  data){
                                console.log(parseInt(i.Cod_Matricula));
                                template += `
                                <div class="list-group-item list-group-item-action border-primary">           
                                    <div class="d-flex w-100 justify-content-between">
                                    <h5>${parseInt(i.Cod_Matricula)} || ${i.Paterno} ${i.Materno}, <small class="text-muted">${i.Nombres}</small></h5>
                                    <small><a href="#" id="codigo"  data-toggle="modal" data-target=".bd-example-modal-lg"  data-alumno="${i.Cod_Alumno}">Ver detalle</a>   </small>
                                    </div>
                                   
                                    <strong><p style="color:blue;" class="mb-1">CDR I LIMA Y CALLAO</p></strong>
                                    <small>.......................</small>
                                            
                                </div>
                                `;
                            }
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
            //let response = await fetch("http://"+server+"/cpsplima/public/api/codalumno/"+param);
            let response = await fetch("http://"+server+"/cpsplima/public/api/codalumno_colegiados/"+param);
            let data = await response.json();
            console.log(data);
             let template = ``;
            if(data!='undefined'){
                for(i of data){
                    var fecha = new Date(i.VIGENCIA);
                    dd = fecha.getDate()+1;
                    mm = fecha.getMonth()+1;
                    aaaa = fecha.getFullYear();
                    dd = (dd<10)?'0'+dd:dd;
                    mm = (mm<10)?'0'+mm:mm;

                    console.log(fecha);
                    console.log(dd);
                    console.log(mm);
                    console.log(aaaa);
                template +=`
                            <div>
                                <div class="card profile-card-3">
                                    <div class="background-block">
                                    
                                    </div>
                                    <div class="profile-thumb-block">
                                        <img src="main/img/solologo.png" alt="profile-image" class="profile"/>
                                    </div>
                                    <div class="card-content">
                                        <h2>${i.Paterno} ${i.Materno}, ${i.Nombres} </h2>
                                        
                                            <div class="icon-block">
                                                
                                                <h5><strong><p class="mb-1">CDR I LIMA Y CALLAO</p></strong></h5>
                                                <h5><strong><small class="text-muted">VIGENCIA : </small>${dd}/${mm}/${aaaa}</strong></h5>`;
                                                if(i.ESTADO=='HABILITADO'){
                                                    template +=`<h3><span class="badge badge-success">HABILITADO</span></h3>`;
                                                }else{
                                                    template +=`<h3><span class="badge badge-danger">NO HABILITADO</span></h3>`;
                                                }
                                template +=`</div>
                                            <br>
                                        </div>
                                    </div>
                                    <center><h1><strong><small class="text-muted"><h4>Colegiatura</h4></small><strong><span class="badge badge-primary">${parseInt(i.Cod_Matricula)}</span></h1></center>
                            </div>`;   
                }
            }else{
                
                template +=`
                <div>
                    <div class="card profile-card-3">
                        <div class="background-block">
                        
                        </div>
                        <div class="profile-thumb-block">
                            <img src="main/img/solologo.png" alt="profile-image" class="profile"/>
                        </div>
                        <div class="card-content">
                            <h2>No presenta datos</h2>
                                <div class="icon-block">
                                    <h5><strong><p class="mb-1">***************</p></strong></h5>
                                    <h5><strong><small class="text-muted">VIGENCIA : </small>********</strong></h5>
                                        <h3><span class="badge badge-danger">NO HABILITADO</span></h3>
                                    </div>
                                <br>
                            </div>
                        </div>
                        <center><h1><strong><small class="text-muted"><h4>Colegiatura</h4></small><strong><span class="badge badge-primary">******</span></h1></center>
                </div>`; 
               
            }

            $("#body").innerHTML=template;
            
        }
      
    });



    





})();