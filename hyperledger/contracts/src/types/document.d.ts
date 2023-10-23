/*
  SPDX-License-Identifier: Apache-2.0
*/

import { Object, Property } from 'fabric-contract-api';

@Object()
export class Document {
    @Property()
    public owner: string;

    @Property()
    public cid: string;

    @Property()
    public extention: string;

    @Property()
    public fileName: string;
}
