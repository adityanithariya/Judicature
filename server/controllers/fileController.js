const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');

exports.uploadFile = async (req, res) => {
    const { base64String, extension, fileName: orgFileName } = req.body.variables.file;
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

    // TODO: Save extension & fileName to hyperledger
    const data = {
        extension,
        fileName,
        CID,
    };
    console.log(data);
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

    //TODO: data sent to hyperledger using fabric SDK

    return {
        status: 'success',
        data: data,
        statusCode: 201,
    };
};

exports.retrieveFile = async (req, res) => {
    const data = await getDoc(req.body.variables.cid);
    const base64String = data.toString('base64');

    if (!data) {
        return {
            status: 'fail',
            message: 'Error in retrieving file from IPFS',
            statusCode: 400,
        };
    }

    return {
        status: 'success',
        // TODO: Fetch extension & fileName from hyperledger
        data: {
            CID: req.body.variables.cid,
            base64String,
            extension: "txt",
            fileName: "fileName",    
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
