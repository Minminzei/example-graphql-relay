/**
 * @generated SignedSource<<c6e98d4364350f7638e3ceec8e96c965>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatPost_viewer$data = {
  readonly id: string;
  readonly " $fragmentType": "ChatPost_viewer";
};
export type ChatPost_viewer$key = {
  readonly " $data"?: ChatPost_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChatPost_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChatPost_viewer",
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

(node as any).hash = "53eb1620698fe04df9e0200ae1065831";

export default node;
