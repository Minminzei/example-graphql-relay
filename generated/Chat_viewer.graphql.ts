/**
 * @generated SignedSource<<9d27beb7155c2d45460181d9f8efa0c2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Chat_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ChatMessage_viewer" | "ChatPost_viewer">;
  readonly " $fragmentType": "Chat_viewer";
};
export type Chat_viewer$key = {
  readonly " $data"?: Chat_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"Chat_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Chat_viewer",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChatMessage_viewer"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChatPost_viewer"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "1a3c5d21e1aa13c26a405ea4bee55a63";

export default node;
