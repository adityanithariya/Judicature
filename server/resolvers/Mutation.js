const authController = require('../controllers/authController');
const fileController = require('../controllers/fileController');
const { GraphQLError } = require('graphql');
const codeMap = require('./statusCodes');

checkProtection = async (req, res) => {
    const response = await authController.protect(req, res);
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
    return req.user;
};

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
        console.log(response);
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

    forgotPassword: async (parent, args, context) => {
        const response = await authController.forgotPassword(
            context.req,
            context.res
        );
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
        return response.message;
    },

    resetPassword: async (parent, args, context) => {
        const response = await authController.resetPassword(
            context.req,
            context.res
        );
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
        return response.message;
    },

    updatePassword: async (parent, args, context) => {
        const user = await checkProtection(context.req, context.res);
        context.req.user = user;
        const response = await authController.updatePassword(
            context.req,
            context.res
        );
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
        return response.message;
    },

    uploadFile: async (parent, args, context) => {
        const user = await checkProtection(context.req, context.res);
        context.req.user = user;
        const response = await fileController.uploadFile(
            context.req,
            context.res
        );
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
