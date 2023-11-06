/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const stringify = require('json-stringify-deterministic');
const sortKeysRecursive = require('sort-keys-recursive');

class eVaultContract extends Contract {
    constructor() {
        super('eVault');
    }

    async InitLedger(ctx) {
        return 'InitLedger Called';
    }

    async GetAllDocs(ctx, owner, extention) {
        const queryString = {
            selector: {
                owner,
                extention,
            },
        };
        const queryResults = await ctx.stub.getQueryResultWithPagination(
            stringify(queryString),
            20
        );
        return await this.GetAllResults(queryResults);
    }

    async CreateDoc(ctx, key, cid, owner, fileName, extention) {
        const prevDoc = JSON.parse(await this.GetDoc(ctx, key));
        if (prevDoc)
            throw new Error(`Document with key: ${key}, already exists`);
        const doc = {
            cid,
            owner,
            fileName,
            extention,
        };
        await ctx.stub.putState(
            key,
            Buffer.from(stringify(sortKeysRecursive(doc)))
        );
    }

    async UpdateDoc(ctx, key, cid, owner, extention, fileName) {
        const doc = JSON.parse(await this.GetDoc(ctx, key));

        doc.owner = owner || doc.owner;
        doc.cid = cid || doc.cid;
        doc.extention = extention || doc.extention;
        doc.fileName = fileName || doc.fileName;

        await ctx.stub.putState(
            key,
            Buffer.from(stringify(sortKeysRecursive(doc)))
        );
    }

    async DeleteDoc(ctx, key) {
        await this.GetDoc(ctx, key);
        await ctx.stub.deleteState(key);
    }

    async GetDoc(ctx, key) {
        const dataBuffer = await ctx.stub.getState(key);
        if (!(dataBuffer && dataBuffer.length > 0))
            throw new Error(`Document with key: ${key}, does not exist`);
        return stringify(JSON.parse(dataBuffer.toString()));
    }

    // async getPrivateData(
    //     ctx,
    //     collection,
    //     cid
    // ) {
    //     const dataBuffer = await ctx.stub.getPrivateData(collection, cid);
    //     if (dataBuffer && dataBuffer.length > 0) {
    //         return JSON.parse(dataBuffer.toString());
    //     }
    //     return null;
    // }

    async GetAllResults(promiseOfIterator) {
        const allResults = [];
        for await (const res of promiseOfIterator) {
            allResults.push(JSON.parse(res?.value?.toString()));
        }
        return JSON.stringify(allResults);
    }
}

module.exports = eVaultContract;
