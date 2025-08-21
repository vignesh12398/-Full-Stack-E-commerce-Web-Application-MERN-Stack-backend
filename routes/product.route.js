import express from 'express';
import Product from '../models/product.model.js';

const router=express.Router();
router.get("/",async(req,res)=>{
  try{
    const products=await Product.find({});
    res.status(200).json({success:true,data: products})
  }catch(error){
      console.error("server error in fetching product:",error.message);
  return res.status(500).json({success:false,message:"Server Error"})
  }
})

router.post("/", async(req, res) => {
  const product =req.body;
  if(!product.name|| !product.image||!product.price){
    return res.status(400).json({success:false,message:"please peovide all feilds"})
  }
  const newProduct=new Product(product)
  try{
    await newProduct.save();
    return res.status(201).json({success:true,data:newProduct})
  }
  catch(error){

  console.error("Error in create product:",error.message);
  return res.status(500).json({success:false,message:"Server Error"})
  }
});
import mongoose from "mongoose"; // make sure mongoose is imported

router.put ("/:id",async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
});
console.log("MONGO_URI:", process.env.MONGO_URI);


router.delete("/:id",async(req,res)=>{
  const {id} =req.params
  console.log("id:",id);
  try{
    await Product.findByIdAndDelete(id);
    return res.status(200).json({success:true,message:"Poduct delete"})
  }catch(error){
    console.error("Error in create product:",error.message);
  return res.status(500).json({success:false,message:"Server Error"})
  }
})
 export default  router;
