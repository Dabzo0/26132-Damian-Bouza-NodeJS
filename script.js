import { validarComando, validarParametros,  } from "./funciones.js"
import { consultaApi } from "./funcionesAsync.js" 

const url= `https://fakestoreapi.com/`

const accion = validarComando(process.argv.length > 2 ? process.argv[2] : "");

const parametrosValidos = accion ? validarParametros(accion, process.argv.slice(3)) : false;

if (!(parametrosValidos === false)) await consultaApi(accion,`${url}${parametrosValidos.urlFin}`,parametrosValidos.body);

console.log("Done...")
