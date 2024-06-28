const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const url = "mongodb://127.0.0.1:27017/Concecionaria";
const port = 3003;

mongoose
  .connect(url, {})                              //metodo que establece la cone {vacias} pq no hay opciones add
                                                 //promesa
  .then(() => console.log("Conectado a Base de Datos de la Concecionaria")) //metodo exito
  .catch((e) => console.log("El error de conexión es: " + e));//metodo error

  const infoSchema = new mongoose.Schema({
    ano: String,
    modelo: String
  }, { _id: false });
  //estructura de doc en mdb
  const vehiculoSchema = new mongoose.Schema({
    marca: String,
    info: infoSchema
  }, { versionKey: false });


const Vehiculo = mongoose.model("Vehiculo", vehiculoSchema);  //modelo-constr de doc para interac con bdd(mongo)

app.use(cors()); //metodo permite solic de http desde cualquier origen
app.use(bodyParser.json());//midleware-metodo parsea la solicitud en for json y los pasa a reqbody paa facilitar manip




app.post("/envio_v", async (req, res) => { //metodo post para guardar los autos en mdb ;ruta:envio_v
  //rq: obj de solicitud ntrante, res: respuesta
    // console.log(req.body);
 
    try {
      const nuevoVehiculo = new Vehiculo({          //nueva instancia con constructor del modelo
        marca: req.body.marca,
        info: {
          ano: req.body.ano,         //accede datos especificos ingresados en el cuerpo de la solicitud
          modelo: req.body.modelo
        }
      });

    const vehiculoGuardado = await nuevoVehiculo.save();//save():guardar vehiculo, await espera que guarde para seguir
    res.status(200).json(vehiculoGuardado); //guarda el auto en formato json 200:ok
  } catch (err) {
    res.status(500).json({ error: err.message });//devuelve el error 500:sv error
  }
});

app.get('/i' , async (req,res) =>{
  const vh = await Vehiculo.find(); //metodo para buscar los vehiculos en mdb
  res.send( vh );
})

const mostrar = async () => {  //metodo para mostrar los autos en consola
	const vh = await Vehiculo.find()
	console.log(vh)
}
mostrar();

app.listen(port, () => {   //inicia servidor en puerto definido
  console.log("Ejecutando en http://localhost:" + port);
});



