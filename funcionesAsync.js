import { imprimirResultado, imprimirAyudaError } from "./funcionesImprimir.js"

export const consultaApi = async (metodo,url,body=null) => {
    console.log(`Se inicia el ${metodo}`)
    try {
        //Se realiza la petición al servidor.
        const response = await fetch(`${url}`,
                                     { method: `${metodo}`,
                                       headers: { 'Content-Type': 'application/json' },
                                       ...(body&&{body: JSON.stringify(body)}) } // <--- Se agrega la clave "body" sólo si so la recibe al llamar esta fucnión.
                                    )
        
        //Se captura si el servidor responde un 4XX o 5XX, o algun otro, que idique que no puede dar respuesta a la petición.
        if (!response.ok) throw new Error(`Error al intentar realizar el ${metodo}, status: ${response.status}`);
        //console.log(response)
        
        //Se evita resultado = Promise { <pending> }.
        const resultado = ([].concat(await response.json())).map(p => ({
                                                            "id" : p.id,
                                                            "nombre" : p.title,
                                                            "precio" : p.price,
                                                            "cat" : p.category,
                                                            "desc" : p.description || "Sin descripción",
                                                            "img": p.image || "Sin imágen",
                                                            })
                                                        ); // Cuidado, este map se puede hacer de esta manera porque Fakestoreapi devuele un directamente [{...}] <- un objeto que solo contiene el array.
                                                           // Si la API devolviara los datos dentro una clave del objeto se debe usar "([].concat(await response.json().<clave>))" en donde <clave> es la clave que contiene el array a mapear ["clave": {...}]
                                                           // EL [].concat() es para forzar el mapeo de un objeto, en caso de que la api devuelva solo un array {...}
        //console.log(resultado);
        imprimirResultado(metodo,resultado);
        console.log(`>> Se realizó exitosamente la petición " ${metodo} "`); 
    } catch (error) {
        console.log(`>> Error: ${error.message}.`);
        imprimirAyudaError(error.message);
        console.log(`>> No se pudo realizar la petición " ${metodo} "`);        
    } finally{
        console.log(`Fin del ${metodo}.`)
    }
}

/* Luego del Rework todo que sigue es innecesario... Lo conservo por las dudas! XD
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
*/