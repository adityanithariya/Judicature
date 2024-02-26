const fs = require("fs");
const path = require("path");

module.exports = (org) => {
	const ccpPath = path.resolve(
		__dirname,
		"..",
		"connection-profile",
		`connection-${org}.json`,
	);
	const fileExists = fs.existsSync(ccpPath);
	if (!fileExists) {
		throw new Error(`no such file or directory: ${ccpPath}`);
	}
	const contents = fs.readFileSync(ccpPath, "utf8");

	// build a JSON object from the file contents
	const ccp = JSON.parse(contents);

	// console.log(`Loaded the network configuration located at ${ccpPath}`);
	return ccp;
};
