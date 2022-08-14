/**
 * @generated SignedSource<<0e7e17ec6fe40033540e94ccf7e9df3f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Chat_detail$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ChatHeader_owner" | "ChatMessage_chat" | "ChatPost_chat">;
  readonly " $fragmentType": "Chat_detail";
};
export type Chat_detail$key = {
  readonly " $data"?: Chat_detail$data;
  readonly " $fragmentSpreads": FragmentRefs<"Chat_detail">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Chat_detail",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChatMessage_chat"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChatHeader_owner"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChatPost_chat"
    }
  ],
  "type": "Chat",
  "abstractKey": null
};

(node as any).hash = "0042c0fc8d10fb847c925d09e7d8c78f";

export default node;
