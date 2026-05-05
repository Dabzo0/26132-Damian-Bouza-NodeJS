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
        //case 'PUT': proximamente...
        default:
            impFn.imprimirErrorParametros("comando", com);
            impFn.imprimirHelp("comando");
            return false;
    }
}

export const validarParametros = (accion, datos) => {    
    console.log(`Parámetros: [ ${datos.length} ] => ${datos}`)

    const recurso = (datos.length < 1 ) ? "sin-parametros" : capturarRecurso(datos[0].toLowerCase());
    
    switch(recurso){
        case 'products':   
            switch (accion) {        
                case 'GET':
                    const productIdGet = capturarId(datos[0].slice(recurso.length),false);

                    if (productIdGet===false){
                        impFn.imprimirErrorParametros("id",`${datos[0].includes("/")?datos[0].slice((recurso.length)+1):datos[0].slice(recurso.length)}`);
                        impFn.imprimirHelp(accion);
                        return false;
                    }else{
                         return {"endPoint":`${recurso}${productIdGet}`,"body":null};
                    }
                            
                    break;// Este break esta de más...
                    
                case 'POST':            
                    if (datos.length < 4) {
                        impFn.imprimirErrorParametros("parametrosInsuficientes");
                        impFn.imprimirHelp(accion)
                        return false;
                    }
                    
                    const bodyProducts = prarametrosProducts(datos.slice(1))
                            
                    if (bodyProducts===false) {
                        impFn.imprimirHelp(accion);
                        return false;
                    }else{
                        return { "endPoint":`${recurso}`,"body": bodyProducts};
                    }
                    
                    break;

                case 'DELETE':
                    const productIdDelete = capturarId(datos[0].slice(recurso.length));

                    if (productIdDelete===false){
                        impFn.imprimirErrorParametros("id",`${datos[0].includes("/")?datos[0].slice((recurso.length)+1):datos[0].slice(recurso.length)}`);
                        impFn.imprimirHelp(accion);
                        return false;
                    }else{
                        return {"endPoint":`${recurso}${productIdDelete}`,"body":null};
                    }
                            
                    break;
            
                //case 'PUT': proximamente...
            }
            break;

        //case 'carts': proximamente...
        //case 'users': proximamente...
        //case 'auth': proximamente...

        case 'sin-parametros':
            impFn.imprimirErrorParametros("parametrosInsuficientes");

        default:
            if (recurso===false) impFn.imprimirErrorParametros("recurso",datos[0]);
            impFn.imprimirHelp(accion);
            return false;
    }
}

const capturarRecurso = (datos) => {
    const recusosValidos = ["products","carts","users","auth"]
    const recurso = datos.includes("/")? datos.slice(0,datos.indexOf("/")).toLowerCase():datos.toLowerCase();

    if(!recusosValidos.includes(recurso)) return false;

    return recurso
}

const capturarId = (datos, requerido=true) => {
    const soloNumeros = /^\d+$/;
    
    if (requerido){
        if (datos === "" || datos=== "/") return false;
    }else{
        if (datos === "" || datos=== "/") return "";
    }
    
    const id = datos.slice(datos.indexOf("/")+1);
    
    if (!soloNumeros.test(id) || id == 0) return false;
    
    return `/${Number(id).toString()}`;

}

const prarametrosProducts= (datos) => {
    const soloLetras = /^[a-zA-Z]+$/;
    const contieneLetra = /[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/;
    const title = datos[0];
    const price = Number(datos[1].replace(" ", "."));
    const category = datos[2].toLowerCase();
    let todoOk=true;
    
    if (!contieneLetra.test(title)){
        impFn.imprimirErrorParametros("title", datos[0]);
        todoOk = false;
    }
    if (isNaN(price) || price < 0){
        impFn.imprimirErrorParametros("price",datos[1]);
        todoOk = false;
    }
    if (!soloLetras.test(category)){
        impFn.imprimirErrorParametros("category",datos[2]);
        todoOk = false;
    }

    if (!todoOk){
        return false;
    }else{
        return {"title": title,"price": price,"category": category};
    }
}