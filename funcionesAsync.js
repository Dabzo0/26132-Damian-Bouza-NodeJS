async function traerProductos(data){        
    try {
        const urlFetch = 'https://fakestoreapi.com/'+data;
        const response = await fetch(urlFetch);
        //Interrumpe el Try captura si el servidor responde un 4XX o 5XX        
        if (!response.ok) throw new Error(`Error al intentar traer productos, status: ${response.status}.`);
        const resultado = await response.json();//Se evita resultado = Promise { <pending> }
        console.log(resultado);
    } catch (error) {
        console.log(">> Error: "+error.message);
        guiaErrores(error.message);        
    } finally{
        console.log("Fin de la consulta.")
    }
}

async function ingresarProducto (datos) {
    try{
        const response = await fetch('https://fakestoreapi.com/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos)})
        //Se valida que el nuevo producto se haya ingresado exitosamente
        if (response.status !=201) { throw new Error(`Error al intentar ingresar nuevo producto, status: ${response.status}.`);}
        const productoNuevo = await response.json();
        console.log(productoNuevo)

    }catch (error){
        console.log(">> Error: "+error.message);
        guiaErrores(error.message); 
    }finally{
        console.log("Fin del ingreso.")
    }
    
}

async function eliminarProducto (id) {
    try{
        const urlFetch= 'https://fakestoreapi.com/products/'+id;
        const response = await fetch(urlFetch, { method: 'DELETE'})
        //Se valida que el nuevo producto se haya ingresado exitosamente
        if (response.status !=200) { throw new Error(`Error al intentar eliminar el producto, status: ${response.status}.`);}
        const productoEliminado = await response.json();
        console.log(productoEliminado)

    }catch (error){
        console.log(">> Error: "+error.message);
        guiaErrores(error.message); 
    }finally{
        console.log("Fin de la eliminación.")
    }
    
}

export async function seEjecuta(accion, data){
    switch (accion){
        case 1:
            await traerProductos(data);
            break;
        case 2:
            await ingresarProducto(data);
            break;
        case 3:
            await eliminarProducto(data);
            break;
    }
    console.log("Bieen!!");
    return;
}

function guiaErrores(mensaje){
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