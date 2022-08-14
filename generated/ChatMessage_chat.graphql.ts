/**
 * @generated SignedSource<<5a5d4a2e7a667b67fc0479047b6a0653>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChatMessage_chat$data = {
  readonly id: string;
  readonly " $fragmentType": "ChatMessage_chat";
};
export type ChatMessage_chat$key = {
  readonly " $data"?: ChatMessage_chat$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChatMessage_chat">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChatMessage_chat",
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

(node as any).hash = "ad170dd042636a9592b8cf775e6532f9";

export default node;
