/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Deterministic JSON.stringify()
const stringify = require("json-stringify-deterministic");
const sortKeysRecursive = require("sort-keys-recursive");
const { Contract } = require("fabric-contract-api");

class EVaultContract extends Contract {
	async InitLedger(ctx) {
		return "InitLedger Called";
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
			20,
		);
		return await this.GetAllResults(queryResults);
	}

	async CreateDoc(ctx, key, cid, owner, fileName, extention) {
		const prevDoc = await this.DocExists(ctx, key);
		if (prevDoc) throw new Error(`Document with key: ${key}, already exists`);
		const doc = stringify(
			sortKeysRecursive({
				cid,
				owner,
				fileName,
				extention,
			}),
		);
		await ctx.stub.putState(key, Buffer.from(doc));
		return doc;
	}

	async UpdateDoc(ctx, newDoc) {
		const doc = JSON.parse(await this.GetDoc(ctx, key));
		const parsedDoc = JSON.parse(newDoc);

		doc.owner = parsedDoc.owner || doc.owner;
		doc.cid = parsedDoc.cid || doc.cid;
		doc.extention = parsedDoc.extention || doc.extention;
		doc.fileName = parsedDoc.fileName || doc.fileName;

		await ctx.stub.putState(
			key,
			Buffer.from(stringify(sortKeysRecursive(doc))),
		);
		return stringify(sortKeysRecursive(doc));
	}

	async DeleteDoc(ctx, key) {
		await this.GetDoc(ctx, key);
		await ctx.stub.deleteState(key);
		return "Document Deleted Successfully";
	}

	async DocExists(ctx, key) {
		const dataBuffer = await ctx.stub.getState(key);
		if (dataBuffer && dataBuffer.length !== 0) return true;
		return false;
	}

	async GetDoc(ctx, key) {
		const dataBuffer = await ctx.stub.getState(key);
		if (!(dataBuffer && dataBuffer.length !== 0))
			throw new Error(`Document with key: ${key}, does not exist`);
		return dataBuffer.toString();
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

module.exports = EVaultContract;
