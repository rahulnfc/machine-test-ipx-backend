const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = {
    register: async (userData) => {
        const { username, email, phone, password } = userData;
        // Check email exist
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return { emailExists: true };
        } else {
            // Check phone exist
            const phoneExists = await User.findOne({ phone });
            if (phoneExists) {
                return { phoneExists: true };
            } else {
                // Hash password
                const hashedPassword = await bcrypt.hash(password, 10);
                // Create user
                const user = new User({ username, email, phone, password: hashedPassword });
                await user.save();
                return { user };
            }
        }
    },
    login: async (userData) => {
        const { email, password } = userData;
        // Check email exist
        const user = await User.findOne({ email });
        if (user) {
            // Check password
            const validPassword = await bcrypt.compare(password, user.password);
            if (validPassword) {
                return { user };
            } else {
                return { invalidPassword: true };
            }
        } else {
            return { invalidEmail: true };
        }
    }
};