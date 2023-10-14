import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

app.get("/", (req, res) => res.json("OK!"));
app.get("/products", async(req, res) => {

    const productManager = new ProductManager("./database");

    const productos = await productManager.getProducts();
    
    res.json( { productos } )
})

app.listen(8080)
