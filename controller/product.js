const _ = require('lodash');
const formidable = require("formidable");
const fs = require("fs");
const Product = require("../models/product");

exports.productId = (req,res,next,id)=>{
    Product.findById(id)
        .exec((err,product)=>{
            if(err||!product){
                return res.status(401).json({
                    message:"Product does not exist"
                });
            }
            req.product = product;
            next();
        });
};

exports.create = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:"Error:Something went wrong uploading the image."
            });
        }
        const {name, description, size, price, quantity} = fields;
        if(!name || !description || !size || !price || !quantity){
            return res.status(400).json({
                error:"All fields are required"
            });
        }

        let product = new Product(fields);

        if(files.photo){
            if(files.photo.size>1000000){
                return res.status(400).json({
                    error:"Error:Image is more than 1mb"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }
        product.save((err,result)=>{
            if(err){
                return res.status(400).json({
                    error:"Product was not save correclty"
                });
            }
            res.json(result);
        });
    });
};

exports.read = (req,res)=>{
    return res.json(req.product);
};

exports.update = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Error: Something went wrong uploading the image.'
            });
        }

        let product = req.product;
        product = _.extend(product, fields);

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error:"Error:Image is more than 1mb"
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error:"Product was not save correclty"
                });
            }
            res.json(result);
        });
    });
};

exports.remove = (req,res)=>{
    let product = req.product;
    product.remove((err,deletedProduct)=>{
        if(err){
            return res.status(400).json({
                err:"Error: Product not deleted successfully."
            });
        }
        res.json({msg:"Product Deleted."});
    });
};

exports.list = (req,res)=>{
    console.log('inside list');
    Product.find()
        .select('-photo')
        .exec((err,products)=>{
            if(err){
                return res.status(400).json({
                    error:"Error: Something went wrong in displaying the products."
                });
            }
            res.json(products);
        });
};

exports.image = (req,res,next)=>{
    console.log('image');
    console.log(req.product);
    if(req.product.photo.data){
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};
