import slugify from 'slugify'
import ProductModel from '../models/product.model.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'


export const createProductController = async (req, res) => {
    try {

        const { name, description, price, category, quantity, rating } = req.body

        if ([name, description, price, category, quantity, rating].some((item) => (item?.trim() == "" ? true : false))) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const ImageLocalPath = req.file?.path
        console.log('ImageLocalPath : ', ImageLocalPath)

        const image = await uploadOnCloudinary(ImageLocalPath)

        const createdProduct = await ProductModel.create({ name, slug: slugify(name), description, price, image: image?.url, category, quantity, rating })

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            createdProduct
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: 'Something went wrong in create Product Controller'
        })
    }
}



export const getAllProductsController = async (req, res) => {
    try {
        const products = await ProductModel.find({})

        return res.status(200).json({
            success: true,
            message: 'All products fetch successfully!',
            products
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'Something went wrong in getAllProducts Controller'
        })
    }
}


export const getCartItems = async(req, res)=>{
    try {
        console.log(req.body)
    } catch (error) {
     console.log(error)
     return res.send(400).send({
        success: false,
        message: 'Something went wrong in getCartItems Controller'
     })   
    }
}