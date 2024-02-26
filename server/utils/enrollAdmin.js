const adminUserId = process.env.ADMIN_ID || "admin";
const adminUserPasswd = process.env.ADMIN_PASSWORD || "adminpw";

module.exports = async (caClient, wallet, orgMspId) => {
	try {
		// Check to see if we've already enrolled the admin user.
		const identity = await wallet.get(adminUserId);
		if (identity) {
			console.log("Admin already exists!");
			return;
		}

		// Enroll the admin user, and import the new identity into the wallet.
		const enrollment = await caClient.enroll({
			enrollmentID: adminUserId,
			enrollmentSecret: adminUserPasswd,
		});
		const x509Identity = {
			credentials: {
				certificate: enrollment.certificate,
				privateKey: enrollment.key.toBytes(),
			},
			mspId: `${orgMspId}MSP`,
			type: "X.509",
		};
		await wallet.put(adminUserId, x509Identity);
		console.log(
			"Successfully enrolled admin user and imported it into the wallet",
		);
	} catch (error) {
		console.error(`Failed to enroll admin user : ${error}`);
	}
};
