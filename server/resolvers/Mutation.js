const User = require('../models/User.js');

exports.Mutation = {
    addUser: async (parent, args, context) => {
        const user = { name: args.name, email: args.email };
        console.log(user);
        const newUser = await User.create({
            name: user.name,
            email: user.email,
        });
        return user;
    },
};
