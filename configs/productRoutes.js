const { productModel } = require("../models/product.model")

const productRoutes = {
    get: async (req, res) => {
        //    const {search}=req.query;
        //    console.log("body:",req.query)
        //    try {
        //     if(search){
        //         const products=await productModel.find({
        //             $or: [
        //                 { name: { $regex: new RegExp(search, 'i') } },
        //                 { description: { $regex: new RegExp(search, 'i') } }
        //               ]
        //         })
        //         return res.status(200).json({products:products})
        //     }else{
        //         const products=await productModel.find()
        //         return res.status(200).json({products:products})
        //     }
        //    } catch (error) {
        //     res.status(400).json({error:error})
        //    }
        const { search, _sort, _order, category, gender, fabric, page = 1, perPage = 30 } = req.query;

        try {
            let query = {};

            // Apply search filter
            if (search) {
                query.$or = [
                    { name: { $regex: new RegExp(search, 'i') } },
                    { description: { $regex: new RegExp(search, 'i') } }
                ];
            }

            // Apply category filter
            if (category && category.length > 0) {
                query.category = { $in: category };
            }

            // Apply gender filter
            if (gender && gender.length > 0) {
                query.gender = { $in: gender };
            }

            // Apply fabric filter
            if (fabric && fabric.length > 0) {
                query.fabric = { $in: fabric };
            }

            // Apply sorting
            const sortOptions = {};
            if (_sort) {
                sortOptions[_sort] = _order === 'desc' ? -1 : 1;
            }

            // Calculate skip value for pagination
            const skip = (page - 1) * perPage;

            // Fetch products based on filters, sorting, and pagination
            const products = await productModel.find(query)
                .sort(sortOptions)
                .skip(skip)
                .limit(perPage);
            return res.status(200).json({ products });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    post: async (req, res) => {
        try {
            const product = new productModel(req.body)
            await product.save()
            res.status(200).json({ message: "Product added successfully!" })
        } catch (error) {
            res.status(400).json({ error: error, message: 'Something went wrong' })
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const product = await productModel.find({ _id: id })
            if (product.length > 0) {
                await productModel.findByIdAndUpdate({ _id: id }, req.body)
                res.status(200).json({ message: `Product updated successfully!` })
            } else {
                res.status(400).json({ message: `Product with id:${id} not found!` })
            }
        } catch (error) {
            res.status(400).json({ message: `something went wrong!`, error: error })
        }
    },

    delete: async (req, res) => {
        try {
            const id = req.params.id
            const product = await productModel.find({ _id: id })
            if (product.length > 0) {
                await productModel.findByIdAndDelete({ _id: id })
                res.status(200).json({ message: 'Product Deleted successfully!' })
            } else {
                res.status(400).json({ message: `Product with id:${id} not found!` })
            }
        } catch (error) {
            res.status(400).json({ message: "something went wrong!", error: error })
        }
    },
    getSingleProduct:async (req,res)=>{
        try {
            const id = req.params.id
            if(id){
                const product= await productModel.find({_id:id})
                if(product.length>0){
                   return res.status(200).json(product[0])
                }else{
                   return res.status(400).json({message:'Product not found!'})
                }
            }else{
              return res.status(400).json({message:'Please provide ID of product'})
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

}

module.exports = {
    productRoutes
}