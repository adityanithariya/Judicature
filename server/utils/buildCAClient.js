const FabricCAServices = require("fabric-ca-client");

module.exports = (ccp, caHostName) => {
	// Create a new CA client for interacting with the CA.
	const caInfo = ccp.certificateAuthorities[caHostName]; //lookup CA details from config
	const caTLSCACerts = caInfo.tlsCACerts.pem;
	const caClient = new FabricCAServices(
		caInfo.url,
		{ trustedRoots: caTLSCACerts, verify: false },
		caInfo.caName,
	);

	// console.log(`Built a CA Client named ${caInfo.caName}`);
	return caClient;
};
