export function validarComando(com){
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
            listaErrores("comando", comando);
            help("comando");
            return false;
    }
}

export function validarParametros(accion, datos){
    const soloNumeros = /^\d+$/;
    const esSoloLetras = /^[a-zA-Z]+$/;
    const contieneLetra = /[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/;
    
    console.log(`Parámetros: [ ${datos.length} ] => ${datos}`)
    
    switch (accion) {        
        case 'GET':
            if (datos.length < 1) {
                listaErrores("parametrosInsuficientes");
                help("traer");
                return false;
            }
            const dataGet = datos[0].toLowerCase().replace(" ", ".");
            
            if (dataGet.slice(0,9) != "products/") {
                listaErrores("",dataGet);
                help("traer");
                return false;
            }
            
            const idGet = dataGet.slice(9);

            console.log(dataGet.slice(0,9)+" --- "+idGet);
            
            if (idGet!=""){
                if (!soloNumeros.test(idGet) || idGet == 0 ){
                    listaErrores("id",idGet);
                    help("traer");
                    return false;
                }
            }
            return {"id":idGet != "" ? parseInt(idGet).toString() : idGet,"body":null};
            break;
        
        case 'POST':            
            if (datos.length < 4) {
                listaErrores("parametrosInsuficientes");
                help("ingresar")
                return false;
            }
            let todoOk = true;
            const title = datos[1];
            const price = Number(datos[2].replace(" ", "."));
            const category = datos[3].toLowerCase();
            
            if (datos[0] != "products"){
                listaErrores("",datos[0]);
                todoOk = false;
            }
            if (!contieneLetra.test(title)){
                listaErrores("title", datos[1]);
                todoOk = false;
            }
            if (isNaN(price) || price < 0){
                listaErrores("price",datos[2]);
                todoOk = false;
            }
            if (!esSoloLetras.test(category)){
                listaErrores("category",datos[3]);
                todoOk = false;
            }
            
            if (!todoOk) {
                help("ingresar");
                return false;
            }

            return { "id":"","body": {"title": title,"price": price,"category": category}};
            break;

        case 'DELETE':
            if (datos.length < 1) {
                listaErrores("parametrosInsufisientes");
                return help("eliminar");
            }
            
            const dataDelete = datos[0].toLowerCase().replace(" ", ".");
            if (dataDelete.slice(0,9) != "products/") {
                listaErrores("",dataDelete);
                help("eliminar");
                return false;
            }

            const idDelete = dataDelete.slice(9);

            if (!idDelete){
                listaErrores("id",idDelete);
                    help("traer");
                    return false;
            }else{
                if (!soloNumeros.test(idDelete) || idDelete == 0 ){
                    listaErrores("id",idDelete);
                    help("traer");
                    return false;
                }
            }

            return {"id": idDelete.toString() ,"body":null};
            break;
            
        default :
            return false;
    }
}

function help(tipo){
    console.log(">> Ingresar:");  
    switch (tipo){
        case "comando": 
            console.log("\t-> GET     para CONSULTAR productos.");
            console.log("\t-> POST    para INGRESAR un producto.");
            console.log("\t-> DELETE  para ELIMIAR un producto con el id específico.");
            break;
        case "traer":
            console.log("\t-> GET products              para consultar por TODOS los productos.");
            console.log("\t-> GET products/<productid>  para consultar por un producto con el ID específico.");
            console.log("\t\t - <productid> Id del producto (sólo número).");
            break;
        case "ingresar":
            console.log("\t-> POST products <title> <price> <category>.");
            console.log("\t\t - <title> Nombre del producto (sin espacios).");
            console.log("\t\t - <price> Precio del producto (número).");
            console.log("\t\t - <categary> Categoría del producto (sin espacios).");
            break;
        case "eliminar":
            console.log("\t-> DELETE products/<productid>.");
            console.log("\t\t - <productid> Id del producto (sólo número).");
            break;    
        default:
            console.log("No te puedo ayudar! XD ...");        
    }
}

function listaErrores(error="",dato=""){
    switch (error){
        case "comando":
            console.log("[ "+dato+" ] No es un comando válido");
            break;
        case "parametrosInsuficientes":
            console.log("Parámetros insuficientes...")
            break;
        case "id":
            console.log("- El ID ingresado [ "+dato+" ], es inválido (número natural mayor a 1).")
            break;
        case "title":            
            console.log("- El Nombre del nuevo producto [ "+dato+" ], es inválido (al menos una letra).");
            break;
        case "price":            
            console.log("- El PRECIO del nuevo producto [ "+dato+" ], es inválido (sólo número).");
            break;
        case "category":            
            console.log("- La CATEGORÍA del nuevo producto [ "+dato+" ], es inválida (sólo letras).");
            break;
        default :
         console.log("- [ "+dato+" ] No válido");
    }
}

export function guiaErrores(mensaje){
    //Aquí una brebe orientación al usuario sobre el error...
    switch (mensaje){
            case "fetch failed":
                console.log("\t - Url inválida o inexistente.")
                break
            case "Unexpected end of JSON input":
                console.log("\t - No existe producto con ese ID")
                break                
        }
}