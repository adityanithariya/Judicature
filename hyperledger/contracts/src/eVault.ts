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
import stringify from 'json-stringify-deterministic';

type Document = {
    owner: string;
    cid: string;
    extention: string;
    fileName: string;
};

@Info({
    title: 'eVault',
    description: 'Smart contract for legal documents management',
})
export class eVaultContract extends Contract {
    constructor() {
        super('eVault');
    }

    @Transaction(false)
    @Returns('string')
    public async InitLedger(ctx: Context): Promise<string> {
        return 'InitLedger Called';
    }

    // public async GetAllDocs(
    //     { stub }: { stub: ChaincodeStub },
    //     {
    //         owner,
    //         extention,
    //     }: {
    //         owner: string;
    //         extention?: string;
    //     }
    // ): Promise<Document[]> {
    //     const queryString = {
    //         selector: {
    //             owner,
    //             extention,
    //         },
    //     };
    //     const queryResults = await stub.getQueryResultWithPagination(
    //         JSON.stringify(queryString),
    //         20
    //     );
    //     return (await this.GetAllResults(queryResults)) as Document[];
    // }

    // @Transaction()
    // public async CreateDoc(
    //     { stub }: { stub: ChaincodeStub },
    //     key: string,
    //     doc: Document
    // ): Promise<void> {
    //     const prevDoc = await this.GetDoc({ stub }, key);
    //     if (prevDoc)
    //         throw new Error(`Document with key: ${key}, already exists`);
    //     await stub.putState(key, Buffer.from(stringify(doc)));
    // }

    // public async UpdateDoc(
    //     { stub }: { stub: ChaincodeStub },
    //     key: string,
    //     {
    //         cid,
    //         owner,
    //         extention,
    //         fileName,
    //     }: {
    //         cid?: string;
    //         owner?: string;
    //         extention?: string;
    //         fileName?: string;
    //     }
    // ): Promise<void> {
    //     const doc: Document = await this.GetDoc({ stub }, key);

    //     doc.owner = owner || doc.owner;
    //     doc.cid = cid || doc.cid;
    //     doc.extention = extention || doc.extention;
    //     doc.fileName = fileName || doc.fileName;

    //     await stub.putState(key, Buffer.from(stringify(doc)));
    // }

    // public async DeleteDoc(
    //     { stub }: { stub: ChaincodeStub },
    //     key: string
    // ): Promise<void> {
    //     await this.GetDoc({ stub }, key);
    //     stub.deleteState(key);
    // }

    // public async GetDoc(
    //     { stub }: { stub: ChaincodeStub },
    //     key: string
    // ): Promise<Document> {
    //     const dataBuffer = await stub.getState(key);
    //     if (!(dataBuffer && dataBuffer.length > 0))
    //         throw new Error(`Document with key: ${key}, does not exist`);
    //     return JSON.parse(dataBuffer.toString()) as Document;
    // }

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

    // async GetAllResults(promiseOfIterator: any): Promise<any[]> {
    //     const allResults = [];
    //     for await (const res of promiseOfIterator) {
    //         allResults.push(JSON.parse(res?.value?.toString()));
    //     }
    //     return allResults;
    // }
}
