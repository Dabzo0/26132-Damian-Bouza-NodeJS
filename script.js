import * as func from "./funciones.js"
import * as asyncFunc from "./funcionesAsync.js"

const accion = func.validarComando(process.argv.length > 2 ? process.argv[2] : "");

if(accion){
    const parametrosValidos = func.validarParametros(accion, process.argv.slice(3));
    if (parametrosValidos){
        await asyncFunc.seEjecuta(accion,parametrosValidos);
    }
}

console.log("Done...")
