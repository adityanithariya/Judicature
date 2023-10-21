const authController = require('../controllers/authController');
const { GraphQLError } = require('graphql');
const codeMap = require('./statusCodes');
const fileController = require('../controllers/fileController');

exports.Query = {
    users: async (parent, args, context) => {
        const response = await authController.protect(context.req, context.res);
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
        return 'Hello protect is working';
    },

    retrieveFile: async (parent, args, context) => {
        const response = await fileController.retrieveFile(
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
