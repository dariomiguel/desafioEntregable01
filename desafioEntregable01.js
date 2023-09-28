//Creamos la clase ProductManager que contendra los productos y metodos que necesitemos para la actividad.
class ProductManager {
    //Se construye el elemento inicial (un array vacío).
    constructor(){
        this.products = [];
    }

    //Se crea el retorno para ver los productos ingresados.
    getProducts(){
        return this.products;
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
    getProductById(id){
        
    }

}

const manager = new ProductManager();


console.log(manager.getProducts());
manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);
console.log(manager.getProducts());
manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);
console.log(manager.getProducts());
manager.addProduct("Monster","Bebida energizante",800,"monster.jpg","msndf4",555);
console.log(manager.getProducts());