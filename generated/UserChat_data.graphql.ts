/**
 * @generated SignedSource<<4cab08ef1ba468b6e877ec5035a16b46>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserChat_data$data = {
  readonly id: string;
  readonly title: string;
  readonly " $fragmentType": "UserChat_data";
};
export type UserChat_data$key = {
  readonly " $data"?: UserChat_data$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserChat_data">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserChat_data",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "Chat",
  "abstractKey": null
};

(node as any).hash = "6b51c4d33b733d02143078aa4ff53e82";

export default node;
