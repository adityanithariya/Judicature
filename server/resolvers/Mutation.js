const User = require('../models/User.js');
const authController = require('../controllers/authController');
const { GraphQLError } = require('graphql');
const codeMap = require('./statusCodes');

exports.Mutation = {
    signUp: async (parent, args, context) => {
        const response = await authController.signUp(context.req, context.res);
        if (response.status == 'fail') {
            throw new GraphQLError(response.message, {
                extensions: {
                    code: codeMap[response.statusCode]
                        ? codeMap[response.statusCode]
                        : 'ERROR',
                    http: { status: response.statusCode },
                },
            });
        }
        return response.data;
    },

    logIn: async (parent, args, context) => {
        const response = await authController.logIn(context.req, context.res);
        if (response.status == 'fail') {
            throw new GraphQLError(response.message, {
                extensions: {
                    code: codeMap[response.statusCode]
                        ? codeMap[response.statusCode]
                        : 'ERROR',
                    http: { status: response.statusCode },
                },
            });
        }
        return response.data;
    },
};
