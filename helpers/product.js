const { Product } = require('../models');

module.exports = {
    getProducts: async () => {
        try {
            // get all products
            const products = await Product.find()
            return products;
        } catch (err) {
            throw err;
        }
    },
};