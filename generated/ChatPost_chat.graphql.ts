/**
 * @generated SignedSource<<f7849533e651b2099927b19f16011b20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatPost_chat$data = {
  readonly id: string;
  readonly " $fragmentType": "ChatPost_chat";
};
export type ChatPost_chat$key = {
  readonly " $data"?: ChatPost_chat$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChatPost_chat">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChatPost_chat",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Chat",
  "abstractKey": null
};

(node as any).hash = "0a5cba5a33722ce4f2b927cd0659ae66";

export default node;
