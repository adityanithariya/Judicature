/** @type {import('next').NextConfig} */

if (!process.env.GRAPHQL_ENDPOINT) {
	throw new Error("GRAPHQL_ENDPOINT not found");
}

const nextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.(graphql|gql)$/,
			exclude: /node_modules/,
			loader: "graphql-tag/loader",
		});
		return config;
	},
	env: {
		GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
	},
};

module.exports = nextConfig;
