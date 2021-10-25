const { UserHelper } = require('../helpers');

module.exports = {
    getUser: async (req, res) => {
        // split userId from headers authorization
        const userId = req.headers.authorization.split(' ')[2];
        const user = await UserHelper.getUser(userId);
        res.status(200).json({ user });
    },
    addToCart: async (req, res) => {
        try {
            const addCart = await UserHelper.addToCart(req.body);
            res.status(200).json(addCart);
        } catch (error) {
            console.log(error);
        }
    },
    removeFromCart: async (req, res) => {
        try {
            const removeCart = await UserHelper.removeFromCart(req.body);
            res.status(200).json(removeCart);
        } catch (error) {
            console.log(error);
        }
    },
    cartCount: async (req, res) => {
        const userId = req.params.id
        try {
            const count = await UserHelper.cartCount(userId);
            res.status(200).json(count);
        } catch (error) {
            console.log(error);
        }
    },
    cartProducts: async (req, res) => {
        const userId = req.params.id
        try {
            const cart = await UserHelper.cartProducts(userId);
            res.status(200).json(cart);
        } catch (error) {
            console.log(error);
        }
    },
    cartincrement: async (req, res) => {
        try {
            const increment = await UserHelper.addToCart(req.body);
            const cart = await UserHelper.cartProducts(req.body.userId);
            console.log(cart, 'cart')
            console.log(increment, 'addCart')
            res.status(200).json({cart, increment});
        } catch (error) {
            console.log(error);
        }
    },
    cartdecrement: async (req, res) => {
        const{ userId, productId } = req.body;
        try {
            const decrement = await UserHelper.cartdecrement(userId, productId);
            const cart = await UserHelper.cartProducts(req.body.userId);
            console.log(cart);
            res.status(200).json({cart, decrement});
        } catch (error) {
            console.log(error);
        }
    },
    cartdelete: async (req, res) => {
        const{ userId, productId } = req.body;
        try {
            const deleteCart = await UserHelper.deleteCart(userId, productId);
            const cart = await UserHelper.cartProducts(req.body.userId);
            const count = await UserHelper.cartCount(userId);
            res.status(200).json({cart, deleteCart, count});
        } catch (error) {
            console.log(error);
        }
    }
}