import { validarComando, validarParametros,  } from "./funciones.js"
import { consultaApi } from "./funcionesAsync.js" 

const accion = validarComando(process.argv.length > 2 ? process.argv[2] : "");

if(accion){
    const parametrosValidos = validarParametros(accion, process.argv.slice(3));
    if (!(parametrosValidos === false)) await consultaApi(accion,parametrosValidos.id,parametrosValidos.body);
}

console.log("Done...")
