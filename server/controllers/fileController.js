const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

exports.uploadFile = async (req, res) => {
    const { base64String, extension } = req.body.variables.file;
    if (!base64String || !extension) {
        return {
            status: 'fail',
            message: 'Both base64String and extension are required.',
            statusCode: 400,
        };
    }
    const buffer = Buffer.from(base64String, 'base64');
    const filename = `file_${Date.now()}.${extension}`;
    const filePath = path.join(__dirname, '../', 'temp', filename);
    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            return {
                status: 'fail',
                message: 'Error in saving',
                statusCode: 400,
            };
        }
    });

    let data = await addDoc(filePath);
    data = {
        extension,
        ...data,
    };

    if (!data) {
        return {
            status: 'fail',
            message: 'Error in IPFS',
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

    //TODO: data sent to hyperledger using fabric SDK

    return {
        status: 'success',
        data: {
            message: 'Document added successfully',
        },
        statusCode: 201,
    };
};

exports.retrieveFile = async (req, res) => {
    const { CID, extension } = req.body.variables.file;
    let data = await getDoc(CID);
    const base64String = data.toString('base64');

    let fileData = {
        base64String,
        extension,
    };

    return {
        status: 'success',
        data: {
            ...fileData,
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
        const res = await axios.post(
            'http://127.0.0.1:5001/api/v0/add/',
            formData,
            {
                headers: formData.getHeaders(),
            }
        );
        data = res.data;
    } catch (err) {
        console.log(err);
        return false;
    }
    return data;
};

const getDoc = async (CID) => {
    try {
        const res = await axios.get(
            `http://127.0.0.1:5001/api/v0/cat?arg=${CID}`,
            {
                responseType: 'arraybuffer',
            }
        );
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

