import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

app.use(express.urlencoded({extended:true}));

app.get("/", async(req, res) => res.json("OK!"));
app.get("/products", async(req, res) => {
    const limit = req.query.limit;

    const manager = new ProductManager("./database");
    let productos = await manager.getProducts();

    if (limit) {
        const limitNumber = parseInt(limit, 10);
        if (!isNaN(limitNumber) && limitNumber >= 0) {
            productos = productos.slice(0, limitNumber);
        }
    }
    
    res.json( { Productos: productos } )
})


app.get("/products/:pid", async(req, res) => {

    const manager = new ProductManager("./database");
    const productPorId = await manager.getProductById(req.params.pid);
    
    if(typeof productPorId === "string") return res.json( { Error: productPorId } );

    res.json( { productPorId } )
} )

app.listen(8080, () => console.log("En línea..."));
