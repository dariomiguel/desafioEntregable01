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

        const notValid = this.isNotValidCode(code);//Antes de agregar verifica si es valido o no
        
        notValid ? //Si no es valido arroja un error, si es valido la agrega a la lista.
            console.error("Atención: El código se repite!") : 
            this.add(title, description, price, thumbnail, code, stock);
    }

    //Validación para verificar que el código no se repita.
    isNotValidCode = (code) => this.products.some((product) => product.code === code)

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

//6_Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);

//7_Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
manager.getProductById(2)