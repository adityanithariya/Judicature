const authController = require("../controllers/authController");
const fileController = require("../controllers/fileController");
const userController = require("../controllers/userController");
const { GraphQLError } = require("graphql");
const codeMap = require("./statusCodes");

checkProtection = async (req, res) => {
	const response = await authController.protect(req, res);
	if (response.status === "fail") {
		throw new GraphQLError(response.message, {
			extensions: {
				code: codeMap[response.statusCode]
					? codeMap[response.statusCode]
					: "ERROR",
				http: { status: response.statusCode },
			},
		});
	}
	return req.user;
};

exports.Query = {
	retrieveFile: async (parent, args, context) => {
		const user = await checkProtection(context.req, context.res);
		context.req.user = user;
		const response = await fileController.retrieveFile(
			context.req,
			context.res,
		);
		if (response.status === "fail") {
			throw new GraphQLError(response.message, {
				extensions: {
					code: codeMap[response.statusCode]
						? codeMap[response.statusCode]
						: "ERROR",
					http: { status: response.statusCode },
				},
			});
		}
		// console.log(response.data);
		return response.data;
	},
	allStates: async (parent, args, context) => {
		const response = await userController.allStates(context.req, context.res);
		if (response.status === "fail") {
			throw new GraphQLError(response.message, {
				extensions: {
					code: codeMap[response.statusCode]
						? codeMap[response.statusCode]
						: "ERROR",
					http: { status: response.statusCode },
				},
			});
		}
		console.log(response.data);
		return response.data;
	},
};
