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
    public async getDoc(
        stub: ChaincodeStub,
        cid: string
    ): Promise<Document | null> {
        const dataBuffer = await stub.getState(cid);
        if (dataBuffer && dataBuffer.length > 0) {
            return JSON.parse(dataBuffer.toString()) as Document;
        }
        return null;
    }

    public async getPrivateData(
        stub: ChaincodeStub,
        collection: string,
        cid: string
    ): Promise<Document | null> {
        const dataBuffer = await stub.getPrivateData(collection, cid);
        if (dataBuffer && dataBuffer.length > 0) {
            return JSON.parse(dataBuffer.toString()) as Document;
        }
        return null;
    }
}

