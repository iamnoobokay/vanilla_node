const Product = require('../models/productModel');
const { parse } = require('querystring');

module.exports.getProducts = async(req,res) => {
    try{
        const products = await Product.findAll();
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify(products));
    }
    catch(e){
        console.log(e)
    }
}

module.exports.getOneProduct = async(req,res,id) => {
    try{
        const product = await Product.findOne(id);

        if(product){
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify(product));
        }
        else{
            res.writeHead(400,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'Product Not Found'}));
        }   
    }
    catch(e){
        console.log(e);
    }
}

module.exports.insertProduct = async(req,res) => {
    try{
        let data = '';
        req.on('data', (chunk) => {
            data += chunk.toString();
        })
        req.on('end', async() => {
            try{
                data = parse(data);
                if(data.name == "" || data.description == "" || data.price == ""){
                    res.writeHead(400,{'Content-Type':'application/json'});
                    res.end(JSON.stringify({message:'Please Input Valid Data'}));
                }
                else{
                    const product = await Product.insert(data);
                    res.writeHead(201,{'Content-Type':'application/json'});
                    res.end(JSON.stringify(product));
                }
            }catch(e){
                console.log(e);
            }
        });
    }catch(e){
        console.log(e);
    }
}

module.exports.editProduct = async(req,res,id) => {
    let data = '';
    req.on('data',(chunk)=>{
        data += chunk.toString();
    })
    req.on('end',async()=>{
        data=parse(data);
        if(data.name == "" || data.description == "" || data.price == ""){
            res.writeHead(400,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:'Please Input Valid Data'}));
        }
        else{
            const product = await Product.edit(data,id);
            res.writeHead(201,{'Content-Type':'application/json'});
            res.end(JSON.stringify(product));
        }
    })
}

module.exports.deleteProduct = async(req,res,id) => {
    if(id){
        const product = await Product.delete(id);
        res.writeHead(201,{'Content-Type':'application/json'});
        res.end(JSON.stringify({'product':product,message:'Item Deleted Successfully'}));
    }
    else{
        res.writeHead(400,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:'Product Not Found'}));
    }
}