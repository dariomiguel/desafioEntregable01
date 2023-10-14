import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

app.get("/", (req, res) => res.json("OK!"));
app.get("/api/products", async(req, res) => {

    const productManager = new ProductManager("./database");

    const data = await productManager.getProducts();
    
    res.json( { data } )
})

app.listen(8080)
