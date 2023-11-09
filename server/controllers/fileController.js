const fs = require('fs');
const path = require('path');
const axios = require('axios');
const User = require('../models/User.js');
const Org = require('../models/Organization.js');
const FormData = require('form-data');
const { getFabric } = require('../fabric/index.js');
const registerAndEnrollUser = require('../utils/registerUser');

exports.uploadFile = async (req, res) => {
    const {
        base64String,
        extension,
        fileName: orgFileName,
    } = req.body.variables.file;
    const buffer = Buffer.from(base64String, 'base64');
    const fileName = `${orgFileName}_${Date.now()}.${extension}`;
    const folderName = path.join(__dirname, '../', 'temp');
    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName);
    }
    const filePath = path.join(__dirname, '../', 'temp', fileName);
    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            return {
                status: 'fail',
                message: 'Error in saving',
                statusCode: 400,
            };
        }
    });

    const { Hash: CID } = await addDoc(filePath);

    const data = {
        extension,
        fileName,
        CID,
    };
    if (!data) {
        return {
            status: 'fail',
            message: 'Error in uploading file to IPFS',
            statusCode: 400,
        };
    }
    fs.stat(filePath, function (err, stats) {
        if (err) {
            return console.error(err);
        }
        fs.unlink(filePath, function (err) {
            if (err) return console.log(err);
        });
    });

    const key = `${CID}_${process.env.JWT_SECRET}`;

    console.log('CID', CID);
    console.log('key', key);

    let user = await User.findOne({ _id: req.user.id });
    const org = await Org.findOne({ orgName: state });

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
    console.log(key, CID, user.username, fileName, extension);
    const response = await contract.submitTransaction(
        'CreateDoc',
        key,
        CID,
        user.username,
        fileName,
        extension
    );
    console.log(response.toString());

    return {
        status: 'success',
        data: key,
        statusCode: 201,
    };
};

exports.retrieveFile = async (req, res) => {
    let user = await User.findOne({ _id: req.user.id });
    const org = await Org.findOne({ orgName: state });
    let { contract } = await getFabric(
        org.msp,
        org.orgUrl,
        user.username,
        org.channelName,
        user.role
    );
    if (!contract) {
        console.log('User is not enrolled');
    }
    const response = await contract.evaluateTransaction(
        'GetDoc',
        req.body.variables.key
    );
    const responseData = JSON.parse(response);

    const data = await getDoc(responseData.cid);
    if (!data) {
        return {
            status: 'fail',
            message: 'Error in retrieving file from IPFS',
            statusCode: 400,
        };
    }

    return {
        status: 'success',
        data: {
            base64String: data.toString('base64'),
            extension: responseData.extention,
            fileName: responseData.fileName,
        },
        statusCode: 201,
    };
};

const addDoc = async (file) => {
    const formData = new FormData();
    const fileStream = fs.createReadStream(file);
    formData.append('file', fileStream);

    let data;
    try {
        const res = await axios.post(process.env.IPFS_ADD_DOC_API, formData, {
            headers: formData.getHeaders(),
        });
        data = res.data;
    } catch (err) {
        console.log(err);
        return false;
    }
    return data;
};

const getDoc = async (CID) => {
    try {
        const res = await axios.get(`${process.env.IPFS_GET_DOC_API}${CID}`, {
            responseType: 'arraybuffer',
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
