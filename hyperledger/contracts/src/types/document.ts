/*
  SPDX-License-Identifier: Apache-2.0
*/

import { Object, Property } from 'fabric-contract-api';

@Object()
export class Document {
    @Property()
    public docType?: string;

    @Property()
    public owner: string;

    @Property()
    public cid: string;

    @Property()
    public meta_data: { extention: string; fileName: string };
}

