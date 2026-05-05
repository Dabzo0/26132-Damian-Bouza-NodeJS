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
    console.log(`Parámetros: [ ${datos.length} ] => ${datos}`)

    switch (accion) {        
        case 'GET':
            if (datos.length < 1 ) {
                impFn.imprimirErrorParametros("parametrosInsuficientes");
                impFn.imprimirHelp("traer");
                return false;
            }
            
            const recursoGet = capturarRecurso(datos[0].toLowerCase());
            
            switch (recursoGet){
                case 'products':
                    const productIdGet = capturarId(datos[0].slice(recursoGet.length),false);

                    if (productIdGet===false){
                        impFn.imprimirErrorParametros("id",datos[0].slice(datos[0].indexOf("/")+1));
                        impFn.imprimirHelp("traer");
                        return false;
                    }else{
                        return {"endPoint":`${recursoGet}${productId}`,"body":null};
                    }
                    
                    break;

                default:
                    impFn.imprimirErrorParametros("recurso",datos[0]);
                    impFn.imprimirHelp("traer");
                    return false;
                    break;
            }
            
        case 'POST':            
            if (datos.length < 4) {
                impFn.imprimirErrorParametros("parametrosInsuficientes");
                impFn.imprimirHelp("ingresar")
                return false;
            }
            
            const recursoPost = capturarRecurso(datos[0].toLowerCase());

            switch (recursoPost){
                case 'products':
                    const bodyProducts = prarametrosProducts(datos.slice(1))
                    
                    if (bodyProducts===false) {
                        impFn.imprimirHelp("ingresar");
                        return false;
                    }else{
                        return { "endPoint":`${recursoPost}/`,"body": bodyProducts};
                    }
                    break;
            
                default:
                    impFn.imprimirErrorParametros("recurso",datos[0]);
                    impFn.imprimirHelp("ingresar")
                    return false;
                    break;
            }
            
            break;

        case 'DELETE':
            if (datos.length < 1) {
                impFn.imprimirErrorParametros("parametrosInsufisientes");
                impFn.imprimirHelp("eliminar");
                return false;
            }

            const recursoDelete = capturarRecurso(datos[0].toLowerCase());

            switch (recursoDelete){
                case 'products':
                    const productIdDelete = capturarId(datos[0].slice(recursoDelete.length));

                    if (productIdDelete===false){
                        impFn.imprimirErrorParametros("id",`${datos[0].includes("/")?datos[0].slice((recursoDelete.length)+1):datos[0].slice(recursoDelete.length)}`);
                        impFn.imprimirHelp("eliminar");
                        return false;
                    }else{
                        return {"endPoint":`${recursoDelete}${productIdDelete}`,"body":null};
                    }
                    
                    break;

                default:
                    impFn.imprimirErrorParametros("recurso",datos[0]);
                    impFn.imprimirHelp("eliminar");
                    return false;

                    break;
            }

        default :
            return false;
    }
}

const capturarRecurso = (datos) => {
    const recusosValidos = ["products","carts","users","auth"]
    const recurso = datos.includes("/")? datos.slice(0,datos.indexOf("/")).toLowerCase():datos.toLowerCase();

    if(!recusosValidos.includes(recurso)){
        return false
    }

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
    console.log(datos)
    const soloLetras = /^[a-zA-Z]+$/;
    const contieneLetra = /[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/;
    const title = datos[0];
    const price = Number(datos[1].replace(" ", "."));
    const category = datos[2].toLowerCase();
    let todoOk=true;
    console.log(datos)
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