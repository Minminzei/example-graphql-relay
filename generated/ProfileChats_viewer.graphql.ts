/**
 * @generated SignedSource<<6f660aa9ebb77bc135739e0308b90c9b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileChats_viewer$data = {
  readonly id: string;
  readonly " $fragmentType": "ProfileChats_viewer";
};
export type ProfileChats_viewer$key = {
  readonly " $data"?: ProfileChats_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileChats_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileChats_viewer",
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

(node as any).hash = "f9be56b707900242a8dbeb0a47c66ff2";

export default node;
