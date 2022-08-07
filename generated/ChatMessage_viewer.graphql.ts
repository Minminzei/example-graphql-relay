/**
 * @generated SignedSource<<b14cea9c076173f70685bd17206b5eae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatMessage_viewer$data = {
  readonly id: string;
  readonly " $fragmentType": "ChatMessage_viewer";
};
export type ChatMessage_viewer$key = {
  readonly " $data"?: ChatMessage_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChatMessage_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChatMessage_viewer",
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

(node as any).hash = "ac3bd568327a2ad68cb9aad6552eb7d3";

export default node;
