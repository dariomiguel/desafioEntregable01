//Importamos el módulo para interactuar con archivos
import fs from 'fs';

//Creamos la clase ProductManager que contendra los productos y metodos que necesitemos para la actividad.
class ProductManager {

    //Se construye el elemento inicial (un array vacío).
    constructor(path) {
        this.products = this.getProducts() || [];
        this.path = path;

        this.counter = 0;

    }

    //Se crea el retorno de los productos ingresados en el archivo database.json .
    getProducts = async () => {
        //Verificamos que exista el archivo antes de leerlo
        try {
            if (!fs.existsSync(this.path)) return [];

            const lectura = await fs.promises.readFile(this.path, "utf-8");
            if(!lectura) return this.products; 

            return  this.products = JSON.parse(lectura) || [];

        } catch (error) {
            console.log("Hubo un error en el READ", error);
            throw error;
        }
    }

    //Se crea el método para agregar productos validando previamente.
    addProduct = async (title, description, price, thumbnail, code, stock) =>  {

        try{
            if (!fs.existsSync(this.path)) await fs.promises.writeFile(this.path, JSON.stringify([]), "utf-8");;
            //Antes de agregar verifica si es válido o no
            if (await this.isNotValidCode(title, description, price, thumbnail, code, stock)) {
                return console.log("Atención: Verifique que todos los datos se hayan cargado correctamente o que el código de producto no se repita!");
            }

            //Si es válido la agrega al array de lista de productos.
            const lectura = await fs.promises.readFile(this.path, "utf-8");
            this.products = JSON.parse(lectura);
            this.add(title, description, price, thumbnail, code, stock);

            const data = JSON.stringify(this.products, null, "\t");
            await fs.promises.writeFile(this.path, data, "utf-8");
        }
        catch (error) {
            console.log("Hubo un error en el proceso", error);
            throw error;
        }
    }
    
    //Se crea un método para agregar un nuevo producto a la lista de productos.
    add (title, description, price, thumbnail, code, stock) {
        const product = {
            id: this.createID(),
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };
        this.products.push(product);
    }

    //Validación para verificar que el código no se repita o que no se hayan cargado todos los datos.
    isNotValidCode = async(title, description, price, thumbnail, code, stock) => {
        this.products = await this.getProducts();
        //Verificamos que existe un codigo con el mismo nombre.
        const checker = this.products.some((product) => product.code === code);
        //Verificamos que esten todos los productos en la carga de datos.
        const someValid = !title || !description || !price || !thumbnail || !code || !stock;

        return checker || someValid;
    }

    //Verificación si existe un producto con el ID
    getProductById = async(id) => {
        this.products = await this.getProducts();
        const product = this.products.find((product) => product.id == id);

        if(!product) return `No hay un producto con el número de ID ${id}.`
        return product
    }

    //Método para buscar un ID especificado, con la clave y el valor a actualizar 
    updateProduct = async(id, key, newValue) =>{
        try{
            const product = await this.getProductById(id);
            if(typeof product === "string") return console.log(product);

            this.products = await this.getProducts();
            //Buscamos en que indice el id coincide
            const indice = this.products.findIndex((objeto) => objeto.id === id);

            product[key] = newValue; 
            this.products[indice] = product;

            const data = JSON.stringify(this.products, null, "\t");
            await fs.promises.writeFile(this.path, data, "utf-8");
            
        } catch (error) {
            console.log("Hubo un error en el proceso de actualización:", error);
        }
    }

    createID() {
        // Verificar si hay productos en el array
        if (this.products.length === 0) {
            this.counter = 0;
        } else {
            // Obtener el ID más grande del array de productos
            const maxID = Math.max(...this.products.map((product) => product.id));
            // Incrementar el contador en 1 y devolverlo como el próximo ID
            this.counter = maxID + 1;
        }
        
        return this.counter;
    }
    
    //Método para borrar uno de los productos
    deleteProduct = async(id) =>{
        try{
            const product = await this.getProductById(id);
            if(typeof product === "string") return console.log(product);

            this.products = await this.getProducts();
            //Buscamos en que indice el id coincide
            const indice = this.products.findIndex((objeto) => objeto.id === id);

            for (const key in product) {
                if (key !== 'id') product[key] = '';
            }

            this.products[indice] = product;

            const data = JSON.stringify(this.products, null, "\t");
            await fs.promises.writeFile(this.path, data, "utf-8");
        }catch(error) {
            console.log("Hubo un error al intentar eliminar el producto ", error);
        }
    }
}


/*Consignas
DESAFÍO ENTREGABLE - PROCESO DE TESTING

//1_Se creará una instancia de la clase “ProductManager”
const manager = new ProductManager("./database");

//Se crea una función asincronica que siga el orden necesitado
(async () => {
    //2_Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
    await manager.getProducts();

    //3_Se llamará al método “addProduct” con los campos:
    //title: “producto prueba”
    //description:”Este es un producto prueba”
    //price:200,
    //thumbnail:”Sin imagen”
    //code:”abc123”,
    //stock:25
    //manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);
    //4_El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
    await manager.addProduct("Camiseta de algodón", "Camiseta cómoda y transpirable", 19.99, "camiseta.jpg", "SKU123",50);
    await manager.addProduct("Camiseta de algodón", "Camiseta cómoda y transpirable", 19.99, "camiseta.jpg", "SKU123",50);

    // await manager.addProduct("Zapatillas deportivas", "Zapatillas ideales para hacer ejercicio", 29.99, "zapatillas.jpg", "SKU456",30);
    // await manager.addProduct("Bolso de cuero", "Bolso elegante de cuero genuino", 39.99, "bolso.jpg", "SKU789", 20);
    // await manager.addProduct("Tablet Android", "Tablet con sistema operativo Android", 199.99, "tablet.jpg", "SKU012", 10);
    // await manager.addProduct("Cámara digital", "Cámara de alta resolución para fotografía", 299.99, "camara.jpg", "SKU345", 5);
    
    //5_Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
    await manager.getProducts();

    //6_Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
    await manager.getProductById(0);

    //7	Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
    await manager.updateProduct(0, "title", "150 pokemon");

    //8 Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
    await manager.deleteProduct(0);

    //Más productos de prueba
    // await manager.addProduct("Zapatillas deportivas", "Zapatillas ideales para hacer ejercicio", 29.99, "zapatillas.jpg", "SKU456",30);
    // await manager.addProduct("Bolso de cuero", "Bolso elegante de cuero genuino", 39.99, "bolso.jpg", "SKU789", 20);
    // await manager.addProduct("Tablet Android", "Tablet con sistema operativo Android", 199.99, "tablet.jpg", "SKU012", 10);
    // await manager.addProduct("Cámara digital", "Cámara de alta resolución para fotografía", 299.99, "camara.jpg", "SKU345", 5);
    // await manager.getProductById(3);
    // await manager.addProduct("h", "h", 0.99, "h", "h", 5);
    // await manager.addProduct("a", "a", 0.99, "a", "a", 5);
    // await manager.addProduct("hola", "hola", 0.99, "hola", "hola", 5);
    
    // await manager.getProducts();
})();*/

export default ProductManager