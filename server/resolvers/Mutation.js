const User = require('../models/User.js');
const authController = require('../controllers/authController');
const { GraphQLError } = require('graphql');

exports.Mutation = {
    signUp: async (parent, args, context) => {
        const response = await authController.signUp(context.req, context.res);
        return response.data;
    },

    logIn: async (parent, args, context) => {
        const response = await authController.logIn(context.req, context.res);
        if (response.status == 'fail') {
            throw new GraphQLError(response.message, {
                extensions: {
                    code: 'BAD_USER_INPUT',
                },
            });
        }
        return response.data;
    },
};
