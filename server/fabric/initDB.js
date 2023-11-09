const Org = require('../models/Organization.js');
const orgs = require('./orgs.json');

const initDB = async () => {
    orgs.forEach(async (org) => {
        let newOrg = await Org.findOne({ msp: org.msp });

        if (newOrg) return;

        newOrg = await Org.create({
            msp: org.msp,
            orgUrl: org.orgUrl,
            orgName: org.orgName,
            category: org.category,
        });

        org.sub.forEach(async (sub) => {
            let newSub = await Org.findOne({ msp: sub.msp });

            if (newSub) return;

            newSub = await Org.create({
                msp: sub.msp,
                orgUrl: sub.orgUrl,
                orgName: sub.orgName,
                category: org.category,
                parent: newOrg._id,
                channelName: sub.orgUrl.split('.')[0],
            });
        });
    });
};

initDB();

module.exports = initDB;

