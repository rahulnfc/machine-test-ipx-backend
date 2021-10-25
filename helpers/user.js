const { User } = require('../models');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    getUser: async (userId) => {
        try {
            const user = await User.findById(userId);
            return user;
        } catch (err) {
            throw err;
        }
    },
    addToCart: async (CartData) => {
        const { userId, productId } = CartData;
        try {
            //Get user by Id
            const user = await User.findOne({ _id: userId });
            // check productId is exist in cart of User with userId
            const cart = await User.find({ _id: userId, cart: { $elemMatch: { productId } } });
            if (cart.length > 0) {
                // update quantity
                const updateCart = await User.updateOne({
                    _id: userId,
                    cart: { $elemMatch: { productId } }
                }, { $inc: { 'cart.$.quantity': 1 } });
                return { cartCount: user.cart.length, updateCart };
            } else {
                // add product to cart
                const updateCart = await User.updateOne({
                    _id: userId
                }, { $push: { cart: { productId, quantity: 1 } } });
                return { cartCount: user.cart.length, updateCart };
            }
        } catch (err) {
            throw err;
        }
    },
    cartCount: async (userId) => {
        try {
            //Get user by Id
            const user = await User.findOne({ _id: userId });
            const cartCount = user.cart.length;
            return cartCount;
        } catch (err) {
            throw err;
        }
    },
    cartProducts: async (userId) => {
        try {
            // get the cart details and products details by userId
            const cartProducts = await User.aggregate([
                { $match: { _id: ObjectId(userId) } },
                { $unwind: '$cart' },
                { $project: { _id: 0, productId: '$cart.productId', quantity: '$cart.quantity' } },
                { $lookup: { from: 'products', localField: 'productId', foreignField: '_id', as: 'product' } },
                { $unwind: '$product' },
                {
                    $project: {
                        _id: 0,
                        productId: 1,
                        quantity: 1,
                        product: {
                            title: '$product.title',
                            price: '$product.price',
                            image: '$product.image',
                            category: '$product.category',
                            subtotal: { $multiply: ['$product.price', '$quantity'] },
                        }
                    }
                }
            ]);
            return cartProducts;
        } catch (err) {
            throw err;
        }
    },
    cartdecrement: async (userId, productId) => {
        try {
            //Get user by Id
            const user = await User.findOne({ _id: userId });
            // check productId is exist in cart of User with userId
            const cart = await User.find({ _id: userId, cart: { $elemMatch: { productId } } });

            if (cart.length > 0) {
                // update quantity
                const updateCart = await User.updateOne({
                    _id: userId,
                    cart: { $elemMatch: { productId } }
                }, { $inc: { 'cart.$.quantity': -1 } });
                return { cartCount: user.cart.length, updateCart };
            } else {
                return { cartCount: 0 };
            }
        } catch (err) {
            throw err;
        }
    },
    deleteCart: async (userId, productId) => {
        try {
            // Get cart Item by userId and productId and delete it
            const deleteCart = await User.updateOne({ _id: userId }, { $pull: { cart: { productId } } });
            return deleteCart;
        } catch (err) {
            throw err;
        }
    }
};