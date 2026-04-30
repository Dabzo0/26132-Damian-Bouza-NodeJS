function help(tipo){
    console.log(">> Ingrese:");  
    switch (tipo){
        case "comando": 
            console.log("\t-> GET     para CONSULTAR productos.");
            console.log("\t-> POST    para INGRESAR un producto.");
            console.log("\t-> DELETE  para ELIMIAR un producto con el id específico.");
            break;
        case "traer":
            console.log("\t-> GET products              para consultar por TODOS los productos.");
            console.log("\t-> GET products/<productid>  para consultar por un producto con el ID específico.");
            console.log("\t\t - <productid> Id del producti (sólo número).");
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
    return null;
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

export function validarComando(com){
    const comando = com.toUpperCase()
    console.log("Comando: "+comando)
    switch (comando){
        case "GET":
            console.log("Se procede al GET")
            return 1;
        case "POST":
            console.log("Se procede al POST")
            return 2;
        case "DELETE":
            console.log("Se procede al DELETE")
            return 3;
        default:
            listaErrores("comando", comando);
            return help("comando");
    }
}

export function validarParametros(accion, datos){
    
    console.log("Parámetros : "+datos.length+" - "+datos)
    
    switch (accion) {
        
        case 1:            
            if (datos.length < 1) {
                listaErrores("parametrosInsuficientes");
                return help("traer");
            }
            const dataGet = datos[0].toLowerCase().replace(" ", ".");
            const idGet = Number(dataGet.slice(9));
            //console.log(data.slice(0,9)+" "+data.slice(9));
            if (dataGet.length > ("products/").length){
                if (dataGet.slice(0,9) != "products/") {
                    listaErrores("",dataGet);
                    return help("traer");
                }
                if (!Number.isInteger(idGet) || idGet<1){
                    listaErrores("id",dataGet.slice(9));
                    return help("traer");
                }
            }else{
                if (dataGet!="products") {
                    listaErrores("",dataGet);
                    return help("traer");}
            }

            return dataGet;
        
        case 2:            
            if (datos.length < 4) {
                listaErrores("parametrosInsuficientes");
                return help("ingresar");
            }
            let products = datos[0];
            const title = datos[1];
            const price = datos[2].replace(" ", ".");
            const category = datos[3].toLowerCase();
            const esSoloLetras = /^[a-zA-Z]+$/;
            const contieneLetra = /[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/;
            if (products != "products"){
                listaErrores("",products);
                products=false;
            }
            if (!contieneLetra.test(title)){
                listaErrores("title", title);
                products=false;
            }
            if (isNaN(price)){
                listaErrores("price",price);
                products = false;
            }
            if (!esSoloLetras.test(category)){
                listaErrores("category",category);
                products=false;}
            if (!products){return help("ingresar");}
            
            return {"title":datos[1],"price": parseInt(datos[2]),"category":datos[3]};
            break;

        case 3:
            if (datos.length < 1) {
                listaErrores("parametrosInsufisientes");
                return help("eliminar");
            }
            const dataDelete = datos[0].toLowerCase();
            const idDelete = Number(dataDelete.slice(9));
            if (dataDelete.length < ("products/").length + 1){
                listaErrores("",dataDelete);
                return help("eliminar");

            }else{
                if(dataDelete.slice(0,9)!="products/"){
                    listaErrores("",dataDelete);
                    return help("eliminar");
                }
                if (!Number.isInteger(idDelete) || idDelete < 1){
                    listaErrores("id",dataDelete.slice(9));
                    return help("eliminar");
                }
            }

            return idDelete.toString();
            break;
        
    }
    
    return false;
}