const { validateForm, handleGetRequest } = require("../_helper/helper");
const product = require("../_schema/Product");


const addProduct = async (req, resp) => {
    try {
        const userData = req.user;

        const { name, price, category, company } = req.body;

        const validationErrors = validateForm({ name, price, category, company });

        if (Object.keys(validationErrors).length === 0) {
            const data = {
                name,
                price,
                category,
                company,
                userId: userData?._id
            };
            const newProduct = new product(data);
            const result = await newProduct.save();
            resp.status(201).json({ message: "Product added successfully", product: result });
        } else {
            resp.status(400).json({ errors: validationErrors });
        }
    } catch (error) {
        console.error("Error adding product:", error);
        resp.status(500).json({ error: "Product add failed" });
    }
};

const getProduct = async (req, resp) => {
    await handleGetRequest(req, resp, product)
};

const deleteProduct = async (req, resp) => {
    try {
        let result = await product.deleteOne({ _id: req?.params?.id })
        resp.send({ result, message: "Product delete successful" })
    } catch (error) {
        resp.status(500).send({ error: "Internal server error" });
    }
}

const getSingalProduct = async (req, resp) => {
    try {
        let result = await product.findOne({ _id: req?.params?.id })
        if (result) {
            resp.send(result)
        } else {
            resp.send({ result: "No Record Found." })
        }
    } catch (error) {
        resp.status(500).send({ error: "Internal server error" });
    }
}

const updateProduct = async (req, resp) => {
    try {
        let result = await product.updateOne(
            { _id: req?.params?.id },
            {
                $set: req?.body
            }
        )
        if (!result) {
            return resp.status(404).send({ error: "Product not found" });
        }
        resp.send({ message: "Product update successful", result })
    } catch (error) {
        resp.status(500).send({ error: "Internal server error" });
    }
}

const searchProduct = async (req, resp) => {
    try {
        let result = await product.find(
            {
                "$or": [
                    { name: { $regex: new RegExp(req?.params?.key, 'i') } },
                    { price: { $regex: new RegExp(req?.params?.key, 'i') } },
                ]
            }
        )
        if (!result || result.length === 0) {
            return resp.status(404).send({ error: "Product not found" });
        }
        resp.send(result)
    } catch (error) {
        resp.status(500).send({ error: "Internal server error" });
    }
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct,
    getSingalProduct,
    updateProduct,
    searchProduct
};
