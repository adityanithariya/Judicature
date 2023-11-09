/*
  SPDX-License-Identifier: Apache-2.0
*/

import { Object, Property } from 'fabric-contract-api';

@Object()
export class Case {
    @Property()
    public caseName: string;

    @Property()
    public caseId: number;

    @Property()
    public lawyers: string[];

    @Property()
    public docs: string[];
}
