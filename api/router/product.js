const express = require('express');
const router = express.Router();
const Product = require('./model/product');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/chak-auth') 
const cloudinary = require('cloudinary').v2 ; 

cloudinary.config({ 
    cloud_name: 'dn5tifsdx', 
    api_key: '824912677482544', 
    api_secret: 'Awi3cQt1J9lbTGvrzzi9glQgsYs',
    secure:true
  });


router.get('/',checkAuth, (req, res, next) => {
    Product.find()
        .then(result => {
            res.status(200).json({
                productdata: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
            
        })
})

router.post('/', (req, res, next) => {
    console.log(req.body)
    const file = req.files.photo
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        console.log(result)
        const product = new Product({
        _id: new mongoose.Types.ObjectId,
        code:req.body.code,
        title:req.body.title,
        description:req.body.description,
        mrp:req.body.mrp,
        sp:req.body.sp,
        discountpercent:req.body.discountpercent,
        imagepath:result.url,
    })

    product.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                newproduct: result
            })
        })

        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})
    })
router.get('/:_id', (req, res, next) => {
    console.log(req.params._id)
    Product.findById(req.params._id)
        .then(result => {
            console.log(result);
            res.status(200).json({
                newproduct: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

})

// delete request
router.delete('/:_id',(req,res,next)=>{
    
    Product.deleteOne({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'product deleted',
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})
// put requst
router.put('/:id',(req,res,next)=>{
    console.log(req.param.id);
    Product.findByIdAndUpdate({_id:req.params.id},
      {  $set:{
            code:req.body.code,
            title:req.body.title,
            description:req.body.description,
            mrp:req.body.mrp,
            sp:req.body.sp,
            discountpercent:req.body.discountpercent,
            imagepath:req.body.imagepath,
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_product:result
        })
    })
    .catch(err=>{
        res.status(500).json({                                                                  
            error:err
        })
    })
})



module.exports = router;