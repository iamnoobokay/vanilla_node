const products = require('../data/products');
const {fileWrite,fileEdit,fileDelete} = require('../fileOperation.js');

module.exports.findAll = async() => {
    return products;
}

module.exports.findOne = async(id) => {
    const product = products.find((p)=> p.id === id);
    return product;
}

module.exports.insert = async(data) => {
    const productList = products;
    const lastProduct = productList.pop();
    const lastId = parseInt(lastProduct.id);
    const newId = lastId + 1;
    const productToInsert = {id:newId.toString(),...data};
    fileWrite('./data/products.json',productToInsert,'utf-8');
    return productToInsert;
}

module.exports.edit = async (data,id) => {
    fileEdit('./data/products.json',data,'utf-8',id);
    let product = products.find((p)=> p.id === id);
    product = {id:id,...data};
    return product;
}

module.exports.delete = async(id) => {
    const product = products.find((p)=> p.id === id);
    if(!product){
        return({'message':'Product Not Found'});
    }else{
        fileDelete('./data/products.json',null,'utf-8',id)
        return product;
    }
}
