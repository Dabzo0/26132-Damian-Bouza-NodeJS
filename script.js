import { validarComando, validarParametros,  } from "./funciones.js"
import { consultaApi } from "./funcionesAsync.js" 
import { imprimirResultado } from "./funcionesImprimir.js" 

const url= `https://fakestoreapi.com/`;

const accion = validarComando(process.argv.length > 2 ? process.argv[2] : "");

const parametrosValidos = accion ? validarParametros(accion, process.argv.slice(3)) : false;

if (!(parametrosValidos === false)) {
    const respuesta= await consultaApi(accion,`${url}${parametrosValidos.endPoint}`,parametrosValidos.body,parametrosValidos.recurso);
    if (respuesta != "") imprimirResultado(accion,respuesta);
}

console.log("Done...");
