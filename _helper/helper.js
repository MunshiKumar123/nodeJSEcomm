const validateForm = (data) => {
    const errors = {};

    for (const field in data) {
        const value = data[field];
        if (!value || value.trim() === '') {
            errors[field] = `${field} is required and must not be empty`;
        }
    }
    return errors;
};

// Reusable function for handling GET requests
const handleGetRequest = async (req, resp, schema) => {
    try {

        const userId = req.user?._id;
        const isAdmin = req.user?.role === 'admin';

        let data;
        if (isAdmin) {
            data = await schema.find();
        } else {
            data = await schema.find({ userId });
        }

        if (data?.length > 0) {
            resp.status(200).json({ products: data });
        } else {
            resp.status(404).json({ result: "No products found" });
        }
    } catch (error) {
        console.error("Error fetching products:", error);
        resp.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    validateForm,
    handleGetRequest
};
