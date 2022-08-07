/**
 * @generated SignedSource<<f7008e40a2498551b9359a4cf0b28e0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileChat_viewer$data = {
  readonly id: string;
  readonly " $fragmentType": "ProfileChat_viewer";
};
export type ProfileChat_viewer$key = {
  readonly " $data"?: ProfileChat_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileChat_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileChat_viewer",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "c9ee2dbd8b672886987104b846008edf";

export default node;
