export const imprimirHelp = (tipo) => {
    console.log(">> Ingresar:");  
    switch (tipo){
        case "comando": 
            console.log("\t-> GET     para CONSULTAR productos.");
            console.log("\t-> POST    para INGRESAR un producto.");
            console.log("\t-> DELETE  para ELIMIAR un producto con el id específico.");
            break;
        case 'GET':
            console.log("\t-> GET products              para consultar por TODOS los productos.");
            console.log("\t-> GET products/<productid>  para consultar por un producto con el ID específico.");
            console.log("\t\t - <productid> Id del producto (sólo número).");
            break;
        case 'POST':
            console.log("\t-> POST products <title> <price> <category>.");
            console.log("\t\t - <title> Nombre del producto (sin espacios).");
            console.log("\t\t - <price> Precio del producto (número).");
            console.log("\t\t - <categary> Categoría del producto (sin espacios).");
            break;
        case "DELETE":
            console.log("\t-> DELETE products/<productid>.");
            console.log("\t\t - <productid> Id del producto (sólo número).");
            break;    
        default:
            console.log("No te puedo ayudar! XD ...");        
    }
}

export const imprimirErrorParametros = (error="",dato="") => {
    switch (error){
        case "comando":
            console.log("[ "+dato+" ] No es un comando válido");
            break;
        case "parametrosInsuficientes":
            console.log("Parámetros insuficientes...")
            break;
        case "recusro":            
            console.log("- [ "+dato+" ] No contiene un recuro válido.");
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

export const imprimirResultado = (metodo, resultado) => {
    const Re = "\x1b[0m";//Reset
    const V = "\x1b[32m";//Color verde.
    const C = "\x1b[36m";//Color cián.
    const Ro = "\x1b[31m";//Color rojo.
    const Az = "\x1b[34m";//Color azul.
    const Am = "\x1b[33m";//Color amarillo.
    const Ma = "\x1b[35m";//Color Magenta.
    const N = "\x1b[1m";//Negrita.

    resultado.forEach((p, i) => {
            console.log(`\n📦 ${N}PRODUCTO${resultado.length>1?" # "+(i + 1):":"}${Re}`)
            console.log(`\t${N}${Am}id: ${p.id}${Re} -- ${N}${Az}${p.nombre}${Re}`)
            console.log(`\t${N}Categoría: ${Re}${Ma}${p.cat}${Re}${" ".repeat(20)}Precio: ${V}$${p.precio}${Re}`)
            console.log(`\t${N}Imágen: ${Re}${C}${p.img}${Re}`)
            console.log(`\t${N}Descripción: ${Re}${(p.desc).length>157?p.desc.slice(0,156)+" ...":p.desc}`)
            }
        );
    
    if (metodo==='GET'){console.log(`\n-- Total de productos: ${resultado.length}\n`)};
    if (metodo==='POST'){console.log(`\n\t✅ Ingresado!\n`)};
    if (metodo==='DELETE'){console.log(`\n\t🗑️  Ya NO existe.\n`)};

}

export const imprimirAyudaError = (mensaje) => {
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