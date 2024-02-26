const { Wallets } = require("fabric-network");

module.exports = async (walletPath) => {
	// Create a new wallet: Note that wallet is for managing identities.
	let wallet;
	if (walletPath) {
		wallet = await Wallets.newFileSystemWallet(walletPath);
		console.log("Using file system wallet...");
	} else {
		wallet = await Wallets.newInMemoryWallet();
		console.log("Using an in memory wallet...");
	}

	return wallet;
};
