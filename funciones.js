import * as impFn from "./funcionesImprimir.js"

export const validarComando = (com) => {
    const comando = com.toUpperCase()
    console.log("Comando: "+comando)
    switch (comando){
        case 'G':
        case 'GET':
            return 'GET';
        case 'P':
        case 'POST':
            return 'POST';
        case 'D':
        case 'DELETE':
            return 'DELETE';
        default:
            impFn.imprimirErrorParametros("comando", com);
            impFn.imprimirHelp("comando");
            return false;
    }
}

export const validarParametros = (accion, datos) => {
    const soloNumeros = /^\d+$/;
    const esSoloLetras = /^[a-zA-Z]+$/;
    const contieneLetra = /[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/;
    
    console.log(`Parámetros: [ ${datos.length} ] => ${datos}`)
    
    switch (accion) {        
        case 'GET':
            if (datos.length < 1) {
                impFn.imprimirErrorParametros("parametrosInsuficientes");
                impFn.imprimirHelp("traer");
                return false;
            }
            const dataGet = datos[0].toLowerCase().replace(" ", ".");
            
            if (dataGet.slice(0,9) != "products/") {
                impFn.imprimirErrorParametros("",dataGet);
                impFn.imprimirHelp("traer");
                return false;
            }
            
            const idGet = dataGet.slice(9);

            console.log(dataGet.slice(0,9)+" --- "+idGet);
            
            if (idGet!=""){
                if (!soloNumeros.test(idGet) || idGet == 0 ){
                    impFn.imprimirErrorParametros("id",idGet);
                    impFn.imprimirHelp("traer");
                    return false;
                }
            }
            return {"urlFin":`products/${idGet}`,"body":null};
            break;
        
        case 'POST':            
            if (datos.length < 4) {
                impFn.imprimirErrorParametros("parametrosInsuficientes");
                impFn.imprimirHelp("ingresar")
                return false;
            }
            let todoOk = true;
            const title = datos[1];
            const price = Number(datos[2].replace(" ", "."));
            const category = datos[3].toLowerCase();
            
            if (datos[0] != "products"){
                impFn.imprimirErrorParametros("",datos[0]);
                todoOk = false;
            }
            if (!contieneLetra.test(title)){
                impFn.imprimirErrorParametros("title", datos[1]);
                todoOk = false;
            }
            if (isNaN(price) || price < 0){
                impFn.imprimirErrorParametros("price",datos[2]);
                todoOk = false;
            }
            if (!esSoloLetras.test(category)){
                impFn.imprimirErrorParametros("category",datos[3]);
                todoOk = false;
            }
            
            if (!todoOk) {
                impFn.imprimirHelp("ingresar");
                return false;
            }

            return { "urlFin":`products/`,"body": {"title": title,"price": price,"category": category}};
            break;

        case 'DELETE':
            if (datos.length < 1) {
                impFn.imprimirErrorParametros("parametrosInsufisientes");
                impFn.imprimirHelp("eliminar");
                return false;
            }
            
            const dataDelete = datos[0].toLowerCase().replace(" ", ".");
            if (dataDelete.slice(0,9) != "products/") {
                impFn.imprimirErrorParametros("",dataDelete);
                impFn.imprimirHelp("eliminar");
                return false;
            }

            const idDelete = dataDelete.slice(9);

            if (!idDelete){
                impFn.imprimirErrorParametros("id",idDelete);
                impFn.imprimirHelp("traer");
                return false;
            }else{
                if (!soloNumeros.test(idDelete) || idDelete == 0 ){
                    impFn.imprimirErrorParametros("id",idDelete);
                    impFn.imprimirHelp("traer");
                    return false;
                }
            }

            return {"urlFin": `products/${idDelete.toString()}` ,"body":null};
            break;
            
        default :
            return false;
    }
}