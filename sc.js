
function EnviarAutos() {
    

    let marca = document.forms["Vei"]["txtMa"].value;
    let ano = document.forms["Vei"]["txtA"].value;
    let modelo = document.forms["Vei"]["txtMo"].value;

        
     let doc = {marca: marca, ano: ano, modelo: modelo };//crea un objeto 
      let docJSON = JSON.stringify(doc)   //y convierte a json(formato para enviar datos http)

      console.log(marca);
      console.log(ano);
      console.log(modelo);//muestra en consola los valores
  
      console.log(docJSON);//muestra la representacion json en consola


      fetch('http://localhost:3003/envio_v' ,{//solicitud con servidor que especifica datos de auto
       
        method: "post",
        headers: {
             "Content-Type": "application/json" //configuracion de encabezado que especifica que la solicitud esta en json
        },
    
        body: docJSON//cuerpo de la solicitud http que envia el serv contendar datos en formato json

      })

}

