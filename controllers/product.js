const { ProductHelper } = require('../helpers');

module.exports = {
    getProducts: async (req, res) => {
        const products = await ProductHelper.getProducts();
        res.status(200).json(products);
    }
}