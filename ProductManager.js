//Importamos el módulo para interactuar con archivos
const fs = require('fs')

//Creamos la clase ProductManager que contendra los productos y metodos que necesitemos para la actividad.
class ProductManager {

    //Se construye el elemento inicial (un array vacío).
    constructor(path) {
        this.products = [];
        this.path = path;
    }

    //Se crea el retorno para ver los productos ingresados.
    getProducts = async () => {
        //Verificamos que exista el archivo antes de leerlo
        try {
            if (!fs.existsSync(this.path)) {
                console.log(this.products);
                return this.products;
            }
            const lectura = await fs.promises.readFile(this.path, "utf-8");
            this.products = JSON.parse(lectura);
            console.log("Se ejecuta el READ");
            console.log(this.products);
            return this.products;
        } catch (error) {
            console.log("Hubo un error en el READ", error);
            throw error;
        }
    }

    //Se crea el método para agregar productos validando previamente.
    addProduct = async (title, description, price, thumbnail, code, stock) =>  {

        //Antes de agregar verifica si es válido o no
        try{
            if (this.isNotValidCode(title, description, price, thumbnail, code, stock)) {
                console.error("Atención: Verifique que todos los datos se hayan cargado correctamente o que el código de producto no se repita!");
                return
            } else if (!fs.existsSync(this.path)) {
                fs.writeFileSync(this.path, JSON.stringify(this.products));
            }

            //Si es válido la agrega al array de lista de productos.
            // this.add(title, description, price, thumbnail, code, stock);
            // this.addAsync(this.products, undefined, "\t");
            const lectura = await fs.promises.readFile(this.path, "utf-8");
            this.products = JSON.parse(lectura);
            this.add(title, description, price, thumbnail, code, stock);
            const data = JSON.stringify(this.products);
            console.log("Se ejecuta el WRITE");
            await fs.promises.writeFile(this.path, data, "utf-8");
        }
        catch (error) {
            console.log("Hubo un error en el proceso", error);
            throw error;
        }
    }
    
    //Se crea un método para agregar un nuevo producto a la lista de productos.
    add(title, description, price, thumbnail, code, stock) {
        const product = {
            id: this.products.length,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };
        this.products.push(product);
    }

    //Método asincronico para agregar los objetos.
    addAsync = async (data) => {
        data = JSON.stringify(data);
        fs.promises.writeFile(this.path, data)
            .then(() => {
                console.log("Se ejecutó exitosamente la escritura del archivo")
            })
            .catch((error) => {
                console.log("Hubo un error en la escritura del archivo ", error);
            })
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
            console.log(product) :
            console.log(`No hay un producto con el número de ID ${id}.`)
    }

    //Cambiar uno de los campos
    updateProduct = (opcion) => {
        console.log("Seleccione el id del producto");

        this.getProductById();

        console.log(`Seleccione la opción que desea modificar:
        1_Nombre de producto 
        2_Descripción del producto
        3_Precio
        4_Ruta de imagen
        5_Código identificador
        6_Stock`)
    }

    //
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
    await manager.getProducts();
    await manager.addProduct("178", "Aasd", "1231A", "asdfasdfA", "dario", 479);
    await manager.getProducts();
    await manager.addProduct("Que ", "perdida", "de", "tiempo", "h", 479);
    await manager.getProducts();
    await manager.addProduct("555", "5", "55", "55", "5", 4795);
    await manager.getProducts();
})();
