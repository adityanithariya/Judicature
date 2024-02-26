const { Gateway } = require("fabric-network");
const buildCCP = require("../utils/buildCCP");
const buildWallet = require("../utils/buildWallet");
const buildCAClient = require("../utils/buildCAClient");
const enrollAdmin = require("../utils/enrollAdmin");
const path = require("path");
const Org = require("../models/Organization");
const registerAndEnrollUser = require("../utils/registerUser");

const connect = async (org, orgURL) => {
	const ccp = buildCCP(org);
	const caClient = buildCAClient(ccp, `ca.${orgURL}`);
	const walletPath = path.join(__dirname, "..", "wallet", org);
	const wallet = await buildWallet(walletPath);

	await enrollAdmin(caClient, wallet, org);
};

const getFabric = async (org, orgURL, username, channel, chaincode) => {
	const ccp = buildCCP(org);
	const caClient = buildCAClient(ccp, `ca.${orgURL}`);
	const walletPath = path.join(__dirname, "..", "wallet", org);
	const wallet = await buildWallet(walletPath);

	const userIdentity = await wallet.get(username);
	if (!userIdentity) {
		console.log(`user ${username} does not exist in wallet`);
		return { wallet, caClient, contract: null, gateway: null };
	}

	const gateway = new Gateway();
	try {
		await gateway.connect(ccp, {
			wallet,
			identity: username,
			discovery: { enabled: true, asLocalhost: true },
		});
		const network = await gateway.getNetwork(channel);
		const contract = network.getContract(chaincode);
		return { wallet, caClient, contract, gateway };
	} catch (error) {
		console.error(`Error processing transaction. ${error}`);
		console.log(error.stack);
	}
	// NOTE: Do this on every function cleanup
	//  finally {
	//     gateway.disconnect();
	// }
};

const connectFabric = async () => {
	const orgs = await Org.find({});
	for (const org of orgs) {
		await connect(org.msp, org.orgUrl);
	}
};

// const executeTransaction = async () => {
//     const { wallet, caClient } = await getFabric(
//         'RajGovt',
//         'raj.gov.in',
//         'abcd',
//         'raj'
//     );
//     await registerAndEnrollUser(caClient, wallet, 'RajGovtMSP', 'abcd', 'user');
//     const { contract, gateway } = await getFabric(
//         'RajGovt',
//         'raj.gov.in',
//         'abcd',
//         'raj',
//         'evaultcontract'
//     );
//     console.log("Executing transaction 'InitLedger'...");
//     console.log((await contract.evaluateTransaction('InitLedger')).toString());
//     await gateway.disconnect();
// };

module.exports = {
	connectFabric,
	getFabric,
};
