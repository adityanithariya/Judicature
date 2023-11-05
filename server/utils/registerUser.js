const adminUserId = process.env.ADMIN_ID || 'admin';

const registerAndEnrollUser = async (
    caClient,
    wallet,
    orgMspId,
    userId
) => {
    try {
        // Check to see if we've already enrolled the user
        const userIdentity = await wallet.get(userId);
        if (userIdentity) {
            console.log(`user ${userId} already exists`);
            return userIdentity;
        }

        // Must use an admin to register a new user
        const adminIdentity = await wallet.get(adminUserId);
        if (!adminIdentity) {
            console.log('Admin not found!');
            console.log('Enroll the admin user before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet
            .getProviderRegistry()
            .getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(
            adminIdentity,
            adminUserId
        );

        // Register the user, enroll the user, and import the new identity into the wallet.
        // if affiliation is specified by client, the affiliation value must be configured in CA
        const secret = await caClient.register(
            {
                enrollmentID: userId,
                role: 'client',
            },
            adminUser
        );
        const enrollment = await caClient.enroll({
            enrollmentID: userId,
            enrollmentSecret: secret,
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: orgMspId,
            type: 'X.509',
        };
        await wallet.put(userId, x509Identity);
        console.log(
            `Successfully registered and enrolled user ${userId} and imported it into the wallet`
        );
    } catch (error) {
        console.error(`Failed to register user: ${error}`);
    }
};

module.exports = registerAndEnrollUser;
