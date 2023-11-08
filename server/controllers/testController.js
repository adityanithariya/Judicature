const User = require('../models/User.js');
const Org = require('../models/Organization.js');
const { getFabric } = require('../fabric/index.js');
const registerAndEnrollUser = require('../utils/registerUser');

const userId = '653a9e3d1589d80115800c3e';

exports.test = async (req, res) => {
    const { isEvaluate, functionName, arr } = req.body.variables.var;
    if (!userId) {
        return {
            status: 'fail',
            message:
                'User doesnt exists please change userId in test controller',
            statusCode: 400,
        };
    }
    let user = await User.findOne({ _id: userId });
    let org = await Org.findOne({ _id: user.org });

    let { wallet, caClient, contract, gateway } = await getFabric(
        org.msp,
        org.orgUrl,
        user.username,
        org.channelName,
        user.role
    );
    if (!contract) {
        await registerAndEnrollUser(
            caClient,
            wallet,
            `${org.msp}MSP`,
            user.username
        );
        let {} = ({ contract, gateway } = await getFabric(
            org.msp,
            org.orgUrl,
            user.username,
            org.channelName,
            user.role
        ));
    }
    if (isEvaluate) {
        const response = (
            arr
                ? await contract.evaluateTransaction(functionName, ...arr)
                : await contract.evaluateTransaction(functionName)
        ).toString();
        console.log(response);
        await gateway.disconnect();
    } else {
        const response = (
            arr
                ? await contract.evaluateTransaction(functionName, ...arr)
                : await contract.evaluateTransaction(functionName)
        ).toString();
        console.log(response);
        await gateway.disconnect();
    }

    return {
        status: 'success',
        message: 'Successful',
        statusCode: 200,
    };
};

