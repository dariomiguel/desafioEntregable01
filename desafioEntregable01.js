//Creamos la clase ProductManager que contendra los productos y metodos que necesitemos para la actividad.
class ProductManager {
    //Se construye el elemento inicial (un array vacío).
    constructor(){
        this.products = [];
    }

    //Se crea el retorno para ver los productos ingresados.
    getProducts(){
        return console.log(this.products);
    }
    
    //Se crea un metodo para agregar un nuevo producto a la lista de productos.
    add(title, description, price, thumbnail, code, stock){
            const product = {
                id: this.products.length,
                title : title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock
            }
        this.products.push(product);
    }

    //Se crea el método para agregar productos validando previamente.
    addProduct(title, description, price, thumbnail, code, stock){
        if (this.isNotValidCode(title, description, price, thumbnail, code, stock)){
            console.error("Atención: Verifique que todos los datos se hayan cargado correctamente o que el código no se repita!"); 
            return
        } //Antes de agregar verifica si es válido o no

        //Si no es válido arroja un error, si es válido la agrega a la lista.
        this.add(title, description, price, thumbnail, code, stock);
        console.log(this.products); 
    }

    //Validación para verificar que el código no se repita o que no se hayan cargado todos los datos.
    isNotValidCode = (title, description, price, thumbnail, code, stock) => { 
        //Verificamos que existe un codigo con el mismo nombre.
        const checker = this.products.some((product) => product.code === code);
        //Verificamos que esten todos los productos en la carga de datos.
        const someValid = !title || !description || !price || !thumbnail || !code || !stock;

        return checker || someValid;
    }

    //Verificación si existe un producto con el ID
    getProductById = (id) => {
        const product = this.products.find((product) => product.id == id);

        product ?
        console.log(product):
        console.log(`No hay un producto con el número de ID ${id}.`)
    }
}


/*Consignas
DESAFÍO ENTREGABLE - PROCESO DE TESTING*/

//1_Se creará una instancia de la clase “ProductManager”
const manager = new ProductManager();

//2_Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
manager.getProducts();
console.log("---------------------------------------")

/*3_Se llamará al método “addProduct” con los campos:
title: “producto prueba”
description:”Este es un producto prueba”
price:200,
thumbnail:”Sin imagen”
code:”abc123”,
stock:25*/
manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);

//4_El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
//5_Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
manager.getProducts();
console.log("---------------------------------------")

//6_Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);
console.log("---------------------------------------")


//7_Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
manager.getProductById(2);
