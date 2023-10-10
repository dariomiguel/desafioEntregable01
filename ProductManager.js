//Importamos el módulo para interactuar con archivos
const fs = require('fs')

//Creamos la clase ProductManager que contendra los productos y metodos que necesitemos para la actividad.
class ProductManager {

    //Se construye el elemento inicial (un array vacío).
    constructor(path) {
        this.products = [];
        this.path = path;

        this.amountProductsPrevious = this.loadProducts();
        this.counter = this.amountProductsPrevious.length;
    }

    //Se crea el retorno de los productos ingresados en el archivo database.json .
    getProductsArray = async () => {
        //Verificamos que exista el archivo antes de leerlo
        try {
            if (!fs.existsSync(this.path)) {
                return this.products;
            }
            const lectura = await fs.promises.readFile(this.path, "utf-8");

            if(lectura === ""){
                return this.products;
            }

            this.products = JSON.parse(lectura);
            return this.products;
        } catch (error) {
            console.log("Hubo un error en el READ", error);
            throw error;
        }
    }

    //Método para ver en pantalla los productos ingresados
    getProducts = async () =>{
        if (!fs.existsSync(this.path) || fs.readFileSync(this.path, "utf-8") == "") {
            return console.log(this.products);
        }
        console.log(await this.getProductsArray());
    }

    //Se crea el método para agregar productos validando previamente.
    addProduct = async (title, description, price, thumbnail, code, stock) =>  {

        try{
            //Antes de agregar verifica si es válido o no
            if (this.isNotValidCode(title, description, price, thumbnail, code, stock)) {
                return console.log("Atención: Verifique que todos los datos se hayan cargado correctamente o que el código de producto no se repita!");
            //Si no existe el archivo se crea uno
            } else if (!fs.existsSync(this.path) || fs.readFileSync(this.path, "utf-8") == "") {
                fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
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
    isNotValidCode = (title, description, price, thumbnail, code, stock) => {
        //Verificamos que existe un codigo con el mismo nombre.
        const checker = this.products.some((product) => product.code === code);
        //Verificamos que esten todos los productos en la carga de datos.
        const someValid = !title || !description || !price || !thumbnail || !code || !stock;

        return checker || someValid;
    }

    //Verificación si existe un producto con el ID
    getProductById = async(id) => {
        const product = await this.searchById(id);
        product ?
            console.log(product) :
            console.log(`No hay un producto con el número de ID ${id}.`)
    }
    
    searchById = async(id) => {
        this.products = await this.getProductsArray();
        const product = this.products.find((product) => product.id == id);
        return product
    }

    //Método para buscar un ID especificado, con la clave y el valor a actualizar 
    updateProduct = async(id, key, newValue) =>{
        const product = await this.searchById(id);
        if(product){
            this.products = await this.getProductsArray();
            //Buscamos en que indice el id coincide
            const indice = this.products.findIndex((objeto) => objeto.id === id);

            product[key] = newValue; 
            this.products[indice] = product;

            const data = JSON.stringify(this.products, null, "\t");
            await fs.promises.writeFile(this.path, data, "utf-8");
        }else{
            console.log(`No hay un producto con el número de ID ${id}.`)
        }
    }

    createID() {
        if (!fs.existsSync(this.path) || fs.readFileSync(this.path, "utf-8") == "") {
            return 0;
        }
        const newId = this.counter;
        this.counter++; 
        return newId;
    }

    loadProducts() {
        try {
            if (!fs.existsSync(this.path)) {
                return [];
            }
            const data = fs.readFileSync(this.path, 'utf-8');
            if (data) {
                return JSON.parse(data);
            }
            return [];
        } catch (error) {
            console.error('Error al cargar productos desde el archivo JSON:', error);
            return [];
        }
    }
    

    //TO-DO
    // deleteProduct
}


/*Consignas
DESAFÍO ENTREGABLE - PROCESO DE TESTING*

//1_Se creará una instancia de la clase “ProductManager”
const manager = new ProductManager();

//2_Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
manager.getProducts();
console.log("---------------------------------------")

//3_Se llamará al método “addProduct” con los campos:
//title: “producto prueba”
//description:”Este es un producto prueba”
//price:200,
//thumbnail:”Sin imagen”
//code:”abc123”,
//stock:25
//manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);
//4_El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
//5_Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
manager.getProducts();
console.log("---------------------------------------")

//6_Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25);
console.log("---------------------------------------")

manager.addProduct("a","A","A","AAAA","a",3123123);
//4_El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
//5_Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
manager.getProducts();
console.log("---------------------------------------")

//7_Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
manager.getProductById(1);
*/

// const manager = new ProductManager();
// manager.getProducts();
// manager.addProduct("a","A","A","AAAA","a",3123123);

const manager = new ProductManager("./database.json");

(async () => {
    // await manager.getProducts();
    await manager.addProduct("Camiseta de algodón", "Camiseta cómoda y transpirable", 19.99, "camiseta.jpg", "SKU123",50);
//    await manager.getProducts();
    await manager.addProduct("Zapatillas deportivas", "Zapatillas ideales para hacer ejercicio", 29.99, "zapatillas.jpg", "SKU456",30);
//    await manager.getProducts();
    await manager.addProduct("Bolso de cuero", "Bolso elegante de cuero genuino", 39.99, "bolso.jpg", "SKU789", 20);
//    await manager.getProducts();
    await manager.addProduct("Tablet Android", "Tablet con sistema operativo Android", 199.99, "tablet.jpg", "SKU012", 10);
//    await manager.getProducts();
    await manager.addProduct("Cámara digital", "Cámara de alta resolución para fotografía", 299.99, "camara.jpg", "SKU345", 5);
//    await manager.getProducts();
    // await manager.getProductById(3);
    // await manager.updateProduct(3, "title", "150 pokemon");
    // await manager.getProductById(3);
    await manager.addProduct("a", "a", 0.99, "a", "a", 5);
//    await manager.getProducts();
})();
