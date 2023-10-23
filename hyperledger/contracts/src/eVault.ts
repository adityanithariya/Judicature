/*
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChaincodeStub } from 'fabric-shim';
import {
    Context,
    Contract,
    Info,
    Returns,
    Transaction,
} from 'fabric-contract-api';
import { Document } from './types/document';

@Info({
    title: 'eVault',
    description: 'Smart contract for legal documents management',
})
export class eVaultContract extends Contract {
    constructor() {
        super('eVault');
    }

    @Transaction(false)
    public async InitLedger(ctx: Context): Promise<void> {
        console.log('InitLedger Called');
    }

    @Transaction(false)
    public async GetAllDocs(
        { stub }: { stub: ChaincodeStub },
        {
            owner,
            extention,
        }: {
            owner?: string;
            extention?: string;
        }
    ): Promise<Document[]> {
        const queryString = {
            selector: {
                owner,
                extention,
            },
        };
        const queryResults = await stub.getQueryResultWithPagination(
            JSON.stringify(queryString),
            20
        );
        return await this.GetAllResults(queryResults);
    }

    @Transaction()
    public async CreateDoc(
        { stub }: { stub: ChaincodeStub },
        key: string,
        cid: string,
        owner: string,
        extention: string,
        fileName: string
    ): Promise<void> {
        const exists = await this.DocExists({ stub }, key);
        if (exists) {
            throw new Error(`Document with key: ${key}, already exists`);
        }
        const doc: Document = {
            owner,
            cid,
            extention,
            fileName,
        };
        stub.putState(key, Buffer.from(doc.toString()));
    }

    @Transaction(false)
    public async GetDoc(
        { stub }: { stub: ChaincodeStub },
        key: string
    ): Promise<Document | null> {
        const dataBuffer = await stub.getState(key);
        if (dataBuffer && dataBuffer.length > 0)
            return JSON.parse(dataBuffer.toString()) as Document;

        return null;
    }

    @Transaction()
    public async UpdateDoc(
        { stub }: { stub: ChaincodeStub },
        key: string,
        {
            cid,
            owner,
            extention,
            fileName,
        }: {
            cid?: string;
            owner?: string;
            extention?: string;
            fileName?: string;
        }
    ): Promise<void> {
        const doc: Document = await this.GetDoc({ stub }, key);
        if (!doc) {
            throw new Error(`Document with key: ${key}, does not exist`);
        }
        doc.owner = owner || doc.owner;
        doc.cid = cid || doc.cid;
        doc.extention = extention || doc.extention;
        doc.fileName = fileName || doc.fileName;

        stub.putState(key, Buffer.from(doc.toString()));
    }

    @Transaction()
    public async DeleteDoc(
        { stub }: { stub: ChaincodeStub },
        key: string
    ): Promise<void> {
        const exists = await this.DocExists({ stub }, key);
        if (!exists) {
            throw new Error(`Document with key: ${key}, does not exist`);
        }
        stub.deleteState(key);
    }

    @Transaction(false)
    @Returns('boolean')
    public async DocExists(
        { stub }: { stub: ChaincodeStub },
        key: string
    ): Promise<boolean> {
        const doc = await stub.getState(key);
        return doc && doc.length > 0;
    }

    // public async getPrivateData(
    //     stub: ChaincodeStub,
    //     collection: string,
    //     cid: string
    // ): Promise<Document | null> {
    //     const dataBuffer = await stub.getPrivateData(collection, cid);
    //     if (dataBuffer && dataBuffer.length > 0) {
    //         return JSON.parse(dataBuffer.toString()) as Document;
    //     }
    //     return null;
    // }

    @Transaction(false)
    async GetAllResults(promiseOfIterator) {
        const allResults = [];
        for await (const res of promiseOfIterator) {
            allResults.push(JSON.parse(res?.value?.toString()));
        }
        return allResults;
    }
}
